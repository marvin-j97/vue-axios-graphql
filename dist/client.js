"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AxiosGraphQLClient {
    constructor(options) {
        if (typeof options == "string")
            this.url = options;
        else {
            this.url = options.url;
            this.transform = options.transform;
        }
    }
    query({ query, variables, options }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof query != "string") {
                var queryString = (query.loc && query.loc.source.body);
            }
            else {
                var queryString = query;
            }
            if (this.transform) {
                queryString = this.transform(queryString);
            }
            try {
                const response = yield axios_1.default.get(this.url, Object.assign({ params: {
                        query: queryString,
                        variables: variables || {}
                    } }, (options ? options : {})));
                if (response.data.errors)
                    throw response.data.errors;
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    mutate(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mutation(opts);
        });
    }
    mutation({ mutation, variables, options }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof mutation != "string") {
                var mutationString = (mutation.loc && mutation.loc.source.body);
            }
            else {
                var mutationString = mutation;
            }
            if (this.transform) {
                mutationString = this.transform(mutationString);
            }
            try {
                const response = yield axios_1.default.post(this.url, {
                    query: mutationString,
                    variables: variables || {}
                }, Object.assign({ headers: Object.assign({ "Content-Type": "application/json" }, (options ? options.headers : {})) }, (options ? options.config : {})));
                if (response.data.errors)
                    throw response.data.errors;
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AxiosGraphQLClient;
