/**
 * Stickers Component
 * 
 * Renders custom overlay images with full transform control.
 */

import React from "react";
import type { OverlayImageOptions } from "../types/components.ts";
import { assetUrl } from "./utils.ts";

interface StickersProps {
  stickers: OverlayImageOptions[];
  assetUrlPrefix?: string;
}

export function Stickers({
  stickers,
  assetUrlPrefix = "/assets/",
}: StickersProps): React.ReactElement | null {
  if (!stickers || stickers.length === 0) return null;

  return (
    <>
      {stickers.map((sticker) => {
        const style: React.CSSProperties = {
          position: "absolute",
          left: `${sticker.x}%`,
          top: `${sticker.y}%`,
          width: `${sticker.scale}%`,
          transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
          opacity: sticker.opacity ?? 1,
          zIndex: sticker.zIndex ?? 30,
          pointerEvents: "none",
        };

        return (
          <div key={sticker.id} style={style} className="sticker">
            <img
              src={assetUrl(sticker.imagePath, assetUrlPrefix)}
              alt="Sticker"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        );
      })}
    </>
  );
}
