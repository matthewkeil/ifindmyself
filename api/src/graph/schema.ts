import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLObjectTypeConfig,
  GraphQLType,
  GraphQLNamedType
} from "graphql";
import { GraphModule } from ".";

const modules = [
  import("./Need") as GraphModule,
  import("./Dimension") as GraphModule
];

let query = {} as GraphModule.Query;
let mutation = {} as GraphModule.Mutation;

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
