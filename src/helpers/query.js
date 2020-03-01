import qs from "qs";

export function getQuery() {
  const getParamsUrl = window.location.href.split("?")[1];
  const resultParams = qs.parse(getParamsUrl);
  return resultParams || "";
}

const splitUrl = url => {
  const urlFix = url.split("?");
  return `?${urlFix[1] || ""}`;
};

const matchQuery = (urlParams, key) => {
  const urlFix = urlParams.get(key);
  return urlFix || "";
};

const addQuery = (url, key, value) => {
  const router = url.split("?");
  const ifNotUndefined = router[1]
    ? `${router[1]}&${key}=${value}`
    : `${key}=${value}`;
  const urlFix = ifNotUndefined;
  return `?${urlFix || ""}`;
};

const replaceQuery = (urlParams, key, value) => {
  urlParams.set(key, value);
  const getAllUrl = urlParams.toString();
  const urlFix = decodeURIComponent(getAllUrl);
  return `?${urlFix || ""}`;
};

const removeQuery = (urlParams, key) => {
  urlParams.delete(key);
  const getAllUrl = urlParams.toString();
  const urlFix = decodeURIComponent(getAllUrl);
  return `?${urlFix || ""}`;
};

// eslint-disable-next-line consistent-return
export const setQueryUrl = (key, value) => {
  const url = window.location.href;
  const router = url.split("?");
  const urlParams = new URLSearchParams(router[1]);
  // get full url ex: setQueryUrl()
  if (url && key == null && value == null) {
    return splitUrl(url);
  }
  if (url && key) {
    // remove query ex: setQueryUrl(urlParams, key, "remove");
    if (value === "remove") {
      return removeQuery(urlParams, key);
    }
    // replace query ex: setQueryUrl(urlParams, key, value);
    if (matchQuery(urlParams, key)) {
      return replaceQuery(urlParams, key, value);
    }
    // add query ex: setQueryUrl(url, key, value);
    return addQuery(url, key, value);
  }
};
