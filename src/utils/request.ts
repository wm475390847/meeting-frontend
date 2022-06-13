import fetch from 'isomorphic-fetch';

export type IRequestMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';
export interface ICheckStatusProps {
  response: Response;
  options?: any;
  url?: string;
}
interface ErrorWithResponse extends Error {
  response?: Response;
}

export interface RequestOpt {
  code: string
  data: any
  message?: null | string
  pageNo?: number
  pageSize?: number
  requestId?: null | string | number
  success: boolean
  total?: number
}

function checkStatus({ response, options, url }: ICheckStatusProps): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: ErrorWithResponse = new Error(response.statusText);
    error.response = response;
    error.message = JSON.stringify(response);

    throw error;
  }
}

/**
 * 给 URL 加上 _t=时间戳
 * @param {string} url 完整 url 或者 path
 */
function addTimestamp(url: string): string {
  const t = `_t=${Date.now()}`;
  const sep = url.includes('?') ? '&' : '?';
  return url + sep + t;
}

function parseJSON(response: Response) {
  return response.json();
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {Promise<{ data: any, err: Error }>}           An object containing either "data" or "err"
 */
export default function request(_url: string, options?: any): Promise<RequestOpt> {
  const url = addTimestamp(_url);
  const defaultOptions = {
    credentials: 'include',
    // redirect: 'manual',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (!(newOptions.body instanceof FormData)) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else {
    // NewOptions.body is FormData
    newOptions.headers = {
      Accept: 'application/json',
      ...newOptions.headers,
    };
  }

  return fetch(url, newOptions)
    .then(response => checkStatus({
      response,
      options: newOptions,
      url: _url,
    }))
    .then(parseJSON)
    .then(data => {
      return data;
    })
    .catch((err: any) => {
      if (err && err.response && err.response.status === 500) {
        // 自定义报错
        return err.response.json()
          .then((res: any) => { })
          .catch((e: Error) => {
            console.log(e);
          });
      }
      return ({
        data: null,
        err: err || null,
      });
    });
}
