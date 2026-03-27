import type { DevicePreset } from "../../types/device.ts";

export const AMAZON_FIRE_TV_PRESET = {
  id: "amazon-fire-tv",
  label: "Amazon Fire TV",
  platform: "fire-tv",
  family: "Fire TV",
  bodyHeight: 540,
  outerRadius: 24,
  screen: {
    top: 18,
    right: 18,
    bottom: 18,
    left: 18,
    radius: 14,
  },
  cutout: undefined,
  buttons: [
    { side: "right", top: 180, height: 64, width: 4, offset: 2, radius: 2 },
    { side: "right", top: 260, height: 96, width: 4, offset: 2, radius: 2 },
  ],
  material: {
    frameFill: "#1a1a1a",
    faceFill: "#050505",
    faceInset: 4,
    faceBorderColor: "rgba(255,255,255,0.04)",
    faceBorderWidth: 1,
    faceShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
    borderColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    buttonFill: "#2a2a2a",
    shadow: "0 30px 70px rgba(0, 0, 0, 0.45), 0 12px 26px rgba(0, 0, 0, 0.22)",
    screenShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
  },
  summary: "Landscape Fire TV display with slim bezels and modern smart TV silhouette",
} satisfies DevicePreset;