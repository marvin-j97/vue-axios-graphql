import { AxiosRequestConfig, AxiosError } from "axios";

export interface HashMap<T> {
  [key: string]: T;
}

export interface IQueryOptions {
  query: string | HashMap<any>;
  variables?: HashMap<any>;
  options?: {
    config: Partial<Omit<AxiosRequestConfig, "params">>;
  };
}

export interface IMutationOptions {
  mutation: string | HashMap<any>;
  variables?: HashMap<any>;
  options?: {
    config?: Partial<Omit<AxiosRequestConfig, "headers">>;
    headers?: HashMap<string>;
  };
}

export interface IAxiosGraphQLClientOptions {
  transform: (str: string) => string;
}

export type TInstallOptions = { url: string } & Partial<
  IAxiosGraphQLClientOptions
>;

export type DefaultGraphQLError = { message: string };

export class AxiosQLError<T = DefaultGraphQLError> extends Error {
  axios: AxiosError | null;
  graphql: T[] = [];

  constructor(axios: AxiosError | null, graphql: T[]) {
    super();
    this.axios = axios;
    this.graphql = graphql;
  }
}
