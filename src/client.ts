import Axios, { AxiosError, AxiosResponse } from "axios";
import { TInstallOptions, IQueryOptions, IMutationOptions } from "./types";

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

export default class AxiosGraphQLClient {
  url: string;
  transform?: (str: string) => string;

  constructor(options: string | TInstallOptions) {
    if (typeof options == "string") this.url = options;
    else {
      this.url = options.url;
      this.transform = options.transform;
    }
  }

  async query({ query, variables, options }: IQueryOptions) {
    // gql tag -> string conversion
    if (typeof query != "string") {
      var queryString = (query.loc && query.loc.source.body) as string;
    } else {
      var queryString = query;
    }

    if (this.transform) {
      queryString = this.transform(queryString);
    }

    let response!: AxiosResponse;

    try {
      response = await Axios.get(this.url, {
        params: {
          query: queryString,
          variables: variables || {}
        },
        ...(options ? options.config : {})
      });
    } catch (error) {
      throw new AxiosQLError(error, []);
    }

    if (response.data.errors)
      throw new AxiosQLError(null, response.data.errors);

    return response.data;
  }

  async mutate(opts: IMutationOptions) {
    return this.mutation(opts);
  }

  async mutation({ mutation, variables, options }: IMutationOptions) {
    // gql tag -> string conversion
    if (typeof mutation != "string") {
      var mutationString = (mutation.loc && mutation.loc.source.body) as string;
    } else {
      var mutationString = mutation;
    }

    if (this.transform) {
      mutationString = this.transform(mutationString);
    }

    let response!: AxiosResponse;

    try {
      response = await Axios.post(
        this.url,
        {
          query: mutationString,
          variables: variables || {}
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(options ? options.headers : {})
          },
          ...(options ? options.config : {})
        }
      );
    } catch (error) {
      throw new AxiosQLError(error, []);
    }

    if (response.data.errors)
      throw new AxiosQLError(null, response.data.errors);

    return response.data;
  }
}
