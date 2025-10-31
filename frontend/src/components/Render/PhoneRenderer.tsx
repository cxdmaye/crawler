export const PhoneRenderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="space-y-2">
    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
      <p className="font-mono text-2xl font-bold text-green-900 tracking-wider">{data}</p>
    </div>
    <a href={`tel:${data}`} className="text-sm text-blue-600 hover:text-blue-700 hover:underline inline-block">
      点击拨打电话
    </a>
  </div>
);