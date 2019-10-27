import { TInstallOptions, IQueryOptions, IMutationOptions } from "./types";
export default class AxiosGraphQLClient {
    url: string;
    transform?: (str: string) => string;
    constructor(options: string | TInstallOptions);
    query({ query, variables, options }: IQueryOptions): Promise<any>;
    mutate(opts: IMutationOptions): Promise<any>;
    mutation({ mutation, variables, options }: IMutationOptions): Promise<any>;
}
