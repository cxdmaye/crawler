export const JWTRenderer: React.FC<{ data: { raw: string; header: any; payload: any } }> = ({ data }) => (
  <div className="space-y-3">
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-20 overflow-auto">
      <p className="font-mono text-xs text-gray-600 break-all">{data.raw}</p>
    </div>
    <div className="grid md:grid-cols-2 gap-3">
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-600 font-semibold mb-2">Header</p>
        <pre className="text-xs font-mono text-gray-700 overflow-x-auto">
          {JSON.stringify(data.header, null, 2)}
        </pre>
      </div>
      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <p className="text-xs text-green-600 font-semibold mb-2">Payload</p>
        <pre className="text-xs font-mono text-gray-700 overflow-x-auto">
          {JSON.stringify(data.payload, null, 2)}
        </pre>
      </div>
    </div>
  </div>
);