import { domain } from "../domain/state";
import api from "../../api";

export const postImages = domain.createEffect((formData: FormData) => {
  return api.postImages({ image: formData });
});
