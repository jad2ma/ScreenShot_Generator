/**
 * MascotEditorInline Component
 * 
 * Inline editor for managing mascot images on screenshots.
 */

import { Slider, ImageSelect } from '../inputs/index';
import type { Mascot, Assets, Config } from '../../types';

interface MascotEditorInlineProps {
  mascot: Mascot | null;
  assets: Assets;
  config: Config;
  onChange: (mascot: Mascot | null) => void;
  onAssetsRefresh: () => Promise<void>;
}

const POSITIONS = [
  { value: 'top-left', rotation: '-45', label: 'Top Left' },
  { value: 'top-right', rotation: '45', label: 'Top Right' },
  { value: 'bottom-left', rotation: '-135', label: 'Bottom Left' },
  { value: 'bottom-right', rotation: '135', label: 'Bottom Right' },
] as const;

export function MascotEditorInline({
  mascot,
  assets,
  config,
  onChange,
  onAssetsRefresh,
}: MascotEditorInlineProps) {
  const enabled = mascot !== null && mascot !== undefined;

  const toggleMascot = () => {
    if (enabled) {
      onChange(null);
    } else {
      onChange({
        position: 'bottom-right',
        imagePath: config.app?.defaultMascotPath || '',
        size: 15,
        offset: 20,
        borderRadius: 0,
      });
    }
  };

  const updateMascot = (updates: Partial<Mascot>) => {
    if (mascot) {
      onChange({ ...mascot, ...updates });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          onClick={toggleMascot}
          className={`text-xs px-3 py-1.5 rounded ${enabled ? 'bg-indigo-600' : 'bg-zinc-800 hover:bg-zinc-700'}`}
        >
          {enabled ? 'Enabled' : 'Add Mascot'}
        </button>
      </div>

      {enabled && mascot && (
        <div className="space-y-3">
          <ImageSelect
            label="Image"
            value={mascot.imagePath || config.app?.defaultMascotPath || ''}
            onChange={(v) => updateMascot({ imagePath: v })}
            options={[...(assets.mascots || []), ...(assets.screenshots || [])]}
            category="mascots"
            onAssetsRefresh={onAssetsRefresh}
            placeholder="Default"
          />

          <div>
            <label className="text-xs text-zinc-500 block mb-1">Position</label>
            <div className="grid grid-cols-2 gap-2">
              {POSITIONS.map((pos) => (
                <button
                  onClick={() => updateMascot({ position: pos.value })}
                  className={`px-2 py-1.5 rounded text-xs flex items-center gap-1.5 ${
                    (mascot.position || 'bottom-right') === pos.value
                      ? 'bg-indigo-600'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  <i
                    className="fa-solid fa-arrow-up"
                    style={{ transform: `rotate(${pos.rotation}deg)` }}
                  />
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Slider
              label="Size"
              value={mascot.size ?? 15}
              onChange={(v) => updateMascot({ size: v })}
              min={5}
              max={30}
              step={1}
              unit="%"
            />
            <Slider
              label="Offset"
              value={mascot.offset ?? 20}
              onChange={(v) => updateMascot({ offset: v })}
              min={0}
              max={100}
              step={5}
              unit="px"
            />
            <Slider
              label="Radius"
              value={mascot.borderRadius ?? 0}
              onChange={(v) => updateMascot({ borderRadius: v })}
              min={0}
              max={50}
              step={5}
              unit="%"
            />
          </div>
          <div className="pt-2 border-t border-zinc-800/50">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                Layer (0: Back | 20: Front)
              </label>
              <div className="text-[10px] font-medium text-indigo-400">
                {(mascot.zIndex ?? 20) < 15 ? 'Behind Phone' : 'In Front of Phone'}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <input
                type="range"
                value={mascot.zIndex ?? 20}
                onInput={(e) => updateMascot({ zIndex: Number((e.target as HTMLInputElement).value) })}
                min="0"
                max="100"
                className="flex-1 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="w-10 text-center text-xs font-mono text-zinc-400 bg-zinc-900/50 py-0.5 rounded border border-zinc-700/50">
                {mascot.zIndex ?? 20}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
