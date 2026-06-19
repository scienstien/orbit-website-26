import type { Metadata } from "next";

import Team from "../../components/Team";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL("https://orbit-nitt.com"),
  title: "About Orbit NIT Trichy | Student Rocketry Team",
  description:
    "Meet Orbit, the official student rocketry team of NIT Trichy, and explore the Aerostructures, Avionics, WebOps, and RnD teams building high-powered rockets.",
  keywords: [
    "Orbit NIT Trichy",
    "NIT Trichy rocketry",
    "student rocketry team",
    "Aerostructures",
    "Avionics",
    "WebOps",
    "RnD",
  ],
  alternates: {
    canonical: "/aboutus",
  },
  openGraph: {
    title: "About Orbit NIT Trichy",
    description:
      "The official student rocketry team of NIT Trichy building high-powered rockets for international competitions.",
    url: "/aboutus",
    siteName: "Orbit NIT Trichy",
    images: [
      {
        url: "/images/branding/OrbitlogoblackR.png",
        width: 1200,
        height: 630,
        alt: "Orbit NIT Trichy logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Orbit NIT Trichy",
    description:
      "Meet the Aerostructures, Avionics, WebOps, and RnD teams behind Orbit NIT Trichy.",
    images: ["/images/branding/OrbitlogoblackR.png"],
  },
};

const focusAreas = [
  {
    id: "Aerostructures",
    title: "Aerostructures",
    summary:
      "Designs, simulates, and manufactures the rocket airframe, composite structures, fins, nosecones, and internal structural systems.",
    accent: "from-emerald-300 to-cyan-300",
  },
  {
    id: "Avionics",
    title: "Avionics",
    summary:
      "Develops flight electronics, telemetry, navigation, data acquisition, and control systems for reliable launch and recovery operations.",
    accent: "from-indigo-300 to-blue-300",
  },
  {
    id: "WebOps",
    title: "WebOps",
    summary:
      "Maintains Orbit's digital infrastructure, public website, deployment workflows, analytics, and internal tools for team operations.",
    accent: "from-rose-300 to-orange-200",
  },
  {
    id: "RnD",
    title: "RnD",
    summary:
      "Explores new propulsion, materials, simulation, manufacturing, and testing ideas that can move future rocket builds forward.",
    accent: "from-cyan-300 to-violet-300",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Orbit NIT Trichy",
  url: "/aboutus",
  description:
    "The official student rocketry team of NIT Trichy building high-powered rockets for international competitions.",
  department: focusAreas.map((area) => ({
    "@type": "Organization",
    name: `${area.title} Team`,
    description: area.summary,
  })),
};

export default function AboutUsPage() {
  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Static structured data for search engines.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-20 sm:px-10 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">
          About Orbit
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white sm:text-7xl">
              NIT Trichy's student rocketry team.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75 sm:text-2xl">
              Orbit brings together undergraduate engineers, designers,
              developers, and operators to build high-powered rockets for
              international competitions including the Spaceport America Cup.
            </p>
          </div>

          <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["40+", "Undergraduate innovators"],
              ["4", "Core technical groups"],
              ["1", "Shared launch mission"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur"
              >
                <dt className="text-3xl font-bold text-blue-100">{value}</dt>
                <dd className="mt-1 text-sm text-white/65">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Team />

      <section
        aria-labelledby="team-focus-heading"
        className="mx-auto w-full max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-16"
      >
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
            Team Focus
          </p>
          <h2
            id="team-focus-heading"
            className="mt-3 text-4xl font-bold sm:text-6xl"
          >
            How we build
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {focusAreas.map((area) => (
            <section
              id={area.id}
              key={area.id}
              aria-labelledby={`${area.id}-heading`}
              className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 sm:p-8"
            >
              <div
                className={`h-1.5 w-24 rounded-full bg-linear-to-r ${area.accent}`}
              />
              <h3 id={`${area.id}-heading`} className="mt-6 text-3xl font-bold">
                {area.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">
                {area.summary}
              </p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
