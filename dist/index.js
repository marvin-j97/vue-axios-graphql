"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
exports.AxiosGraphQLClient = client_1.default;
__export(require("./types"));
exports.default = {
    install(Vue, options) {
        Vue.prototype.$ql = new client_1.default(options);
    }
};
