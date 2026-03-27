/**
 * UI Component types - Phone Frame, Mascot, Typography
 */

import type { DeviceMode, DevicePresetId } from "./device.ts";

// ============================================================
// Phone Frame
// ============================================================

export interface PhoneFrameOptions {
  /** Phone size as percentage of container width (50-95 for single, 30-50 for dual) */
  scale?: number;
  /** Bottom offset as percentage (0-25) */
  bottomOffset?: number;
  /** Rotation angle for dual mode phones (0-15 degrees) */
  dualRotation?: number;
  /** Gap between phones in dual mode (0-30px) */
  dualGap?: number;
  /** Inherit platform default or use an explicit device preset */
  deviceMode?: DeviceMode;
  /** Device preset to use when deviceMode = override */
  devicePresetId?: DevicePresetId;
  /** Rotation angle in degrees (-45 to 45) */
  rotation?: number;
}

// ============================================================
// Mascot
// ============================================================

export interface MascotOptions {
  /** Position of the mascot */
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /** Path to mascot image (relative to assets) */
  imagePath?: string;
  /** Size of mascot as percentage of container width (5-30) */
  size?: number;
  /** Offset from edges in pixels (10-100) */
  offset?: number;
  /** Border radius as percentage (0-50) - 50 = circular, 20 = rounded corners */
  borderRadius?: number;
  /** Z-index layer for the mascot (default 20: front, <15: back) */
  zIndex?: number;
}

// ============================================================
// Typography
// ============================================================

/** Typography settings for headlines and subtitles */
export interface TypographyOptions {
  /** Headline font size as percentage of screen width (3-8) */
  headlineFontSize?: number;
  /** Subtitle font size as percentage of screen width (1.5-4) */
  subtitleFontSize?: number;
  /** Headline font weight (400-900) */
  headlineFontWeight?: number;
  /** Subtitle font weight (400-700) */
  subtitleFontWeight?: number;
  /** Line height for headline (1-1.5) */
  headlineLineHeight?: number;
  /** Text color (hex) - defaults to white */
  textColor?: string;
  /** Text alignment */
  textAlign?: "left" | "center" | "right";
  /** Horizontal padding as percentage (2-15) */
  horizontalPadding?: number;
  /** Headline font family */
  headlineFontFamily?: string;
  /** Subtitle font family */
  subtitleFontFamily?: string;
}

// ============================================================
// Overlay Images
// ============================================================

export interface OverlayImageOptions {
  id: string;
  imagePath: string;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  scale: number; // Percentage (10-300)
  rotation: number; // Degrees (-180 to 180)
  opacity?: number;
  zIndex?: number;
}
