import projectConfig from '../projectConfig.json';

const SERVER_URL = projectConfig.SERVER_URL;
class ApiCaller {
    token: string;
    constructor(token?: string) {
        this.token = token ? token : "";
    }
    
    static instance(token?:string): ApiCaller {
        return new this(token)
    }

    async call(path: string, method: string, params?: object): Promise<any> {
        var fetchParams: any = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token,
            }

        }

        if (params) {
            fetchParams.body = JSON.stringify(params); // convert params to string
        }
        return fetch(SERVER_URL + path, fetchParams)
            .then(function (response) {
                if (!response.ok) {
                    const responseObj = {
                        status: 'rejected',
                        statusCode: response.status,
                        url: response.url,
                        statusText: response.statusText
                    }
                    throw Error(JSON.stringify(responseObj));
                }
                return response;
            })
            .then(response => response.json())
    }
    async uploadFile(url: string, formData: FormData): Promise<any> {
        return fetch(url, {
            method: 'post',
            body: formData
        })
    }
}

export default ApiCaller;