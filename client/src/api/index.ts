import axios from "axios";

class Api {
  async get<T>(url: string, params?: any) {
    let fullUrl: string = url;
    if (params) {
      fullUrl += "?" + new URLSearchParams(params).toString();
    }

    return (await axios(fullUrl))?.data as T;
  }
  async postRegister(name: string) {
    return (await axios.post(`/api/register`, name)) as string;
  }
  async postLogin(name: string) {
    return (await axios.post(`/api/login`, name)) as string;
  }
}

export default new Api();
