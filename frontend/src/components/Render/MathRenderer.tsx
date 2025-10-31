export const MathRenderer: React.FC<{ data: { expression: string; result: number; formatted: string } }> = ({ data }) => (
    <div className="space-y-3">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">表达式</p>
            <p className="font-mono text-lg text-gray-900">{data.expression}</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <p className="text-xs text-green-600 mb-1">计算结果</p>
            <p className="font-mono text-3xl font-bold text-green-900">{data.formatted}</p>
        </div>
    </div>
);