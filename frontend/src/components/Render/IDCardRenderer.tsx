export const IDCardRenderer: React.FC<{ data: { raw: string; masked: string } }> = ({ data }) => (
  <div className="space-y-2">
    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
      <p className="font-mono text-xl font-bold text-gray-900 tracking-wider">{data.masked}</p>
    </div>
    <p className="text-sm text-yellow-700 flex items-center gap-1">
      ⚠️ 已脱敏显示，请注意保护个人隐私
    </p>
  </div>
);