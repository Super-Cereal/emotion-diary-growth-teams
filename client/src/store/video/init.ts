import { domain } from "../domain/state";
import api from "../../api";

export const postVideoWebm = domain.createEffect((formData: FormData) => {
  return api.postVideo(formData);
});
