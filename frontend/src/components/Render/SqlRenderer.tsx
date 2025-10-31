import React, { useEffect } from "react";

interface SqlRendererProps {
  data: string;
}

export const SqlRenderer: React.FC<SqlRendererProps> = ({ data }) => {

  const [result, setResult] = React.useState<any>(null);

  function handleAnalyze(value: string) {
    // Analysis logic goes here
    try {
      // Simple validation for SQL (this can be improved)
      if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TRUNCATE)\s+/i.test(value.trim())) {
        setResult("这是一个有效的SQL语句。");
      } else {
        setResult("这不是一个有效的SQL语句。");
      }
    } catch (error) {
      setResult("SQL分析出错。");
    }
  }

  useEffect(() => {
    handleAnalyze(data);
    // You can add any side effects or data fetching logic here if needed
  }, [data]);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex gap-2">
      <div className='flex-1'>
        <pre className="text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
          {data}
        </pre>
      </div>
      <div className="w-[200px]">
        <h2>SQL分析</h2>
        {result && (
          <div className="mt-4 p-2 bg-white border border-gray-300 rounded">
            <h3 className="font-semibold mb-2">分析结果:</h3>
            <p className="text-gray-600 break-words">
              {result}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}