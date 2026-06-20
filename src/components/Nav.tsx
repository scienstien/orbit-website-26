"use client";

import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { signOut } from "@/lib/auth-utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/aboutus" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Contact us", path: "/contactus" },
];

type NavProps = {
  isAuthenticated: boolean;
  scrollIntoView?: never;
};

export default function Nav({ isAuthenticated }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const session = useSession();
  const router = useRouter();
  const hasSession = session.isPending
    ? isAuthenticated
    : Boolean(session.data?.user?.id);

  const handleNavKeyDown = (
    event: KeyboardEvent<HTMLLIElement>,
    path: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goTo(path);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const goTo = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut();
      await session.refetch();
      setIsOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed", error);
      setIsSigningOut(false);
    }
  };

  return (
    <nav className="relative z-50 px-60 max-lg:px-5 font-mono">
      <div className="flex justify-between items-center pt-4 px-6 lg:px-12">
        <div className="z-50">
          <Image
            width={192}
            height={520}
            src="/images/branding/OrbitlogoblackR.png"
            alt="Orbit Logo"
            className="h-16 lg:h-20 pt-2 hover:cursor-pointer"
            style={{ width: "auto" }}
            onClick={() => goTo("/")}
          />
        </div>

        <ul className="hidden lg:flex justify-evenly w-2/3 items-center text-white">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => goTo(item.path)}
              onKeyDown={(event) => handleNavKeyDown(event, item.path)}
              className="text-white hover:cursor-pointer"
            >
              <p className="text-xl group relative w-max">
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all duration-300 h-0.5 bg-white group-hover:w-full" />
              </p>
            </li>
          ))}
          <li
            onKeyDown={(event) => handleNavKeyDown(event, "/blogpage")}
            onClick={() => goTo("/blogpage")}
            className="text-white hover:cursor-pointer"
          >
            <p className="text-xl group relative w-max">
              <span>Blogs</span>
              <span className="absolute -bottom-1 left-0 w-0 transition-all duration-300 h-0.5 bg-white group-hover:w-full" />
            </p>
          </li>
        </ul>

        {hasSession ? (
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="max-lg:hidden flex items-center gap-2 text-white text-xl p-2 px-5 border hover:cursor-pointer transition-all duration-300 hover:shadow-none shadow-[5px_5px_rgba(255,255,255,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goTo("/login")}
            className="max-lg:hidden text-white text-xl p-2 px-5 border hover:cursor-pointer transition-all duration-300 hover:shadow-none shadow-[5px_5px_rgba(255,255,255,0.8)]"
          >
            Login
          </button>
        )}

        <button
          type="button"
          className="lg:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center lg:hidden z-40">
          <ul className="flex flex-col items-center space-y-8 text-white">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="text-white hover:cursor-pointer"
                onClick={() => goTo(item.path)}
                onKeyDown={(event) => handleNavKeyDown(event, item.path)}
              >
                <p className="text-2xl group relative w-max">
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all duration-300 h-0.5 bg-white group-hover:w-full" />
                </p>
              </li>
            ))}
            <li
              onKeyDown={(event) => handleNavKeyDown(event, "/blogpage")}
              className="text-white hover:cursor-pointer"
              onClick={() => goTo("/blogpage")}
            >
              <p className="text-2xl group relative w-max">
                <span>Blogs</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all duration-300 h-0.5 bg-white group-hover:w-full" />
              </p>
            </li>
            {hasSession ? (
              <li className="pt-6">
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex items-center gap-2 text-white text-xl p-2 px-5 border hover:cursor-pointer transition-all duration-300 hover:shadow-none shadow-[5px_5px_rgba(255,255,255,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut className="h-4 w-4" />
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </button>
              </li>
            ) : (
              <li className="pt-6">
                <button
                  type="button"
                  onClick={() => goTo("/login")}
                  className="text-white text-xl p-2 px-5 border hover:cursor-pointer transition-all duration-300 hover:shadow-none shadow-[5px_5px_rgba(255,255,255,0.8)]"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
