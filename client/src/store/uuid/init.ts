import { domain } from "./../domain/state";
import { createEffect } from "effector";

import { uuid } from "./state";

export const getUUID = domain.createEffect(() => {
  return localStorage.getItem("uuid");
});

export const saveUUID = createEffect((uuid: string) => {
  localStorage.setItem("uuid", uuid);
});

uuid.on(getUUID, (_, v) => v);
