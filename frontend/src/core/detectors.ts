import { InputType, InputInterface } from './types';

// 检测器接口
interface Detector {
  test: (content: string) => InputInterface | null;
}

// 1. 图片 URL 检测器
export const imageDetector: Detector = {
  test: (content: string) => {
    const imageUrlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;
    if (imageUrlPattern.test(content.trim())) {
      return {
        type: InputType.IMAGE,
        confidence: 95,
        label: '图片地址',
        icon: 'image',
        data: content.trim()
      };
    }
    return null;
  }
};

// 2. URL 检测器
export const urlDetector: Detector = {
  test: (content: string) => {
    const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    if (urlPattern.test(content.trim())) {
      return {
        type: InputType.URL,
        confidence: 90,
        label: '网页链接',
        icon: 'link',
        data: content.trim()
      };
    }
    return null;
  }
};

// 3. JSON 检测器
export const jsonDetector: Detector = {
  test: (content: string) => {
    try {
      const trimmed = content.trim();
      if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
        return null;
      }
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === 'object') {
        return {
          type: InputType.JSON,
          confidence: 95,
          label: 'JSON 数据',
          icon: 'file-json',
          data: parsed
        };
      }
    } catch (e) {
      // 不是有效的 JSON
    }
    return null;
  }
};

// 4. 颜色值检测器
export const colorDetector: Detector = {
  test: (content: string) => {
    const trimmed = content.trim();
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbPattern = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    const rgbaPattern = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;

    if (hexPattern.test(trimmed) || rgbPattern.test(trimmed) || rgbaPattern.test(trimmed)) {
      return {
        type: InputType.COLOR,
        confidence: 90,
        label: '颜色值',
        icon: 'palette',
        data: trimmed
      };
    }
    return null;
  }
};

// 5. CRON 表达式检测器
export const cronDetector: Detector = {
  test: (content: string) => {
    const cronPattern = /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\?|\*\/([0-6]))( (\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])))?$/;
    
    if (cronPattern.test(content.trim())) {
      return {
        type: InputType.CRON,
        confidence: 85,
        label: 'CRON 表达式',
        icon: 'clock',
        data: content.trim()
      };
    }
    return null;
  }
};

// 6. 邮箱检测器
export const emailDetector: Detector = {
  test: (content: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(content.trim())) {
      return {
        type: InputType.EMAIL,
        confidence: 90,
        label: '电子邮箱',
        icon: 'mail',
        data: content.trim()
      };
    }
    return null;
  }
};

// 7. 哈希值检测器
export const hashDetector: Detector = {
  test: (content: string) => {
    const trimmed = content.trim();
    const md5Pattern = /^[a-fA-F0-9]{32}$/;
    const sha1Pattern = /^[a-fA-F0-9]{40}$/;
    const sha256Pattern = /^[a-fA-F0-9]{64}$/;

    if (md5Pattern.test(trimmed)) {
      return {
        type: InputType.HASH,
        confidence: 85,
        label: 'MD5 哈希',
        icon: 'hash',
        data: { type: 'MD5', value: trimmed }
      };
    } else if (sha1Pattern.test(trimmed)) {
      return {
        type: InputType.HASH,
        confidence: 85,
        label: 'SHA-1 哈希',
        icon: 'hash',
        data: { type: 'SHA-1', value: trimmed }
      };
    } else if (sha256Pattern.test(trimmed)) {
      return {
        type: InputType.HASH,
        confidence: 85,
        label: 'SHA-256 哈希',
        icon: 'hash',
        data: { type: 'SHA-256', value: trimmed }
      };
    }
    return null;
  }
};

// 8. 时间戳检测器
export const timestampDetector: Detector = {
  test: (content: string) => {
    const timestampPattern = /^\d{10,13}$/;
    if (timestampPattern.test(content.trim())) {
      const num = parseInt(content.trim());
      const isMilliseconds = num > 9999999999;
      const date = new Date(isMilliseconds ? num : num * 1000);
      
      if (date.getTime() > 0 && date.getFullYear() > 1970 && date.getFullYear() < 2100) {
        return {
          type: InputType.TIMESTAMP,
          confidence: 90,
          label: '时间戳',
          icon: 'calendar',
          data: {
            raw: content.trim(),
            date: date.toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }),
            isMilliseconds,
            iso: date.toISOString()
          }
        };
      }
    }
    return null;
  }
};

