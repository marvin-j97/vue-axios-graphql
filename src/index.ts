import { TInstallOptions } from "./types";
import AxiosGraphQLClient from "./client";

export * from "./types";
export { AxiosGraphQLClient };
export default {
  install(Vue: any, options: TInstallOptions) {
    Vue.prototype.$ql = new AxiosGraphQLClient(options);
  }
};
