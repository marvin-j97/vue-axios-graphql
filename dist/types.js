"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AxiosQLError extends Error {
    constructor(axios, graphql) {
        super();
        this.graphql = [];
        this.axios = axios;
        this.graphql = graphql;
    }
}
exports.AxiosQLError = AxiosQLError;
