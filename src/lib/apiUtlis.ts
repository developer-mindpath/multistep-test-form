import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 *  Api helper class
 */
class APiUtil {
  /**
   * Send Axios Request
   * @param config - Axios configs
   * @returns - response as axios response object
   */
  public static async send<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const response = await axios(config);
    return response;
  }
}

export default APiUtil;
