/**
 * ScreenshotEditor Component
 * 
 * Full editor panel for configuring screenshot settings including
 * content, typography, layout, phone frame, glows, shapes, and mascot.
 */

import { Slider, ColorInput } from '../inputs/index';
import { CollapsibleSection } from '../CollapsibleSection';
import { DeviceMockupEditor } from './DeviceMockupEditor';
import { GlowEditorInline } from './GlowEditorInline';
import { ShapeEditorInline } from './ShapeEditorInline';
import { MascotEditorInline } from './MascotEditorInline';
import { StickerEditorInline } from './StickerEditorInline';
import type { Screenshot, Assets, Config } from '../../types';

const CURATED_FONTS = [
  'SF Pro Display',
  'Inter',
  'Poppins',
  'Sora',
  'Manrope',
  'DM Sans',
  'Plus Jakarta Sans',
  'Urbanist',
];

interface ScreenshotEditorProps {
  screenshot: Screenshot;
  assets: Assets;
  config: Config;
  selectedPlatform: 'android' | 'ios';
  onUpdate: (updates: Partial<Screenshot>) => void;
  onUpdateConfig: (config: Config) => void;
  onAssetsRefresh: () => Promise<void>;
}

export function ScreenshotEditor({
  screenshot,
  assets,
  config,
  selectedPlatform,
  onUpdate,
  onUpdateConfig: _onUpdateConfig,
  onAssetsRefresh,
}: ScreenshotEditorProps) {
  const typo = screenshot.typography || {};

  const updateTypography = (updates: Record<string, unknown>) => {
    onUpdate({ typography: { ...typo, ...updates } });
  };

  return (
    <div className="editor-sidebar bg-zinc-900 border-l border-zinc-800 overflow-y-auto">
      <div className="p-4 space-y-3">
        <h2 className="font-bold text-lg mb-4 text-zinc-300">Screenshot Editor</h2>

        {/* Theme & Background Section */}
        <CollapsibleSection title="Theme & Background" defaultOpen={true}>
          <div className="space-y-4 pt-1">
            {/* Background Gradient */}
            <div>
              <label className="text-xs text-zinc-500 block mb-2 font-medium">Background Gradient</label>
              <textarea
                value={screenshot.theme?.background?.gradient || config.theme.background.gradient}
                onChange={(e) => onUpdate({ 
                  theme: { 
                    ...(screenshot.theme || config.theme), 
                    background: { 
                      ...(screenshot.theme?.background || config.theme.background),
                      gradient: e.target.value 
                    } 
                  } 
                })}
                rows={3}
                className="w-full px-3 py-2 rounded text-xs bg-zinc-800 border border-zinc-700 font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="linear-gradient(...)"
              />
            </div>

            {/* Background Image */}
            <div>
              <label className="text-xs text-zinc-500 block mb-2 font-medium uppercase tracking-wider">Background Image</label>
              <select
                value={screenshot.backgroundImagePath || ''}
                onChange={(e) => onUpdate({ backgroundImagePath: e.target.value })}
                className="w-full px-3 py-2 rounded text-sm bg-zinc-800 border border-zinc-700 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">None</option>
                {assets.screenshots.map(asset => (
                  <option key={asset.path} value={asset.path}>{asset.name}</option>
                ))}
              </select>
              <p className="text-[10px] text-zinc-600 mt-1 italic">Layered behind glows and shapes</p>
            </div>

            {/* Local Palette */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-tighter">Primary</label>
                <ColorInput 
                  color={screenshot.palette?.primary || config.palette?.primary || '#3b82f6'} 
                  onChange={(color) => onUpdate({ 
                    palette: { 
                      ...(screenshot.palette || config.palette || { primary: '', secondary: '', accent: '' }), 
                      primary: color 
                    } 
                  })} 
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-tighter">Secondary</label>
                <ColorInput 
                  color={screenshot.palette?.secondary || config.palette?.secondary || '#1d4ed8'} 
                  onChange={(color) => onUpdate({ 
                    palette: { 
                      ...(screenshot.palette || config.palette || { primary: '', secondary: '', accent: '' }), 
                      secondary: color 
                    } 
                  })} 
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-tighter">Accent</label>
                <ColorInput 
                  color={screenshot.palette?.accent || config.palette?.accent || '#ffffff'} 
                  onChange={(color) => onUpdate({ 
                    palette: { 
                      ...(screenshot.palette || config.palette || { primary: '', secondary: '', accent: '' }), 
                      accent: color 
                    } 
                  })} 
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Content Section */}
        <CollapsibleSection title="Content" defaultOpen={false}>
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Headline</label>
            <input
              type="text"
              value={screenshot.headline || ''}
              onInput={(e) => onUpdate({ headline: (e.target as HTMLInputElement).value })}
              className="w-full px-3 py-2 rounded text-sm"
              placeholder="Your headline here..."
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Subtitle</label>
            <input
              type="text"
              value={screenshot.subtitle || ''}
              onInput={(e) => onUpdate({ subtitle: (e.target as HTMLInputElement).value })}
              className="w-full px-3 py-2 rounded text-sm"
              placeholder="A compelling subtitle..."
            />
          </div>
        </CollapsibleSection>

        {/* Fonts Section */}
        <CollapsibleSection title="Fonts" defaultOpen={false}>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Headline Font</label>
              <select
                value={typo.headlineFontFamily ?? 'SF Pro Display'}
                onChange={(e) => updateTypography({ headlineFontFamily: e.target.value })}
                className="w-full px-3 py-2 rounded text-sm bg-zinc-800 border border-zinc-700"
                style={{ fontFamily: typo.headlineFontFamily }}
              >
                {CURATED_FONTS.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Subtitle Font</label>
              <select
                value={typo.subtitleFontFamily ?? 'SF Pro Display'}
                onChange={(e) => updateTypography({ subtitleFontFamily: e.target.value })}
                className="w-full px-3 py-2 rounded text-sm bg-zinc-800 border border-zinc-700"
                style={{ fontFamily: typo.subtitleFontFamily }}
              >
                {CURATED_FONTS.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                ))}
              </select>
            </div>
          </div>
        </CollapsibleSection>

        {/* Typography Section */}
        <CollapsibleSection title="Typography" defaultOpen={false}>
          <div className="grid grid-cols-2 gap-3">
            <Slider
              label="Headline Size"
              value={typo.headlineFontSize ?? 5.2}
              onChange={(v) => updateTypography({ headlineFontSize: v })}
              min={3}
              max={12}
              step={0.1}
              unit="%"
            />
            <Slider
              label="Subtitle Size"
              value={typo.subtitleFontSize ?? 2.4}
              onChange={(v) => updateTypography({ subtitleFontSize: v })}
              min={1.5}
              max={8}
              step={0.1}
              unit="%"
            />
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Headline Weight</label>
              <select
                value={typo.headlineFontWeight ?? 800}
                onChange={(e) => updateTypography({ headlineFontWeight: Number((e.target as HTMLSelectElement).value) })}
                className="w-full px-3 py-2 rounded text-sm"
              >
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semibold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Subtitle Weight</label>
              <select
                value={typo.subtitleFontWeight ?? 500}
                onChange={(e) => updateTypography({ subtitleFontWeight: Number((e.target as HTMLSelectElement).value) })}
                className="w-full px-3 py-2 rounded text-sm"
              >
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semibold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Slider
              label="Line Height"
              value={typo.headlineLineHeight ?? 1.15}
              onChange={(v) => updateTypography({ headlineLineHeight: v })}
              min={1}
              max={2}
              step={0.05}
            />
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Text Align</label>
              <div className="flex gap-1">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    onClick={() => updateTypography({ textAlign: align })}
                    className={`flex-1 px-2 py-1.5 rounded text-xs ${
                      (typo.textAlign ?? 'center') === align ? 'bg-indigo-600' : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Text Color</label>
              <ColorInput
                value={typo.textColor ?? '#ffffff'}
                onChange={(v) => updateTypography({ textColor: v })}
              />
            </div>
            <Slider
              label="Padding"
              value={typo.horizontalPadding ?? 6}
              onChange={(v) => updateTypography({ horizontalPadding: v })}
              min={2}
              max={25}
              step={1}
              unit="%"
            />
          </div>
        </CollapsibleSection>

        {/* Layout Section */}
        <CollapsibleSection title="Layout" defaultOpen={false}>
          <Slider
            label="Title Offset from Top"
            value={screenshot.headlineOffset ?? 0}
            onChange={(v) => onUpdate({ headlineOffset: v })}
            min={0}
            max={100}
            step={1}
            unit="%"
          />
        </CollapsibleSection>

        {/* Device Mockup Section */}
        <CollapsibleSection title="Device Mockup" defaultOpen={true}>
          <DeviceMockupEditor
            screenshot={screenshot}
            assets={assets}
            config={config}
            selectedPlatform={selectedPlatform}
            onUpdate={onUpdate}
            onAssetsRefresh={onAssetsRefresh}
          />
        </CollapsibleSection>

        {/* Glows Section */}
        <CollapsibleSection title="Background Glows" defaultOpen={false}>
          <GlowEditorInline
            glows={screenshot.glows || []}
            onChange={(glows) => onUpdate({ glows })}
            palette={config.palette}
          />
        </CollapsibleSection>

        {/* Shapes Section */}
        <CollapsibleSection title="Decorative Shapes" defaultOpen={false}>
          <ShapeEditorInline
            shapes={screenshot.shapes || []}
            onChange={(shapes) => onUpdate({ shapes })}
            palette={config.palette}
          />
        </CollapsibleSection>

        {/* Mascot Section */}
        <CollapsibleSection title="Mascot" defaultOpen={false}>
          <MascotEditorInline
            mascot={screenshot.mascot || null}
            assets={assets}
            config={config}
            onChange={(mascot) => onUpdate({ mascot })}
            onAssetsRefresh={onAssetsRefresh}
          />
        </CollapsibleSection>

        {/* Stickers Section */}
        <CollapsibleSection title="Custom Overlays (Images)" defaultOpen={false}>
          <StickerEditorInline
            stickers={screenshot.stickers || []}
            assets={assets}
            onChange={(stickers) => onUpdate({ stickers })}
            onAssetsRefresh={onAssetsRefresh}
          />
        </CollapsibleSection>
      </div>
    </div>
  );
}
