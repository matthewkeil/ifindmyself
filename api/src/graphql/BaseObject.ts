import { generate } from "shortid";
import { SchemaDefinition } from "mongoose";

import { REF, dbRef, Context } from "./";
import {
  GraphQLFieldMap,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  isNonNullType
} from "graphql";

export const baseDefinition: SchemaDefinition = {
  id: { type: String, default: generate(), required: true, unique: true },
  created: {
    by: dbRef(REF.USER),
    at: { type: Date, default: Date.now() }
  }
};

export const ActionField = new GraphQLObjectType({
  name: "ActionField",
  fields: () => ({
    by: { type: new GraphQLNonNull(UserNode) },
    at: { type: new GraphQLNonNull(GraphQLDate) }
  })
});

export const baseFields: GraphQLFieldMap<any, Context> = {
  _id: { type: new GraphQLNonNull(GraphQLID) },
  id: { type: new GraphQLNonNull(GraphQLString) },
  created: { type: new GraphQLNonNull(ActionField) }
};
