import Axios from "axios";
import { IQueryOptions, IMutationOptions } from "./types";

export default class AxiosGraphQLClient {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async query({ query, variables, options }: IQueryOptions) {
    let queryString = query;

    // gql tag -> string conversion
    if (typeof query != "string") {
      queryString = query.loc && query.loc.source.body;
    }

    try {
      const response = await Axios.get(this.url, {
        params: {
          query: queryString,
          variables: variables || {}
        },
        ...(options ? options.config : {})
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async mutate(opts: IMutationOptions) {
    this.mutation(opts);
  }

  async mutation({ mutation, variables, options }: IMutationOptions) {
    let mutationString = mutation;

    // gql tag -> string conversion
    if (typeof mutation != "string") {
      mutationString = mutation.loc && mutation.loc.source.body;
    }

    try {
      const response = await Axios.post(
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

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
