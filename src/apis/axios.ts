import axios from 'axios';

export enum REQUEST_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type RequestMethod = typeof REQUEST_METHOD[keyof typeof REQUEST_METHOD];

class Axios {
  private _instance;
  
  constructor(baseURL: string) {
    this._instance = axios.create({ baseURL });
  }

  private axiosBase = (
    method: RequestMethod,
    url: string,
    options: {
      data?: any;
      config?: any;
    } = {}
  ) => {
    const { data, config } = options;
    const defaultHeader = { 'Content-Type': 'application/json' };
    const headers = Object.assign(defaultHeader, {}); 
    const updateConfig = Object.assign({ headers }, config || {});
    switch (method) {
      default:
      case REQUEST_METHOD.GET: {
        return this._instance.get(url, updateConfig);
      } case REQUEST_METHOD.POST: {
        return this._instance.post(url, data, updateConfig);
      } case REQUEST_METHOD.PUT: {
        return this._instance.put(url, data, updateConfig);
      } case REQUEST_METHOD.DELETE: {
        return this._instance.delete(url, updateConfig);
      }
    }
  }
  
  public request<T>(
    method: RequestMethod,
    url: string,
    data?: any,
    options?: { config: any }
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const updatedOptions = Object.assign({ data }, options || {});
      await this.axiosBase(method, url, updatedOptions).then((response) => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
  };
}

export default Axios;
