import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IALAW Prompt Lab",
  description: "Herramienta educativa para construir mejores prompts legales con IA."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
