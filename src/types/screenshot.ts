/**
 * Screenshot and Feature Graphic types
 */

import type { GlowEffect, Shape } from "./effects.ts";
import type {
  MascotOptions,
  OverlayImageOptions,
  PhoneFrameOptions,
  TypographyOptions,
} from "./components.ts";

import type { ColorPalette, ThemeConfig } from "./theme.ts";

// ============================================================
// Screenshot
// ============================================================

export interface Screenshot {
  /** Unique identifier for this screenshot */
  id: string;
  /** Marketing headline (supports <br> for line breaks) */
  headline: string;
  /** Subtitle text */
  subtitle: string;
  /** Headline offset from top as percentage (0-30) */
  headlineOffset?: number;
  /** Path to screenshot image (relative to assets), or array for dual phone layout */
  imagePath: string | string[];
  /** Optional background image path (relative to assets) */
  backgroundImagePath?: string;
  /** Background glow effects */
  glows: GlowEffect[];
  /** Decorative shapes */
  shapes?: Shape[];
  /** Phone frame configuration */
  phoneFrame?: PhoneFrameOptions;
  /** Mascot configuration */
  mascot?: MascotOptions | null;
  /** Typography settings (overrides theme defaults) */
  typography?: TypographyOptions;
  /** Custom overlay images (stickers) */
  stickers?: OverlayImageOptions[];
  /** Screenshot-specific theme override */
  theme?: ThemeConfig;
  /** Screenshot-specific color palette override */
  palette?: ColorPalette;
}

// ============================================================
// Feature Graphic
// ============================================================

export interface FeatureGraphic {
  /** Headline text */
  headline: string;
  /** Subtitle text */
  subtitle: string;
  /** Screenshot image to display */
  imagePath: string;
  /** Background glow effects */
  glows: GlowEffect[];
  /** Show app icon */
  showIcon?: boolean;
  /** Show app name */
  showAppName?: boolean;
  /** Phone rotation angle (degrees) */
  phoneRotation?: number;
  /** Phone scale (percentage) */
  phoneScale?: number;
  /** Phone X position offset (percentage) */
  phoneX?: number;
  /** Phone Y position offset (percentage) */
  phoneY?: number;
  /** Mascot configuration */
  mascot?: MascotOptions | null;
  /** Decorative shapes */
  shapes?: Shape[];
  // Icon box styling
  /** Icon box size percentage, default 100 */
  iconBoxScale?: number;
  /** Icon box border radius in px */
  iconBoxRadius?: number;
  /** Icon box background color */
  iconBoxColor?: string;
  // Icon image styling
  /** Icon image scale percentage, default 100 */
  iconScale?: number;
  /** Icon image border radius in px */
  iconRadius?: number;
  /** Icon image horizontal offset */
  iconOffsetX?: number;
  /** Icon image vertical offset */
  iconOffsetY?: number;
  /** Custom overlay images (stickers) */
  stickers?: OverlayImageOptions[];
  /** Theme override */
  theme?: ThemeConfig;
  /** Color palette override */
  palette?: ColorPalette;
}
