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
    constructor(url) {
        this.url = url;
    }
    query({ query, variables }) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryString = query;
            if (typeof query != "string") {
                queryString = query.loc && query.loc.source.body;
            }
            try {
                const response = yield axios_1.default.get(this.url, {
                    params: {
                        query: queryString,
                        variables: variables || {}
                    }
                });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    mutate(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mutation(opts);
        });
    }
    mutation({ mutation, variables }) {
        return __awaiter(this, void 0, void 0, function* () {
            let mutationString = mutation;
            if (typeof mutation != "string") {
                mutationString = mutation.loc && mutation.loc.source.body;
            }
            try {
                const response = yield axios_1.default.post(this.url, {
                    query: mutationString,
                    variables: variables || {}
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AxiosGraphQLClient;
