import { ExternalLink } from 'lucide-react';

export const CoordinatesRenderer: React.FC<{ data: { lat: number; lng: number; raw: string } }> = ({ data }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-600 mb-1">纬度 (Latitude)</p>
        <p className="font-mono text-xl font-bold text-blue-900">{data.lat}°</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <p className="text-xs text-green-600 mb-1">经度 (Longitude)</p>
        <p className="font-mono text-xl font-bold text-green-900">{data.lng}°</p>
      </div>
    </div>
    <a
      href={`https://www.google.com/maps?q=${data.lat},${data.lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
    >
      <ExternalLink className="w-4 h-4" />
      在 Google 地图中查看
    </a>
  </div>
);