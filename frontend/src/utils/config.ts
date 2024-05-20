import env from 'react-dotenv';

export function getConfig(key: string, defaultValue: string = ""): string {
  return env[key] || defaultValue;
}
