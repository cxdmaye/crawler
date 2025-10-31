import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface TimestampRendererProps {
  data: {
    raw: string;
    date: string;
    isMilliseconds: boolean;
    iso: string;
  };
}

export const TimestampRenderer: React.FC<TimestampRendererProps> = ({ data }) => {
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          原始时间戳
        </p>
        <p className="font-mono text-lg font-semibold text-gray-900">{data.raw}</p>
        <p className="text-xs text-gray-500 mt-1">
          {data.isMilliseconds ? '毫秒级 (13位)' : '秒级 (10位)'}
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-600 mb-2 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          本地时间
        </p>
        <p className="font-semibold text-blue-900 text-lg">{data.date}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 mb-1">ISO 8601 格式</p>
        <p className="font-mono text-sm text-gray-700">{data.iso}</p>
      </div>
    </div>
  );
};