// 9. IPv4 检测器
export const ipv4Detector: Detector = {
  test: (content: string) => {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Pattern.test(content.trim())) {
      const parts = content.trim().split('.');
      if (parts.every(p => parseInt(p) <= 255)) {
        return {
          type: InputType.IPV4,
          confidence: 90,
          label: 'IPv4 地址',
          icon: 'network',
          data: content.trim()
        };
      }
    }
    return null;
  }
};

// 10. Base64 检测器
export const base64Detector: Detector = {
  test: (content: string) => {
    const trimmed = content.trim();
    const base64Pattern = /^[A-Za-z0-9+/]+=*$/;
    
    if (trimmed.length > 20 && trimmed.length % 4 === 0 && base64Pattern.test(trimmed)) {
      // 尝试解码以验证
      try {
        const decoded = atob(trimmed);
        return {
          type: InputType.BASE64,
          confidence: 75,
          label: 'Base64 编码',
          icon: 'file-code',
          data: {
            encoded: trimmed,
            decoded: decoded,
            length: trimmed.length
          }
        };
      } catch (e) {
        // 解码失败
      }
    }
    return null;
  }
};

// 11. 数学表达式检测器
export const mathDetector: Detector = {
  test: (content: string) => {
    const mathPattern = /^[\d\s+\-*/().^%]+$/;
    const trimmed = content.trim();
    
    if (mathPattern.test(trimmed) && /[\d]/.test(trimmed) && /[+\-*/^]/.test(trimmed)) {
      try {
        const result = Function(`"use strict"; return (${trimmed})`)();
        if (typeof result === 'number' && !isNaN(result)) {
          return {
            type: InputType.MATH,
            confidence: 85,
            label: '数学表达式',
            icon: 'calculator',
            data: {
              expression: trimmed,
              result: result,
              formatted: result.toLocaleString('zh-CN')
            }
          };
        }
      } catch (e) {
        // 不是有效的数学表达式
      }
    }
    return null;
  }
};

// 12. Markdown 检测器
export const markdownDetector: Detector = {
  test: (content: string) => {
    const markdownPatterns = [
      /^#{1,6}\s+.+/m,
      /^\* .+/m,
      /^\d+\. .+/m,
      /```[\s\S]*```/,
      /\[.+\]\(.+\)/,
      /\*\*.+\*\*/,
      /^\>.+/m,
      /^\|.+\|/m
    ];
    
    const markdownScore = markdownPatterns.filter(p => p.test(content)).length;
    
    if (markdownScore >= 2 || (markdownScore >= 1 && content.length > 50)) {
      return {
        type: InputType.MARKDOWN,
        confidence: Math.min(95, 70 + markdownScore * 8),
        label: 'Markdown 文档',
        icon: 'file-text',
        data: content
      };
    }
    return null;
  }
};

// 13. HTML 检测器
export const htmlDetector: Detector = {
  test: (content: string) => {
    const htmlPattern = /<[a-z][\s\S]*>/i;
    if (htmlPattern.test(content)) {
      const htmlScore = (content.match(/<[a-z]+[\s\S]*?>/gi) || []).length;
      if (htmlScore > 0) {
        return {
          type: InputType.HTML,
          confidence: Math.min(95, 75 + htmlScore * 3),
          label: 'HTML 代码',
          icon: 'code',
          data: content
        };
      }
    }
    return null;
  }
};

