/**
 * Base Styles Component
 *
 * Provides CSS styles for screenshot rendering.
 * Can be rendered to a <style> tag or exported as a string.
 */

import React from "react";
import type { ColorPalette, ThemeConfig } from "./types.ts";

interface BaseStyleOptions {
  /**
   * Scope all selectors to a specific root for embedded previews.
   * When set, document-level selectors (html/body) are omitted.
   */
  scopeSelector?: string;
  palette?: ColorPalette;
  backgroundImagePath?: string;
}

/**
 * Generate base CSS styles for screenshot rendering
 */
export function getBaseStylesCSS(
  theme: ThemeConfig,
  options: BaseStyleOptions = {},
): string {
  const { scopeSelector, palette, backgroundImagePath } = options;
  const fontUrl = theme.googleFontsUrl
    ? `@import url('${theme.googleFontsUrl}');`
    : "";

  const isScoped = Boolean(scopeSelector);
  const selectorPrefix = scopeSelector ? `${scopeSelector} ` : "";
  const resetSelector = scopeSelector
    ? `${scopeSelector}, ${scopeSelector} *`
    : "*";
  const fontFamilySelector = scopeSelector ?? "body";
  const documentRules = isScoped ? "" : `
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    `;

  const paletteRules = palette ? `
    :root, ${selectorPrefix}.screenshot {
      --primary: ${palette.primary};
      --secondary: ${palette.secondary};
      --accent: ${palette.accent};
    }
  ` : "";

  return `
    ${fontUrl}
    ${paletteRules}
    
    ${resetSelector} {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    ${documentRules}
    
    ${fontFamilySelector} {
      font-family: ${theme.fontFamily};
    }
    
    ${selectorPrefix}.screenshot {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      background: ${theme.background.gradient};
      ${
    backgroundImagePath
      ? `background-image: url('${backgroundImagePath}'), ${theme.background.gradient}; background-size: cover; background-position: center;`
      : ""
  }
    }
    
    ${selectorPrefix}.headline-area {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
      color: white;
      padding: 5% 6% 3% 6%;
      z-index: 10;
    }
    
    ${selectorPrefix}.headline-area h1 {
      font-size: 5%;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 0.8%;
      letter-spacing: -0.02em;
      text-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    
    ${selectorPrefix}.headline-area p {
      font-size: 2.2%;
      font-weight: 500;
      opacity: 0.9;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    ${selectorPrefix}.phone-area {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      z-index: 15;
    }
    
    ${selectorPrefix}.mascot {
      position: absolute;
      z-index: 20;
    }
    
    ${selectorPrefix}.mascot img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `;
}

interface BaseStylesProps {
  theme: ThemeConfig;
  palette?: ColorPalette;
  backgroundImagePath?: string;
  typography?: {
    headlineFontSize?: number;
    subtitleFontSize?: number;
    headlineFontWeight?: number;
    subtitleFontWeight?: number;
    headlineLineHeight?: number;
    textColor?: string;
    textAlign?: "left" | "center" | "right";
    horizontalPadding?: number;
    headlineFontFamily?: string;
    subtitleFontFamily?: string;
  };
  dimensions?: { width: number; height: number };
}

/**
 * Base Styles Component
 *
 * Renders a <style> tag with all necessary CSS for screenshot rendering.
 */
export function BaseStyles(
  { theme, palette, typography, backgroundImagePath, dimensions }: BaseStylesProps,
): React.ReactElement {
  const baseCSS = getBaseStylesCSS(theme, { palette, backgroundImagePath });

  // Typography overrides if provided
  let typographyCSS = "";
  if (typography && dimensions) {
    const typo = typography;
    const headlineFontSize = dimensions.width *
      ((typo.headlineFontSize ?? 5.2) / 100);
    const subtitleFontSize = dimensions.width *
      ((typo.subtitleFontSize ?? 2.4) / 100);
    const headlineFontWeight = typo.headlineFontWeight ?? 800;
    const subtitleFontWeight = typo.subtitleFontWeight ?? 500;
    const headlineLineHeight = typo.headlineLineHeight ?? 1.15;
    const textColor = typo.textColor ?? "white";
    const textAlign = typo.textAlign ?? "center";
    const horizontalPadding = typo.horizontalPadding ?? 6;

    typographyCSS = `
      .headline-area {
        text-align: ${textAlign};
        color: ${textColor};
        padding-left: ${horizontalPadding}%;
        padding-right: ${horizontalPadding}%;
      }
      
      .headline-area h1 {
        font-size: ${headlineFontSize}px;
        font-weight: ${headlineFontWeight};
        line-height: ${headlineLineHeight};
        font-family: ${typo.headlineFontFamily || "inherit"};
      }
      
      .headline-area p {
        font-size: ${subtitleFontSize}px;
        font-weight: ${subtitleFontWeight};
        font-family: ${typo.subtitleFontFamily || "inherit"};
      }
    `;
  }

  return (
    <style
      dangerouslySetInnerHTML={{ __html: baseCSS + typographyCSS }}
    />
  );
}
