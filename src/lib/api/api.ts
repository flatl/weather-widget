export type successResponse = {
  success: true,
};

export type errorResponse = {
  success: false,
  message: string,
};

export type Response<T> = Promise<(successResponse & { data: T }) | errorResponse>;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class API {
  private fetch<T>(url: string, method: RequestMethod, data?: Record<string, unknown>): Response<T> {
    return new Promise((resolve) => {
      switch (method) {
        case 'GET': {
          fetch(url)
            .then((response) => {
              if (response.status === 200) {
                response
                  .json()
                  .then((data) => resolve({ success: true, data }));
              } else {
                resolve({
                  success: false,
                  message: response.statusText
                });
              }
            })
            .catch((error) => {
              resolve({
                success: false,
                message: `${error.name}: ${error.message}`
              })
            })
          break;
        }
        case 'POST': {
          fetch(url, { method, body: JSON.stringify(data) })
            .then((response) => {
              if (response.status === 200) {
                response
                  .json()
                  .then((data) => resolve({ success: true, data }));
              } else {
                resolve({
                  success: false,
                  message: response.statusText
                });
              }
            })
            .catch((error) => {
              resolve({
                success: false,
                message: `${error.name}: ${error.message}`
              })
            })
          break;          
        }
        default: {
          throw new Error(`Method ${method} is not implemented yet`);
        }
      }
    });
  }

  protected async get<T>(url: string): Response<T> {
    return await this.fetch(url, 'GET');
  }

  protected async post<T>(url: string, data: Record<string, unknown>): Response<T> {
    return await this.fetch(url, 'POST', data);
  }
}
