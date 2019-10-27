import { expect } from "chai";
import QLClientPlugin from "../src/index";
import QLClient from "../src/client";
import Vue from "vue";

describe("Vue plugin", () => {
  it("Should attach to Vue prototype", () => {
    Vue.use(QLClientPlugin, { url: "https://graphql-pokemon.now.sh" });
    expect(Vue.prototype)
      .to.have.property("$ql")
      .that.has.property("url").that.is.string;
  });
});

describe("Query Pikachu", () => {
  it("Should return Pikachu", async () => {
    const client = new QLClient("https://graphql-pokemon.now.sh");
    const result = await client.query({
      query: `
      {
        pokemon(name: "Pikachu") {
          id
          number
          name
          attacks {
            special {
              name
              type
              damage
            }
          }
          evolutions {
            id
            number
            name
            weight {
              minimum
              maximum
            }
            attacks {
              fast {
                name
                type
                damage
              }
            }
          }
        }
      }
    `
    });

    expect(result.data.pokemon.name).to.equal("Pikachu");
  });

  it("Should return Pikachu", async () => {
    const client = new QLClient({
      url: "https://graphql-pokemon.now.sh",
      // Remove spaces
      transform: (str: string) => str.replace(/ /g, "")
    });
    const result = await client.query({
      query: `
      {
        pokemon(name: "Pikachu") {
          id
          number
          name
          attacks {
            special {
              name
              type
              damage
            }
          }
          evolutions {
            id
            number
            name
            weight {
              minimum
              maximum
            }
            attacks {
              fast {
                name
                type
                damage
              }
            }
          }
        }
      }
    `
    });

    expect(result.data.pokemon.name).to.equal("Pikachu");
  });
});
