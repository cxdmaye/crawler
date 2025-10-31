export const CSSRenderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
    <code className="text-blue-300 text-sm font-mono whitespace-pre">{data}</code>
  </div>
);