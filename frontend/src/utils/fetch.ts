import { localStorageGet } from './local-storage';
export const ACCESS_TOKEN = 'access_token';

export async function fetchApi(
  url: string,
  options: any = {},
): Promise<any> {
  const headersObj = new Headers({ "content-Type": "application/json" });
  headersObj.append("Authorization", `Bearer ${localStorageGet(ACCESS_TOKEN)}`);

  const response = await fetch(url, {
    ...options,
    headers: headersObj,
  });

  if (response.ok) {
    return response.json();
  }

  const resJson = JSON.parse(await response.text());
  const error: any = new Error(resJson.message);
  error.code = response.status;

  throw error;
}
