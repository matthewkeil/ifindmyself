import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectTypeConfig
} from "graphql";

import { baseFields, Context } from "../";
import { User } from "./model";
import { DimensionNode } from "../Dimension";
import { WantNode } from "../Want";
import { NeedNode } from "../Need";
export const userNodeConfig: GraphQLObjectTypeConfig<User, Context> = {
  name: "User",
  fields: () => ({
    ...baseFields,
    email: { type: new GraphQLNonNull(GraphQLString) },
    emails: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    token: { type: new GraphQLNonNull(GraphQLString) },
    tokens: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    passwords: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    dimensions: { type: new GraphQLList(DimensionNode) },
    wants: { type: new GraphQLList(WantNode) },
    needs: { type: new GraphQLList(NeedNode) }
  })
};

export const UserNode = new GraphQLObjectType(userNodeConfig);
