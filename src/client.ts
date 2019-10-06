import Axios from "axios";
import { IQueryOptions, IMutationOptions } from "./types";

export default class AxiosGraphQLClient {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async query({ query, variables }: IQueryOptions) {
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
        }
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async mutation({ mutation, variables }: IMutationOptions) {
    let mutationString = mutation;

    // gql tag -> string conversion
    if (typeof mutation != "string") {
      mutationString = mutation.loc && mutation.loc.source.body;
    }

    try {
      const response = await Axios.post(this.url, {
        params: {
          mutation: mutationString,
          variables: variables || {}
        }
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
