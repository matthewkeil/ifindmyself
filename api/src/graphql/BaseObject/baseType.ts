import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import { UserNode } from "../User";

export const ActionField = new GraphQLObjectType({
  name: "ActionField",
  fields: () => ({
    by: { type: new GraphQLNonNull(UserNode) },
    at: { type: new GraphQLNonNull(GraphQLDateTime) }
  })
});

export const baseFields = {
  _id: { type: new GraphQLNonNull(GraphQLID) },
  id: { type: new GraphQLNonNull(GraphQLString) },
  created: { type: new GraphQLNonNull(ActionField) }
};
