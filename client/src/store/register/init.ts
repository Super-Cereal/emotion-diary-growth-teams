import { domain } from "../domain/state";
import api from "../../api";

export const postPassword = domain.createEffect(async (name: string) => {
  const uuid = await api.postRegister(name);

  localStorage.setItem("uuid", uuid);

  return uuid;
});
