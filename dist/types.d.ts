export interface HashMap<T> {
    [key: string]: T;
}
export interface IQueryOptions {
    query: string | HashMap<any>;
    variables: HashMap<any>;
}
export interface IMutationOptions {
    mutation: string | HashMap<any>;
    variables?: HashMap<any>;
}
export interface IInstallOptions {
    url: string;
}
