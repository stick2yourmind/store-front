import { CustomError } from '@/utils/custom-error';
import { RawResponse } from '@/utils/raw-response';

//  pathname?: string, params?: Record<string, any>, init?: RequestInit, body?: B
export interface GenericRequest<B> {
  pathname?: string;
  params?: Record<string, any>;
  init?: RequestInit;
  body?: B;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export interface GetRequestService<B> {
  pathname?: string;
  params?: Record<string, any>;
  init?: RequestInit;
}

export interface PostRequestService<B> {
  pathname?: string;
  params?: Record<string, any>;
  init?: RequestInit;
  body?: B;
}

export interface PutRequestService<B> {
  pathname?: string;
  params?: Record<string, any>;
  init?: RequestInit;
  body?: B;
}

export interface DeleteRequestService<B> {
  pathname?: string;
  params?: Record<string, any>;
  init?: RequestInit;
  body?: B;
}

export interface PatchRequestService<B> {
  pathname?: string;
  params?: Record<string, any>;
  init?: RequestInit;
  body?: B;
}

export class FetchApi {
  constructor(
    private readonly _baseUrl: string,
    private _authToken: string | null = null,
  ) {}

  public get authToken(): string | null {
    return this._authToken;
  }

  public set authToken(newAuthToken: string | null) {
    this._authToken = newAuthToken;
  }

  static constructURL({
    baseUrl,
    pathname,
    params,
  }: {
    baseUrl: string;
    pathname?: string;
    params?: Record<string, any>;
  }) {
    let url = baseUrl;

    if (pathname) {
      url += pathname;
    }

    if (params) {
      url += '?';

      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          if (params[key] !== undefined && params[key] !== null) {
            url += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`;
          }
        }
      }

      // Remove the trailing '&' if there are parameters
      // Remove the trailing "?" if there are not parameters
      url = url.slice(0, -1);
    }

    return url;
  }

  async genericService<T = any, E = any, B = any>({
    body,
    init,
    params,
    pathname,
    method,
  }: GenericRequest<B>) {
    try {
      // build endpoint =  base url + pathname + params
      const endpoint = FetchApi.constructURL({
        baseUrl: this._baseUrl,
        pathname,
        params,
      });
      const getInit = Object.assign({ method, body: JSON.stringify(body) }, init);
      const response = await fetch(endpoint, getInit);

      const data = await response.json();
      const headers = Object.fromEntries(response.headers.entries());
      const url = response.url;
      const rawResponse = new RawResponse(data, headers, url);
      // check 200-299 status code
      if (response.ok) {
        return {
          success: true,
          data: data as T,
          statusCode: response.status,
          raw: {
            body: data,
            headers,
            url,
          },
        };
      }
      throw new CustomError(data?.message ?? 'API ERROR', response.status, rawResponse);
    } catch (error) {
      if (error instanceof CustomError) {
        console.log('🚀 ~ file: fetch-service.ts:141 ~ FetchApi ~ error:', error);
        return {
          success: false,
          error: error.message,
          statusCode: error.statusCode,
          raw: error.getRaw() as RawResponse,
        };
      }
      return { success: false, error };
    }
  }

  async get<T = any, E = any>({ init, params, pathname }: GetRequestService<never>) {
    const res = await this.genericService<T, E>({
      method: 'GET',
      init,
      params,
      pathname,
    });

    return res;
  }

  async post<T = any, B = any>({ init, params, pathname, body }: PostRequestService<B>) {
    const res = await this.genericService<T>({
      method: 'POST',
      init,
      params,
      pathname,
      body,
    });
    return res;
  }

  async put<T = any, B = any>({ init, params, pathname, body }: PutRequestService<B>) {
    const res = await this.genericService<T>({
      method: 'PUT',
      init,
      params,
      pathname,
      body,
    });
    return res;
  }

  async delete<T = any, B = any>({ init, params, pathname, body }: DeleteRequestService<B>) {
    const res = await this.genericService<T>({
      method: 'DELETE',
      init,
      params,
      pathname,
      body,
    });
    return res;
  }

  async patch<T = any, B = any>({ init, params, pathname, body }: PatchRequestService<B>) {
    const res = await this.genericService<T>({
      method: 'PATCH',
      init,
      params,
      pathname,
      body,
    });
    return res;
  }
}
