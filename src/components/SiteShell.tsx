"use client";

import { useEffect } from "react";

import Nav from "./Nav";
import Particles from "./Particles";

type SiteShellProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

export default function SiteShell({
  isAuthenticated,
  children,
}: SiteShellProps) {
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
      document.body.style.width = "";
    };
  }, []);

  return (
    <div className="text-white min-h-screen font-mono overflow-x-hidden max-w-full">
      <Particles />
      <div className="relative w-full overflow-hidden min-h-screen">
        <Nav isAuthenticated={isAuthenticated} />
        {children}
      </div>
    </div>
  );
}
