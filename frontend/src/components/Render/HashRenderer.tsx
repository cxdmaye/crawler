export const HashRenderer: React.FC<{ data: { type: string; value: string } }> = ({ data }) => (
    <div className="space-y-2">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-600 mb-2 font-semibold">{data.type}</p>
            <p className="font-mono text-sm text-gray-800 break-all">{data.value}</p>
        </div>
    </div>
);