import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLSchemaConfig
} from "graphql";
import { SourceModule, FieldsMap, Context } from ".";

import User from "./User";
import Need from "./Need";
import Want from "./Want";
import Dimension from "./Dimension";
import { Model, Document } from "mongoose";
import { buildBaseQuery, buildBaseMutation } from "./BaseObject";

export interface ReferenceModule<T extends Document> {
  model: Model<T>;
  node: GraphQLOutputType;
  query: FieldsMap<T>;
  mutation: FieldsMap<T>;
  types: GraphQLSchemaConfig["types"];
}
type ReferenceModules = { [key in Ref]: ReferenceModule<any> };

export const referencedModules = {
  User,
  Need,
  Want,
  Dimension
};

export type Ref = keyof typeof referencedModules;
export type RefMap = { [key in Ref]: typeof referencedModules[key]["model"] };

// const sourceModules = {
//   // modules without a model to tie to context
// };

let refMap = {} as Context;
let rootQuery = {} as SourceModule.Query<any>;
let rootMutation = {} as SourceModule.Mutation<any>;
let rootTypes = [] as SourceModule.Types;

Object.entries({ ...(referencedModules as ReferenceModules) }).forEach(
  ([ref, { model, query, mutation, types, node }]) => {
    if (model) {
      refMap = { ...refMap, [ref]: model };
      rootQuery = { ...rootQuery, ...buildBaseQuery({ model, node }) };
      rootMutation = { ...rootMutation, ...buildBaseMutation({ model, node }) };
    }
    if (query) rootQuery = { ...rootQuery, ...query };
    if (mutation) rootMutation = { ...rootMutation, ...mutation };
    if (types) rootTypes!.push(...types);
  }
);

export { refMap as context };

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({ ...rootQuery })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({ ...rootMutation })
  }),
  types: rootTypes
});
