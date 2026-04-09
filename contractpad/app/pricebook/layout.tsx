import PasswordGate from "@/components/PasswordGate";

export default function PricebookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PasswordGate label="Pricebook Demo">{children}</PasswordGate>;
}