// 14. CSS 检测器
export const cssDetector: Detector = {
  test: (content: string) => {
    const cssPattern = /[.#]?[\w-]+\s*\{[^}]+\}/;
    if (cssPattern.test(content)) {
      return {
        type: InputType.CSS,
        confidence: 80,
        label: 'CSS 样式',
        icon: 'paintbrush',
        data: content
      };
    }
    return null;
  }
};

// 15. 代码检测器
export const codeDetector: Detector = {
  test: (content: string) => {
    const codeKeywords = ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'class', 'import', 'export', 'async', 'await', '=>'];
    const hasCodeKeywords = codeKeywords.some(kw => new RegExp(`\\b${kw}\\b`).test(content));
    
    if (hasCodeKeywords && content.includes('(') && content.includes(')')) {
      return {
        type: InputType.CODE,
        confidence: 80,
        label: '代码片段',
        icon: 'code-2',
        data: content
      };
    }
    return null;
  }
};

// 16. UUID 检测器
export const uuidDetector: Detector = {
  test: (content: string) => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidPattern.test(content.trim())) {
      return {
        type: InputType.UUID,
        confidence: 95,
        label: 'UUID',
        icon: 'fingerprint',
        data: content.trim()
      };
    }
    return null;
  }
};

// 17. JWT 检测器
export const jwtDetector: Detector = {
  test: (content: string) => {
    const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    const trimmed = content.trim();
    
    if (jwtPattern.test(trimmed) && trimmed.length > 20) {
      try {
        const parts = trimmed.split('.');
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        
        return {
          type: InputType.JWT,
          confidence: 90,
          label: 'JWT Token',
          icon: 'key',
          data: {
            raw: trimmed,
            header,
            payload
          }
        };
      } catch (e) {
        // JWT 解析失败
      }
    }
    return null;
  }
};

// 18. 手机号检测器
export const phoneDetector: Detector = {
  test: (content: string) => {
    const phonePattern = /^1[3-9]\d{9}$/;
    if (phonePattern.test(content.trim())) {
      return {
        type: InputType.PHONE,
        confidence: 90,
        label: '手机号码',
        icon: 'phone',
        data: content.trim()
      };
    }
    return null;
  }
};

// 19. 身份证号检测器
export const idCardDetector: Detector = {
  test: (content: string) => {
    const idCardPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
    if (idCardPattern.test(content.trim())) {
      const masked = content.trim().replace(/^(.{6})(.*)(.{4})$/, '$1****$3');
      return {
        type: InputType.IDCARD,
        confidence: 90,
        label: '身份证号',
        icon: 'id-card',
        data: {
          raw: content.trim(),
          masked
        }
      };
    }
    return null;
  }
};

// 20. 坐标检测器
export const coordinatesDetector: Detector = {
  test: (content: string) => {
    const coordPattern = /^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/;
    if (coordPattern.test(content.trim())) {
      const [lat, lng] = content.trim().split(',').map(s => parseFloat(s.trim()));
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return {
          type: InputType.COORDINATES,
          confidence: 85,
          label: '地理坐标',
          icon: 'map-pin',
          data: {
            lat,
            lng,
            raw: content.trim()
          }
        };
      }
    }
    return null;
  }
};

// 21. 纯文本检测器（兜底）
export const textDetector: Detector = {
  test: (content: string) => {
    return {
      type: InputType.TEXT,
      confidence: 50,
      label: '纯文本',
      icon: 'file-text',
      data: content
    };
  }
};

export const sqlDetector: Detector = {
  test: (content: string) => {
    const sqlPattern = /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TRUNCATE|REPLACE|GRANT|REVOKE|COMMIT|ROLLBACK|SAVEPOINT|SET)\s+/i;
    if (sqlPattern.test(content.trim())) {
      return {
        type: InputType.SQL,
        confidence: 85,
        label: 'SQL 语句',
        icon: 'database',
        data: content.trim()
      };
    }
    return null;
  }
};

// 导出所有检测器
export const allDetectors: Detector[] = [
  imageDetector,
  urlDetector,
  emailDetector,
  uuidDetector,
  jwtDetector,
  phoneDetector,
  idCardDetector,
  coordinatesDetector,
  timestampDetector,
  cronDetector,
  ipv4Detector,
  colorDetector,
  jsonDetector,
  hashDetector,
  base64Detector,
  mathDetector,
  htmlDetector,
  cssDetector,
  codeDetector,
  markdownDetector,
  sqlDetector,
  textDetector // 最后兜底
];