export const HTMLRenderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="space-y-3">
    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto max-h-64">
      <code className="text-green-400 text-sm font-mono">{data}</code>
    </div>
    <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
      <p className="text-xs text-gray-500 mb-2">渲染预览：</p>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  </div>
);