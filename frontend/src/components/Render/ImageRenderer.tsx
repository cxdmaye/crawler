import React, { useState } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';

interface ImageRendererProps {
  data: string;
}

export const ImageRenderer: React.FC<ImageRendererProps> = ({ data }) => {
  const [error, setError] = useState(false);

  return (
    <div className="space-y-3">
      {!error ? (
        <div className="relative group">
          <img
            src={data}
            alt="预览"
            className=" rounded-lg border border-gray-200 shadow-sm w-[200px]"
            onError={() => setError(true)}
          />
          <a
            href={data}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <ExternalLink className="w-4 h-4 text-gray-700" />
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">图片加载失败</p>
        </div>
      )}
      <a
        href={data}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:text-blue-700 break-all hover:underline inline-flex items-center gap-1"
      >
        {data}
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};