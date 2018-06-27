import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLObjectTypeConfig,
  GraphQLType,
  GraphQLNamedType
} from "graphql";
import { SourceModule } from ".";

const modules = [
  import("./Need") as SourceModule,
  import("./Dimension") as SourceModule
];

let query = {} as SourceModule.Query;
let mutation = {} as SourceModule.Mutation;

for (let module of modules) {
  if (module.query) query = { ...query, ...module.query };
  if (module.mutation) mutation = { ...mutation, ...module.mutation };
}

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
