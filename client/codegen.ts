import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3001/graphql",
  documents: ["src/graphql/**/*.ts"],
  generates: {
    ["./src/graphql-client/types.d.ts"]: {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    ["./src/introspection-result.json"]: {
      plugins: ["fragment-matcher", "introspection"],
    },
  },
};

export default config;
