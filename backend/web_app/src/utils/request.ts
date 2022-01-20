import axios, { AxiosResponse, AxiosError } from 'axios';
import { store } from 'index';

import { routeBase, backendUrl } from '../constants';

export class ResponseError extends Error {
  public response: AxiosError;

  constructor(response: AxiosError) {
    super(response.message);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
// function checkStatus(response: AxiosResponse) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   const error = new ResponseError(response);
//   error.response = response;
//   throw error;
// }
const BASE_URL = backendUrl + routeBase;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' = 'GET',
  body?: any,

  headers?: any,
  withToken?: boolean,
): Promise<any> {
  const options: {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
    headers?: any;
    data: any;
    url: string;
  } = {
    method,
    url,
    data: body,
  };
  if (withToken) {
    const token = store.getState().auth?.token;
    if (token) {
      options.headers = {
        Authorization: `Token ${token}`,
      };
    }
  }

  const fetchResponse = await instance(options);

  return fetchResponse.data;
}
