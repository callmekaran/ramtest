import RoutesName from "variables/route";

const defaultHeaders = {
  "Content-Type": "application/json",
};

class CustomError extends Error {
  constructor({ message, data = {} }) {
    super(message);
    this.data = data;

    // Set the prototype explicitly to ensure correct behavior
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    localStorage.clear();
    window.location.href = RoutesName.login;
    throw new CustomError({
      message: "Refresh token not found",
      data: {},
    });
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}auth/refresh-tokens`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.tokens.access.token);
      localStorage.setItem("refresh", data.tokens.refresh.token);
      return data.tokens.access.token;
    } else {
      localStorage.clear();
      window.location.href = RoutesName.login;
      throw new CustomError({
        message: "Error refreshing token",
        data: {},
      });
    }
  } catch (error) {
    localStorage.clear();
    window.location.href = RoutesName.login;
    throw new CustomError({
      message: "Error refreshing token",
      data: {},
    });
  }
}

async function apiInvokeWithRefresh(url, method, body, headers, token) {
  const accessToken = token || localStorage.getItem("access_token");

  if (!accessToken) {
    localStorage.clear();
    window.location.href = RoutesName.login;
    throw new CustomError({
      message: "Access token not found",
      data: {},
    });
  }

  try {
    // Attempt the API call with the provided access token
    return await apiInvoke(url, method, body, headers, accessToken);
  } catch (error) {
    // If the error is due to an expired token, attempt to refresh the token and retry the API call
    if (error.data.code === 401) {
      const newAccessToken = await refreshToken();
      // Retry the original API call with the new access token
      return await apiInvoke(url, method, body, headers, newAccessToken);
    }

    // If the error is not due to token expiration, rethrow the original error
    throw error;
  }
}

async function apiInvoke(url, method, body, headers, token) {
  let mainUrl = process.env.REACT_APP_BACKEND_URI;
  headers = headers || {};
  headers.Authorization = token ? `Bearer ${token}` : "";
  if (url.startsWith("/")) {
    mainUrl = `${mainUrl}${url.substring(1)}`;
  } else {
    mainUrl = `${mainUrl}${url}`;
  }
  const r = await fetch(`${mainUrl}`, {
    method: method ?? "GET",
    headers: {
      ...(headers ?? {}),
    },
    body,
  });

  const data = await r.json();
  const error = new CustomError({
    message: data?.message || "Something went wrong",
    data,
  });
  error.data = data;

  if (!r.ok) {
    throw error;
  }
  if (data.code > 299) {
    throw error;
  }

  return data;
}

async function get_api(url, token) {
  token = localStorage.getItem("access_token");
  try {
    return apiInvokeWithRefresh(
      `${url}`,
      "GET",
      undefined,
      defaultHeaders,
      token
    );
  } catch (error) {
    throw error;
  }
}

async function post_api(url, data, token) {
  const headers = data instanceof FormData ? {} : defaultHeaders;
  const newData = data instanceof FormData ? data : JSON.stringify(data);
  token = localStorage.getItem("access_token");
  return apiInvoke(`${url}`, "POST", newData, headers, token);
}

async function put_api(url, data, token) {
  const headers = data instanceof FormData ? {} : defaultHeaders;
  const newData = data instanceof FormData ? data : JSON.stringify(data);
  token = localStorage.getItem("access_token");
  return apiInvoke(`${url}`, "PUT", newData, headers, token);
}

async function delete_api(url, token) {
  const headers = defaultHeaders;
  token = localStorage.getItem("access_token");
  return apiInvoke(`${url}`, "DELETE", null, headers, token);
}

async function logout_api(url, data) {
  let mainUrl = process.env.REACT_APP_BACKEND_URI;
  if (url.startsWith("/")) {
    mainUrl = `${mainUrl}${url.substring(1)}`;
  } else {
    mainUrl = `${mainUrl}${url}`;
  }
  try {
    const response = await fetch(`${mainUrl}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return {
        data: null,
        status: true,
        message: "Logout successful",
      };
    } else {
      return {
        data: null,
        status: false,
        message: "Logout failed",
      };
    }
  } catch (error) {
    throw error;
  }
}

export { get_api, post_api, put_api, delete_api, logout_api };
