import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { SourceModule, REF } from ".";

let query = {} as SourceModule.Query;
let mutation = {} as SourceModule.Mutation;

Object.entries(REF).forEach(async ([_, VALUE]) => {
  const module = await import(`./${VALUE}`);
  if (module.query) query = { ...query, ...module.query };
  if (module.mutation) mutation = { ...mutation, ...module.mutation };
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({ ...query })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({ ...mutation })
  })
});
