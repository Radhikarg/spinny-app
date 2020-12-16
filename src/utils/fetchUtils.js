export const NETWORK_OFFLINE = "NETWORK_OFFLINE";

function createError(response, json) {
  return {
    status: response.status,
    statusText: response.statusText,
    json,
  };
}
export function networkOffline() {
  return { type: NETWORK_OFFLINE };
}
function createHeader(headers) {
  // fetch current auth headers from storage
  //const accessToken = Cookies.get(STORAGE_KEY)
  const nextHeaders = headers || {};
  nextHeaders["Content-Type"] = "application/json";
  nextHeaders["Access-Control-Allow-Origin"] = "http://localhost:3000";
  nextHeaders["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
  return nextHeaders;
}
export function successHandler(response) {
  if (response.status !== 204) {
    return response
      .json()
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(() =>
        Promise.resolve({
          status: "ok",
          data: null,
        })
      );
  }
  return Promise.resolve({ status: 204 });
}
export function errorHandler(response) {
  return response.json().then((json) => {
    return Promise.reject(createError(response, json));
  });
}
export function fetchWrapper(url, options = {}, etagCacheKey) {
  try {
    const { headers, body } = options;
    const updatedOptions = {
      ...options,
      headers: createHeader(headers),
    };
    let fileUpload = false;
    if (!!body) {
      fileUpload = !!body.fileUpload;
    }
    if (fileUpload) {
      const copyBody = { ...body };
      const formData = new FormData();
      /*** Append all the params from body to formData */
      Object.keys(copyBody).forEach((key) => {
        if (key !== "fileUpload") {
          formData.append(key, copyBody[key]);
        }
      });
      //formData.append("file", file);
      updatedOptions.body = formData;
      delete updatedOptions.headers["Content-Type"];
    } else if (!!body) {
      //if (!isEmpty(body) && !isEmpty(copyBody)) {
      updatedOptions.body = JSON.stringify(body);
    }
    return fetch(url, updatedOptions).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return successHandler(response);
      }
      return errorHandler(response);
    });
  } catch (e) {
    return {};
  }
}

export default function (url, options, etagCacheKey) {
  if (navigator && !navigator.onLine) {
    return Promise.reject(
      createError({
        statusText: NETWORK_OFFLINE,
        status: "error",
      })
    );
  }
  return fetchWrapper(url, options, etagCacheKey);
}
