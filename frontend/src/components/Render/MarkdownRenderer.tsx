export const MarkdownRenderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{data}</pre>
  </div>
);