import axios from "axios";

const apiPrefix = "/api/v1";
class Api {
  async get<T>(url: string, params?: any) {
    let fullUrl: string = url;
    if (params) {
      fullUrl += "?" + new URLSearchParams(params).toString();
    }

    return (await axios(fullUrl))?.data as T;
  }
  async postRegister(name: string) {
    return (await axios.post(apiPrefix + `/register`, name)) as string;
  }
  async postLogin(name: string) {
    return (await axios.post(apiPrefix + `/login`, name)) as string;
  }
  async postImages(formData: FormData) {
    return await axios.post(apiPrefix + `/images`, formData);
  }
}

export default new Api();
