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
export declare type TInstallOptions = {
    url: string;
} & Partial<IAxiosGraphQLClientOptions>;
export declare type DefaultGraphQLError = {
    message: string;
};
export declare class AxiosQLError<T = DefaultGraphQLError> extends Error {
    axios: AxiosError | null;
    graphql: T[] | null;
    constructor(axios: AxiosError | null, graphql: T[] | null);
}
