/**
 * Server-Side Rendering
 *
 * This module provides HTML generation using React's renderToStaticMarkup.
 */



import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Screenshot as ScreenshotComponent } from "./Screenshot.tsx";
import { FeatureGraphic as FeatureGraphicComponent } from "./FeatureGraphic.tsx";
import type { FeatureGraphicRenderOptions, RenderOptions } from "./types.ts";

// Ensure React is available globally for JSX
// @ts-ignore - needed for global JSX support in some environments
globalThis.React = React;

/**
 * Render a screenshot to a complete HTML document string
 */
export function renderScreenshot(options: RenderOptions): string {
  const element = React.createElement(ScreenshotComponent, { options });
  return "<!DOCTYPE html>\n" + renderToStaticMarkup(element);
}

/**
 * Render a feature graphic to a complete HTML document string
 */
export function renderFeatureGraphic(
  options: FeatureGraphicRenderOptions,
): string {
  const element = React.createElement(FeatureGraphicComponent, { options });
  return "<!DOCTYPE html>\n" + renderToStaticMarkup(element);
}

// Re-export constants for convenience
export { GLOW_COLORS } from "./constants.ts";
