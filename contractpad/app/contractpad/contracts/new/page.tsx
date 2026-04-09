"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import WizardHeader from "@/components/WizardHeader";
import CustomerStep from "@/components/CustomerStep";
import ContractComposer, {
  buildInitialComposerValue,
  resolvePartiesText,
  type ComposerValue,
} from "@/components/ContractComposer";
import SignaturePad from "@/components/SignaturePad";
import {
  getBusiness,
  getCurrentTech,
  nextContractNumber,
  saveContract,
} from "@/lib/storage";
import type { Business, Contract, Customer } from "@/lib/types";

type Step = 1 | 2 | 3;

const TOTAL_STEPS = 3;

const STEP_LABELS: Record<Step, string> = {
  1: "Customer",
  2: "Compose",
  3: "Sign",
};

export default function NewContractPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [composerValue, setComposerValue] = useState<ComposerValue | null>(
    null
  );
  const [techSig, setTechSig] = useState<string | null>(null);
  const [custSig, setCustSig] = useState<string | null>(null);

  const contractNumber = useMemo(() => nextContractNumber(), []);
  const business = useMemo(() => getBusiness(), []);

  const buildContract = (): Contract | null => {
    if (!customer || !composerValue) return null;
    const tech = getCurrentTech();
    if (!tech) return null;

    const v = composerValue;
    const startIso = new Date(v.startDate).toISOString();

    const businessSnapshot: Business = {
      name: v.businessName,
      address: v.businessAddress,
      city: v.businessCity,
      state: v.businessState,
      zip: v.businessZip,
      phone: v.businessPhone,
      email: v.businessEmail,
    };

    const customerSnapshot: Customer = {
      ...customer,
      name: v.customerName,
      address: v.customerAddress,
      city: v.customerCity,
      state: v.customerState,
      zip: v.customerZip,
    };

    return {
      id: `ct-${Date.now().toString(36)}`,
      number: contractNumber,
      customerId: customer.id,
      tierId: null,
      tierName: v.tierName,
      businessSnapshot,
      customerSnapshot,
      title: v.title,
      partiesText: resolvePartiesText(v),
      termsSections: v.termsSections,
      footer: v.footer,
      startDate: startIso,
      lengthMonths: v.lengthMonths,
      frequency: v.frequency,
      price: v.price,
      includedServices: v.includedServices,
      techId: tech.id,
      techName: tech.name,
      techSignaturePng: techSig,
      customerSignaturePng: custSig,
      techSignedAt: techSig ? new Date().toISOString() : null,
      customerSignedAt: custSig ? new Date().toISOString() : null,
      finalizedAt: null,
      status: "draft",
    };
  };

  const handleBack = () => {
    if (step === 1) {
      router.push("/contractpad/contracts");
    } else {
      setStep((step - 1) as Step);
    }
  };

  const handleFinalize = () => {
    const preview = buildContract();
    if (!preview || !techSig || !custSig) return;
    const finalized: Contract = {
      ...preview,
      status: "finalized",
      finalizedAt: new Date().toISOString(),
    };
    saveContract(finalized);
    router.push(`/contractpad/contracts/view?id=${finalized.id}&justFinalized=1`);
  };

  return (
    <AppShell>
      <WizardHeader
        step={step}
        totalSteps={TOTAL_STEPS}
        label={STEP_LABELS[step]}
        onBack={handleBack}
      />

      {step === 1 && (
        <CustomerStep
          onSelect={(c) => {
            setCustomer(c);
            setComposerValue(buildInitialComposerValue(business, c));
            setStep(2);
          }}
        />
      )}

      {step === 2 && customer && composerValue && (
        <div className="animate-fade-up">
          <h2 className="section-title mb-2">
            Build the <span className="italic">contract.</span>
          </h2>
          <p className="text-ink-muted mb-6">
            Tap any field — header, title, parties, terms — everything is
            editable.
          </p>

          <ContractComposer
            number={contractNumber}
            value={composerValue}
            onChange={setComposerValue}
          />

          <button
            onClick={() => setStep(3)}
            className="btn-accent w-full mt-6 text-lg"
          >
            Continue to Signatures →
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-up">
          <h2 className="section-title mb-2">
            Capture <span className="italic">signatures.</span>
          </h2>
          <p className="text-ink-muted mb-6">
            You go first, then hand the phone over.
          </p>

          <div className="card p-5 mb-4">
            <SignaturePad label="Contractor (You)" onChange={setTechSig} />
          </div>

          <div className="card p-5 mb-6">
            <SignaturePad label="Customer" onChange={setCustSig} />
          </div>

          <button
            onClick={handleFinalize}
            disabled={!techSig || !custSig}
            className="btn-accent w-full text-lg"
          >
            Finalize & Send →
          </button>
          {(!techSig || !custSig) && (
            <p className="text-xs text-ink-muted text-center mt-3">
              Both signatures required to finalize
            </p>
          )}
        </div>
      )}
    </AppShell>
  );
}
