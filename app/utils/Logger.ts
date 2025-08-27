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
const sourceColor = '\x1b[90m';
const timeColor = '\x1b[37m';

function getTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0];
}

// Extract the caller function from the stack trace
function getCaller(): string {
  const stack = new Error().stack;
  if (!stack) return 'unknown';

  const lines = stack.split('\n');
  const callerLine = lines[3] || lines[2] || '';

  const match = callerLine.match(/at (.+) \((.+)\)/);
  if (match) {
    const funcName = match[1];
    return funcName;
  }
  const fallbackMatch = callerLine.match(/at ([^\s]+)/);
  if (fallbackMatch) {
    return fallbackMatch[1];
  }
  return 'unknown';
}

// Accept fileName as a second parameter
export const log = (level: LogLevel, message: string, fileName?: string, data?: any) => {
  if (!__DEV__) return;

  const source = getCaller();
  const color = levelColors[level] || '';
  const timestamp = `${timeColor}${getTimestamp()}${resetColor}`;
  const fileDisplay = fileName ? ` (${fileName})` : '';
  const prefix = `${timestamp} ${color}[${level}]${resetColor} | ${sourceColor}${source}${fileDisplay}${resetColor}`;

  if (data !== undefined) {
    console.log(`${prefix} => ${message}:`, data);
  } else {
    console.log(`${prefix} => ${message}`);
  }
};

export { LogLevel };
