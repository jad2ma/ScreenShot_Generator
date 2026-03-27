/**
 * StickerEditorInline Component
 * 
 * Inline editor for managing custom overlay images (stickers).
 */

import { NumberInput, ImageSelect, Slider } from '../inputs/index';
import type { OverlayImageOptions, Assets } from '../../types';

interface StickerEditorInlineProps {
  stickers: OverlayImageOptions[];
  assets: Assets;
  onChange: (stickers: OverlayImageOptions[]) => void;
  onAssetsRefresh: () => Promise<void>;
}

export function StickerEditorInline({
  stickers = [],
  assets,
  onChange,
  onAssetsRefresh,
}: StickerEditorInlineProps) {
  const addSticker = () => {
    const newSticker: OverlayImageOptions = {
      id: crypto.randomUUID(),
      imagePath: assets.screenshots?.[0] || '',
      x: 50,
      y: 50,
      scale: 30,
      rotation: 0,
      opacity: 1,
      zIndex: 30,
    };
    onChange([...stickers, newSticker]);
  };

  const updateSticker = (id: string, updates: Partial<OverlayImageOptions>) => {
    onChange(
      stickers.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const removeSticker = (id: string) => {
    onChange(stickers.filter((s) => s.id !== id));
  };

  const duplicateSticker = (id: string) => {
    const sticker = stickers.find((s) => s.id === id);
    if (!sticker) return;
    const copy = { ...sticker, id: crypto.randomUUID(), x: Math.min(100, sticker.x + 5), y: Math.min(100, sticker.y + 5) };
    onChange([...stickers, copy]);
  };

  return (
    <div className="space-y-4">
      {stickers.map((sticker, i) => (
        <div key={sticker.id} className="p-3 bg-zinc-800/50 rounded-lg space-y-3 border border-zinc-700/50">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-zinc-400">Sticker #{i + 1}</span>
            <div className="flex gap-1">
              <button 
                onClick={() => duplicateSticker(sticker.id)}
                className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Duplicate"
              >
                <i className="fa-solid fa-copy text-xs" />
              </button>
              <button 
                onClick={() => removeSticker(sticker.id)}
                className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                title="Remove"
              >
                <i className="fa-solid fa-trash-can text-xs" />
              </button>
            </div>
          </div>

          <ImageSelect
            value={sticker.imagePath}
            onChange={(v) => updateSticker(sticker.id, { imagePath: v })}
            options={assets.screenshots || []}
            category="screenshots"
            onAssetsRefresh={onAssetsRefresh}
          />

          <div className="grid grid-cols-2 gap-3">
            <Slider
              label="X Position"
              value={sticker.x}
              onChange={(v) => updateSticker(sticker.id, { x: v })}
              min={0}
              max={100}
              unit="%"
            />
            <Slider
              label="Y Position"
              value={sticker.y}
              onChange={(v) => updateSticker(sticker.id, { y: v })}
              min={0}
              max={100}
              unit="%"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Slider
              label="Scale"
              value={sticker.scale}
              onChange={(v) => updateSticker(sticker.id, { scale: v })}
              min={5}
              max={200}
              unit="%"
            />
            <Slider
              label="Rotation"
              value={sticker.rotation}
              onChange={(v) => updateSticker(sticker.id, { rotation: v })}
              min={-180}
              max={180}
              unit="°"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">Opacity</label>
              <input
                type="range"
                value={(sticker.opacity ?? 1) * 100}
                onInput={(e) => updateSticker(sticker.id, { opacity: Number((e.target as HTMLInputElement).value) / 100 })}
                min="0"
                max="100"
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                  Layer (0: Back | 30: Front)
                </label>
                <div className="text-[9px] font-medium text-indigo-400">
                  {(sticker.zIndex ?? 30) < 15 ? 'Behind Phone' : (sticker.zIndex ?? 30) < 20 ? 'Behind Mascot' : 'In Front'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  value={sticker.zIndex ?? 30}
                  onInput={(e) => updateSticker(sticker.id, { zIndex: Number((e.target as HTMLInputElement).value) })}
                  min="0"
                  max="100"
                  className="flex-1 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="w-8 text-center text-[10px] font-mono text-zinc-400 bg-zinc-900/50 py-0.5 rounded border border-zinc-700/50">
                  {sticker.zIndex ?? 30}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addSticker}
        className="w-full py-2.5 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800/50 transition-all flex items-center justify-center gap-2"
      >
        <i className="fa-solid fa-plus text-[10px]" />
        Add New Image Overlay
      </button>
    </div>
  );
}
