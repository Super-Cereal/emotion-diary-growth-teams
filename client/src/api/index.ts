import axios from 'axios';

export interface emotionsStore {
    angry: number;
    fear: number;
    happy: number;
    neutral: number;
    sad: number;
    surprise: number;
}

const apiPrefix = '/api/v1';

axios.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem('uuid')}`,
};

class Api {
    async get<T>(url: string, params?: any) {
        let fullUrl: string = apiPrefix + url;
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

    async postEmotions(emotions: emotionsStore) {
        return await axios.post(apiPrefix + `/emotion-state`, emotions);
    }
}

export default new Api();
