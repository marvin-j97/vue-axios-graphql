import { IQueryOptions, IMutationOptions } from "./types";
export default class AxiosGraphQLClient {
    url: string;
    constructor(url: string);
    query({ query, variables, options }: IQueryOptions): Promise<any>;
    mutate(opts: IMutationOptions): Promise<any>;
    mutation({ mutation, variables, options }: IMutationOptions): Promise<any>;
}
