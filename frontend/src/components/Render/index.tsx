import React from 'react';
import { InputType, InputInterface } from '@/core/types';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ImageRenderer } from './ImageRenderer';
import { JSONRenderer } from './JSONRenderer';
import { ColorRenderer } from './ColorRenderer';
import { CronRenderer } from './CronRenderer';
import { TimestampRenderer } from './TimestampRenderer';
import { TextRenderer } from './TextRenderer';

import { URLRenderer } from './URLRenderer';

import { EmailRenderer } from './EmailRenderer';
import { HashRenderer } from './HashRenderer';
import { IPv4Renderer } from './IPv4Renderer';
import { Base64Renderer } from './Base64Renderer';
import { MathRenderer } from './MathRenderer';
import { MarkdownRenderer } from './MarkdownRenderer';
import { HTMLRenderer } from './HTMLRenderer';
import { CSSRenderer } from './CSSRenderer';
import { CodeRenderer } from './CodeRenderer';
import { UUIDRenderer } from './UUIDRenderer';
import { JWTRenderer } from './JWTRenderer';
import { PhoneRenderer } from './PhoneRenderer';
import { IDCardRenderer } from './IDCardRenderer';
import { CoordinatesRenderer } from './CoordinatesRenderer';
import { SqlRenderer } from './SqlRenderer';


interface ResultRendererProps {
  result: InputInterface;
}

export const ResultRenderer: React.FC<ResultRendererProps> = ({ result }) => {
  const renderContent = () => {
    switch (result.type) {
      case InputType.IMAGE:
        return <ImageRenderer data={result.data} />;
      case InputType.URL:
        return <URLRenderer data={result.data} />;
      case InputType.JSON:
        return <JSONRenderer data={result.data} />;
      case InputType.COLOR:
        return <ColorRenderer data={result.data} />;
      case InputType.CRON:
        return <CronRenderer data={result.data} />;
      case InputType.EMAIL:
        return <EmailRenderer data={result.data} />;
      case InputType.HASH:
        return <HashRenderer data={result.data} />;
      case InputType.TIMESTAMP:
        return <TimestampRenderer data={result.data} />;
      case InputType.IPV4:
        return <IPv4Renderer data={result.data} />;
      case InputType.BASE64:
        return <Base64Renderer data={result.data} />;
      case InputType.MATH:
        return <MathRenderer data={result.data} />;
      case InputType.MARKDOWN:
        return <MarkdownRenderer data={result.data} />;
      case InputType.HTML:
        return <HTMLRenderer data={result.data} />;
      case InputType.CSS:
        return <CSSRenderer data={result.data} />;
      case InputType.CODE:
        return <CodeRenderer data={result.data} />;
      case InputType.UUID:
        return <UUIDRenderer data={result.data} />;
      case InputType.JWT:
        return <JWTRenderer data={result.data} />;
      case InputType.PHONE:
        return <PhoneRenderer data={result.data} />;
      case InputType.IDCARD:
        return <IDCardRenderer data={result.data} />;
      case InputType.COORDINATES:
        return <CoordinatesRenderer data={result.data} />;
      case InputType.SQL:
        return <SqlRenderer data={result.data} />;
      case InputType.TEXT:
      default:
        return <TextRenderer data={result.data} />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      {/* 头部 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
          <DynamicIcon name={result.icon} color="white" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{result.label}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex-1 max-w-[120px]">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">{result.confidence}%</span>
          </div>
        </div>
      </div>

      {/* 内容 */}
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};
