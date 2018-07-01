import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLObjectTypeConfig,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLUnionType,
  GraphQLInterfaceType
} from "graphql";

import Dimension from "../Dimension";

export interface Need {
  id: string;
  name: string;
  addedAt: number;
  dimension: Dimension;
}

export const Need = new GraphQLObjectType({
  name: "Need",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    addedAt: { type: new GraphQLNonNull(GraphQLInt) },
    dimension: { type: new GraphQLNonNull(Dimension) }
  })
});
