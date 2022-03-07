export const getQueryParamValue = (params: { [key: string]: any }, key: string) => {
  return params && params[key] ? params[key] : null;
};
