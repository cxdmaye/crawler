import { IconName } from "lucide-react/dynamic";

export enum InputType {
  IMAGE = 'image',
  URL = 'url',
  EMAIL = 'email',
  CRON = 'cron',
  JSON = 'json',
  COLOR = 'color',
  HASH = 'hash',
  TIMESTAMP = 'timestamp',
  MARKDOWN = 'markdown',
  MATH = 'math',
  HTML = 'html',
  CSS = 'css',
  IPV4 = 'ipv4',
  IPV6 = 'ipv6',
  BASE64 = 'base64',
  CODE = 'code',
  IDCARD = 'idcard',
  UUID = 'uuid',
  JWT = 'jwt',
  PHONE = 'phone',
  COORDINATES = 'coordinates',
  TEXT = 'text',
  SQL = 'sql',
}

export interface InputInterface {
  type: InputType;
  confidence: number;
  label: string;
  icon: IconName;
  data: any;
}

export interface HistoryInputInterface {
  id: number;
  content: string;
  timestamp: string;
  results: InputInterface[];
}