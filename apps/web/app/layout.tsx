import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import React from "react";
import "./globals.css";
import { AppHeader, Button, Screen } from "@thrifty/ui";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "HybridForce MVP",
  description: "Dashboard del atleta híbrido — Next.js + Expo monorepo"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={manrope.variable}>
      <body>
        <Screen className="pt-4">
          <AppHeader
            cta={<Button variant="primary">Empezar sesión</Button>}
            links={[
              { label: "Dashboard", href: "/" },
              { label: "Workouts", href: "/workouts" },
              { label: "Progreso", href: "/progress" },
              { label: "Perfil", href: "/profile" }
            ]}
          />
          <main className="space-y-6 pb-12">{children}</main>
        </Screen>
      </body>
    </html>
  );
}
