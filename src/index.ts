import { IInstallOptions } from "./types";
import AxiosGraphQLClient from "./client";

export * from "./types";
export { AxiosGraphQLClient };
export default {
  install(Vue: any, options: IInstallOptions) {
    Vue.prototype.$ql = new AxiosGraphQLClient(options.url);
  }
};
