export const CodeRenderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto max-h-96">
    <code className="text-green-400 text-sm font-mono whitespace-pre">{data}</code>
  </div>
);