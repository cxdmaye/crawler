// filepath: /Volumes/Outlet/code/sample/src/example/magic-input2/renderers/ColorRenderer.tsx
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorRendererProps {
  data: string;
}

export const ColorRenderer: React.FC<ColorRendererProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  

  const rgb = data.startsWith('#') ? hexToRgb(data) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div
          className="w-32 h-32 rounded-xl shadow-lg border-4 border-white ring-2 ring-gray-200"
          style={{ backgroundColor: data }}
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-semibold text-gray-900">{data}</span>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
          {rgb && (
            <p className="text-sm text-gray-600 font-mono">
              RGB({rgb.r}, {rgb.g}, {rgb.b})
            </p>
          )}
        </div>
      </div>
    </div>
  );
};