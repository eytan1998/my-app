// utils/logger.ts

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

const levelColors: Record<LogLevel, string> = {
  [LogLevel.INFO]: '\x1b[36m',   // cyan
  [LogLevel.WARN]: '\x1b[33m',   // yellow
  [LogLevel.ERROR]: '\x1b[31m',  // red
  [LogLevel.DEBUG]: '\x1b[35m',  // magenta
};

const resetColor = '\x1b[0m';
const sourceColor = '\x1b[90m'; // gray for source
const timeColor = '\x1b[37m';   // white/gray for timestamp

function getTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0]; 
}

export const log = (
  source: string,
  level: LogLevel,
  message: string,
  data?: any
) => {
  if (!__DEV__) {
    // Do nothing in production mode
    return;
  }

  const color = levelColors[level] || '';
  const timestamp = `${timeColor}${getTimestamp()}${resetColor}`;
  const prefix = `${timestamp} ${color}[${level}]${resetColor} | ${sourceColor}${source}${resetColor}`;

  if (data !== undefined) {
    console.log(`${prefix} => ${message}:`, data);
  } else {
    console.log(`${prefix} => ${message}`);
  }
};

export { LogLevel };
