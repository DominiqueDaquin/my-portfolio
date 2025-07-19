'use client';
import { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
      }}
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: { value: "#111" },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: false },
          },
        },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.4,
            random: true,
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
          },
          move: {
            enable: true,
            direction: "bottom",
            speed: 0.7,
            outModes: {
              default: "out", // disparaît une fois hors champ
            },
            random: true,
            straight: false,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
