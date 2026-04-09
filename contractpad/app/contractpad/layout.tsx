import PasswordGate from "@/components/PasswordGate";

export default function ContractpadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PasswordGate label="ContractPad Demo">{children}</PasswordGate>;
}
