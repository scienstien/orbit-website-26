"use client";

import {
  ParticlesProvider,
  Particles as TsParticles,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ComponentProps } from "react";
import { useMemo } from "react";

import "./style.css";

type ParticlesProps = {
  id?: string;
};

type ParticlesInit = ComponentProps<typeof ParticlesProvider>["init"];
type ParticlesOptions = NonNullable<
  ComponentProps<typeof TsParticles>["options"]
>;

const initParticles: ParticlesInit = async (engine) => {
  await loadSlim(engine);
};

export default function Particles({ id = "partiles" }: ParticlesProps) {
  const options: ParticlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "slow",
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        color: {
          value: "#FFFFFF",
        },
        links: {
          color: "#FFFFFF",
          distance: 150,
          enable: false,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 0.4,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 150,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0, max: 2 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <ParticlesProvider init={initParticles}>
      <TsParticles id={id} options={options} />
    </ParticlesProvider>
  );
}
