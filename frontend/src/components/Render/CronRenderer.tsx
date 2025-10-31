import React from 'react';
import { Clock } from 'lucide-react';

interface CronRendererProps {
  data: string;
}

export const CronRenderer: React.FC<CronRendererProps> = ({ data }) => {
  const parts = data.split(' ');
  const labels = ['秒', '分', '时', '日', '月', '周', '年'];

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
        <p className="font-mono text-lg font-semibold text-purple-900 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {data}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {parts.map((part, index) => (
          <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">{labels[index] || `字段${index + 1}`}</p>
            <p className="font-mono font-semibold text-gray-900">{part}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-600 mt-2">
        💡 提示：CRON 表达式用于配置定时任务的执行时间
      </p>
    </div>
  );
};