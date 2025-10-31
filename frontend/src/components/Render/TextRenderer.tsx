import React, { useEffect } from 'react';
import CopyField from '@/components/CopyField';

interface TextRendererProps {
  data: string;
}

export const TextRenderer: React.FC<TextRendererProps> = ({ data }) => {

  const array_list_reg = /\n/;

  const [result, setResult] = React.useState<any>(null);

  function handleAnalyze(value: string) {
    // Analysis logic goes here
    if (array_list_reg.test(value)) {
      setResult(value.replaceAll('\n', ','))
    }
  }

  useEffect(() => {
    handleAnalyze(data);
    // You can add any side effects or data fetching logic here if needed
  }, [data]);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex gap-2">
      <div className='flex-1'>
        <p className="text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
          {data}
        </p>
      </div>
      <div className="w-[200px]">
        <h2>数组转换</h2>
        {result && (
          <div className="mt-4 p-2 bg-white border border-gray-300 rounded">
            <h3 className="font-semibold mb-2">分析结果:</h3>
            <p className="text-gray-600 break-words">
              {result}
              <CopyField value={result} />
            </p>
          </div>
        )}
      </div>

    </div>
  );
};