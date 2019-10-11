import { IQueryOptions, IMutationOptions } from "./types";
export default class AxiosGraphQLClient {
    url: string;
    constructor(url: string);
    query({ query, variables }: IQueryOptions): Promise<any>;
    mutate(opts: IMutationOptions): Promise<void>;
    mutation({ mutation, variables }: IMutationOptions): Promise<any>;
}
