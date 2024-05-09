import { API_BASE_URL } from "@/constants/environments";
import { User } from "@/context/formContext/formContext";
import APiUtil from "@/lib/apiUtlis";

/**
 * Service for the form data
 * this is a fake api for now returnthe samedata that we submit
 */
export class FormService {
  public static async submitFormData(payload: Partial<User>): Promise<User> {
    const response = await APiUtil.send<User>({
      url: `${API_BASE_URL}/posts`,
      data: payload,
      method: "POST",
    });
    return response.data;
  }
}

export default FormService;
