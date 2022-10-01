import { domain } from "./../domain/state";
import api from "../../api";

export const postLogin = domain.createEffect(
  async (name: string) => {
    const uuid = await api.postLogin(name);

    localStorage.setItem("uuid", uuid);

    return uuid;
  }
);
