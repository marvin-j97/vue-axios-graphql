import Axios, { AxiosResponse } from "axios";
import {
  TInstallOptions,
  IQueryOptions,
  IMutationOptions,
  AxiosQLError
} from "./types";

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
      throw new AxiosQLError(error, error.response.data.errors);
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
      throw new AxiosQLError(error, error.response.data.errors);
    }

    if (response.data.errors)
      throw new AxiosQLError(null, response.data.errors);

    return response.data;
  }
}
