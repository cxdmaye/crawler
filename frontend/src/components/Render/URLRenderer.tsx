import React from 'react';
import { ExternalLink } from 'lucide-react';

export const URLRenderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="space-y-2">
    <a
      href={data}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-700 break-all hover:underline inline-flex items-center gap-2 text-lg font-medium"
    >
      {data}
      <ExternalLink className="w-4 h-4 flex-shrink-0" />
    </a>
    <p className="text-sm text-gray-500">点击访问该链接</p>
  </div>
);