export const localStorageGet = (key: string, defaultValue: string | null = null) => {
  const value = localStorage.getItem(key);

  try {
    return value !== null ? JSON.parse(value) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const localStorageSet = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageRemove = (key: string) => {
  return localStorage.removeItem(key);
};