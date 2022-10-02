import axios from 'axios';

const apiPrefix = '/api/v1';

axios.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem('uuid')}`,
};

class Api {
    async get<T>(url: string, params?: any) {
        let fullUrl: string = url;
        if (params) {
            fullUrl += '?' + new URLSearchParams(params).toString();
        }

        return (await axios(fullUrl))?.data as T;
    }
    async postRegister(name: string) {
        return (await axios.post(apiPrefix + `/auth/registration`, {
            name,
        })) as {
            data: {
                token: string;
            };
        };
    }

    async postLogin(name: string) {
        return (await axios.post(apiPrefix + `/auth/login`, { name })) as {
            data: {
                token: string;
            };
        };
    }
    async postImages({ image }: { image: FormData }) {
        return await axios.post(apiPrefix + `/images`, image);
    }
}

export default new Api();
