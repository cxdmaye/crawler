export const Base64Renderer: React.FC<{ data: { encoded: string; decoded: string; length: number } }> = ({ data }) => (
  <div className="space-y-3">
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-32 overflow-auto">
      <p className="text-xs text-gray-500 mb-1">编码内容 ({data.length} 字符)</p>
      <p className="font-mono text-sm text-gray-700 break-all">
        {data.encoded.slice(0, 200)}{data.encoded.length > 200 ? '...' : ''}
      </p>
    </div>
    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
      <p className="text-xs text-green-600 mb-1">解码结果</p>
      <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{data.decoded}</p>
    </div>
  </div>
);