import { AxiosRequestConfig } from "axios";

export interface HashMap<T> {
  [key: string]: T;
}

export interface IQueryOptions {
  query: string | HashMap<any>;
  variables?: HashMap<any>;
  options?: Partial<Omit<AxiosRequestConfig, "params">>;
}

export interface IMutationOptions {
  mutation: string | HashMap<any>;
  variables?: HashMap<any>;
  options?: {
    config?: Partial<Omit<AxiosRequestConfig, "headers">>;
    headers?: HashMap<string>;
  };
}

export interface IInstallOptions {
  url: string; // GraphQL endpoint
}
