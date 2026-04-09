"use client";

import jsPDF from "jspdf";
import type { Contract } from "./types";
import {
  formatCurrency,
  formatDate,
  frequencyAdjective,
} from "./format";

const BRAND = "#e8723a";
const INK = "#0c1220";
const MUTED = "#5a6378";

export const generateContractPdf = (contract: Contract): jsPDF => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 50;
  const bottomSafe = pageH - 60;
  let y = margin;

  const b = contract.businessSnapshot;
  const c = contract.customerSnapshot;

  const ensureSpace = (needed: number) => {
    if (y + needed > bottomSafe) {
      doc.addPage();
      y = margin;
    }
  };

  // ── Header ──
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(BRAND);
  doc.text(contract.number, margin, y);

  y += 14;
  doc.setFontSize(18);
  doc.setTextColor(INK);
  doc.setFont("helvetica", "bold");
  doc.text(b.name, margin, y);

  y += 12;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(MUTED);
  doc.text(
    `${b.address}, ${b.city}, ${b.state} ${b.zip}  ·  ${b.phone}  ·  ${b.email}`,
    margin,
    y
  );

  y += 10;
  doc.setDrawColor(INK);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageW - margin, y);
  y += 26;

  // ── Plan name + Title ──
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(MUTED);
  doc.text(contract.tierName, pageW / 2, y, { align: "center" });
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(INK);
  const titleLines = doc.splitTextToSize(contract.title, pageW - margin * 2);
  titleLines.forEach((line: string) => {
    doc.text(line, pageW / 2, y, { align: "center" });
    y += 18;
  });
  y += 14;

  // ── Parties ──
  y = section(doc, "PARTIES", y, margin);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(INK);
  const partiesText = doc.splitTextToSize(
    contract.partiesText,
    pageW - margin * 2
  );
  doc.text(partiesText, margin, y);
  y += partiesText.length * 13 + 16;

  // ── Term ──
  ensureSpace(60);
  y = section(doc, "TERM & START DATE", y, margin);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(INK);
  doc.text(`Start Date: ${formatDate(contract.startDate)}`, margin, y);
  y += 14;
  doc.text(`Length: ${contract.lengthMonths} months`, margin, y);
  y += 20;

  // ── Price ──
  ensureSpace(50);
  y = section(doc, "PRICE & BILLING", y, margin);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(INK);
  doc.text(
    `${formatCurrency(contract.price)} ${frequencyAdjective(contract.frequency)}`,
    margin,
    y
  );
  y += 28;

  // ── Services ──
  ensureSpace(40);
  y = section(doc, "SERVICES INCLUDED", y, margin);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(INK);
  contract.includedServices.forEach((s) => {
    const lines = doc.splitTextToSize(`•  ${s}`, pageW - margin * 2 - 10);
    ensureSpace(lines.length * 13);
    doc.text(lines, margin + 4, y);
    y += lines.length * 13;
  });
  y += 14;

  // ── Terms ──
  ensureSpace(40);
  y = section(doc, "TERMS & CONDITIONS", y, margin);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  contract.termsSections.forEach((t) => {
    const labelText = `${t.label}. `;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(INK);
    const labelWidth = doc.getTextWidth(labelText);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(MUTED);
    const bodyFirstLine = doc.splitTextToSize(
      t.body,
      pageW - margin * 2 - labelWidth
    )[0];
    const remainingBody = t.body.substring(bodyFirstLine.length).trim();
    const remainingLines = remainingBody
      ? doc.splitTextToSize(remainingBody, pageW - margin * 2)
      : [];
    const totalLines = 1 + remainingLines.length;
    const blockHeight = totalLines * 11 + 6;

    ensureSpace(blockHeight);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(INK);
    doc.text(labelText, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(MUTED);
    doc.text(bodyFirstLine, margin + labelWidth, y);
    y += 11;
    if (remainingLines.length > 0) {
      doc.text(remainingLines, margin, y);
      y += remainingLines.length * 11;
    }
    y += 6;
  });

  y += 20;

  // ── Signatures ──
  const sigBlockH = 80;
  ensureSpace(sigBlockH + 40);
  y = section(doc, "SIGNATURES", y, margin);
  const sigBlockW = (pageW - margin * 2 - 30) / 2;
  const sigTop = y;
  const sigBaseline = y + 60;

  // Contractor
  if (contract.techSignaturePng) {
    try {
      doc.addImage(
        contract.techSignaturePng,
        "PNG",
        margin,
        sigTop,
        sigBlockW,
        50,
        undefined,
        "FAST"
      );
    } catch {
      /* ignore */
    }
  }
  doc.setDrawColor(INK);
  doc.setLineWidth(0.5);
  doc.line(margin, sigBaseline, margin + sigBlockW, sigBaseline);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(INK);
  doc.text(contract.techName || b.name, margin, sigBaseline + 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED);
  doc.text("Contractor", margin, sigBaseline + 26);
  if (contract.techSignedAt) {
    doc.text(formatDate(contract.techSignedAt), margin, sigBaseline + 38);
  }

  // Customer
  const cx = margin + sigBlockW + 30;
  if (contract.customerSignaturePng) {
    try {
      doc.addImage(
        contract.customerSignaturePng,
        "PNG",
        cx,
        sigTop,
        sigBlockW,
        50,
        undefined,
        "FAST"
      );
    } catch {
      /* ignore */
    }
  }
  doc.line(cx, sigBaseline, cx + sigBlockW, sigBaseline);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(INK);
  doc.text(c.name, cx, sigBaseline + 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED);
  doc.text("Customer", cx, sigBaseline + 26);
  if (contract.customerSignedAt) {
    doc.text(formatDate(contract.customerSignedAt), cx, sigBaseline + 38);
  }

  // Footer disclaimer (editable)
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(MUTED);
    doc.text(
      `${contract.footer}  ·  Page ${i} of ${pages}`,
      pageW / 2,
      pageH - 30,
      { align: "center" }
    );
  }

  return doc;
};

const section = (doc: jsPDF, label: string, y: number, margin: number): number => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(BRAND);
  doc.text(label, margin, y);
  return y + 14;
};

export const downloadContractPdf = (contract: Contract): void => {
  const doc = generateContractPdf(contract);
  const filename = `${contract.number}-${contract.customerSnapshot.name.replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
};

export const openMailto = (contract: Contract): void => {
  const to = contract.customerSnapshot.email;
  const cc = contract.businessSnapshot.email;
  const subject = encodeURIComponent(
    `${contract.businessSnapshot.name} — Your Maintenance Agreement (${contract.number})`
  );
  const body = encodeURIComponent(
    `Hi ${contract.customerSnapshot.name},\n\nThanks for signing up for our ${contract.tierName}. Your signed agreement (${contract.number}) is attached.\n\nStart date: ${formatDate(contract.startDate)}\nBilling: ${formatCurrency(contract.price)} ${frequencyAdjective(contract.frequency)}\n\nReach out any time.\n\n— ${contract.techName}\n${contract.businessSnapshot.name}`
  );
  window.location.href = `mailto:${to}?cc=${cc}&subject=${subject}&body=${body}`;
};
