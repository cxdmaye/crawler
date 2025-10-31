export const EmailRenderer: React.FC<{ data: string }> = ({ data }) => (
  <div className="space-y-2">
    <a
      href={`mailto:${data}`}
      className="text-blue-600 hover:text-blue-700 font-mono text-lg font-medium hover:underline"
    >
      {data}
    </a>
    <p className="text-sm text-gray-500">点击发送邮件</p>
  </div>
);