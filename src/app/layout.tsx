import type { Metadata } from "next";
import { headers } from "next/headers";

import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Orbit",
  description: "Orbit NIT Trichy migration to Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authState = await getShellAuthState();

  return (
    <html lang="en">
      <body>
        <SiteShell isAuthenticated={authState.isAuthenticated}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}

async function getShellAuthState() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return { isAuthenticated: Boolean(session?.user?.id) };
  } catch (error) {
    console.error("layout:getShellAuthState failed", error);
    return { isAuthenticated: false };
  }
}
