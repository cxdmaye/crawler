import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface JSONRendererProps {
  data: any;
}

export const JSONRenderer: React.FC<JSONRendererProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const formatted = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard?.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors z-10"
        title="复制 JSON"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4 text-gray-600" />
        )}
      </button>
      <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border border-gray-200 max-h-96 overflow-y-auto">
        <code className="text-gray-800 font-mono">{formatted}</code>
      </pre>
    </div>
  );
};