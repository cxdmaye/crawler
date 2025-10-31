export const IPv4Renderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="space-y-2">
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <p className="font-mono text-xl font-semibold text-blue-900">{data}</p>
    </div>
    <p className="text-sm text-gray-600">互联网协议地址 (IPv4)</p>
  </div>
);