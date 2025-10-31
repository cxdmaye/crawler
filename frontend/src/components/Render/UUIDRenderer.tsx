export const UUIDRenderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
    <p className="font-mono text-lg font-semibold text-indigo-900 break-all">{data}</p>
    <p className="text-xs text-indigo-600 mt-2">通用唯一识别码</p>
  </div>
);