"use client";

import Image from "next/image";
import { useState } from "react";

type Sponsor = {
  src: string;
  alt: string;
  href: string;
  frameClassName: string;
  imageClassName?: string;
};

const sponsors: Sponsor[] = [
  {
    src: "/images/sponsors/sp1.png",
    alt: "SimScale",
    href: "https://www.simscale.com/",
    frameClassName: "h-14 w-44 sm:w-52",
    imageClassName: "p-3",
  },
  {
    src: "/images/sponsors/sp2.png",
    alt: "SolidWorks",
    href: "https://www.solidworks.com/",
    frameClassName: "h-32 w-48 sm:h-40 sm:w-56",
  },
  {
    src: "/images/sponsors/sp5.avif",
    alt: "OnlyScrews",
    href: "https://onlyscrews.in/",
    frameClassName: "h-24 w-48 sm:h-32 sm:w-56",
  },
  {
    src: "/images/sponsors/sp4.png",
    alt: "Onshape",
    href: "https://www.onshape.com/en/",
    frameClassName: "h-20 w-44 sm:h-24 sm:w-52",
  },
  {
    src: "/images/sponsors/sp7.png",
    alt: "BigBinary",
    href: "https://www.bigbinary.com/",
    frameClassName: "h-24 w-48 sm:h-32 sm:w-56",
  },
];

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex items-center justify-center transition-opacity duration-200 hover:opacity-75 ${sponsor.frameClassName}`}
      aria-label={sponsor.alt}
    >
      {!isLoaded ? (
        <span
          className="absolute inset-0 rounded-lg border border-white/10 bg-white/10 shadow-inner shadow-white/5 animate-pulse"
          aria-hidden="true"
        />
      ) : null}

      <Image
        fill
        src={sponsor.src}
        alt={sponsor.alt}
        sizes="(min-width: 768px) 224px, 192px"
        quality={75}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`object-contain transition duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${sponsor.imageClassName ?? ""}`}
      />
    </a>
  );
}

export default function SponsorsPage() {
  return (
    <main>
      <div className="mt-12 pt-10 px-4">
        <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent mb-8 sm:mb-12">
          SPONSORS
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-14 max-w-5xl mx-auto">
          {sponsors.map((sponsor) => (
            <SponsorLogo key={sponsor.alt} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </main>
  );
}
