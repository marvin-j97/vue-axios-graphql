[![npm version](https://badge.fury.io/js/%40dotvirus%2Fvue-axios-graphql.svg)](https://badge.fury.io/js/%40dotvirus%2Fvue-axios-graphql)

# vue-axios-graphql

## Install

### main.js

```
import Vue from "vue";
const QLClient = require("@dotvirus/vue-axios-graphql");

Vue.use(QLClient, { url: "GRAPHQL_ENDPOINT" });
```

## Nuxt

Create a plugin in plugins/

### plugins/example.js

```
const { AxiosGraphQLClient } = require("@dotvirus/vue-axios-graphql");
const url = "GRAPHQL_ENDPOINT"

export default (ctx, inject) => {
  inject("ql", new QLClient(url));
};
```

The client is now exposed as this.$ql (client-side) and context.app.$ql (server-side).

## Methods

### query({ query, variables })

```
// Query (uses HTTP GET)
this.$ql.query({
  query: `
  {
    hello
  }
  `,
  variables: {} // Optional if no variables needed
})
```

### mutate({ mutation, variables })

```
// Mutation (uses HTTP POST)
this.$ql.mutate({
  mutation: `
  {
    hello
  }
  `,
  variables: {} // Optional if no variables needed
})
```

## Options

This package offers a wide range of options to customize to your needs

| Name | Description      |
| ---- | ---------------- |
| url  | GraphQL endpoint |
