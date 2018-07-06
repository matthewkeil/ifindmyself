import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectTypeConfig
} from "graphql";

import { baseFields, Context } from "../";
import { Want } from "./model";
import { DimensionNode } from "../Dimension";
import { NeedNode } from "../Need";

export const wantNodeConfig: GraphQLObjectTypeConfig<Want, Context> = {
  name: "Want",
  fields: () => ({
    ...baseFields,
    name: { type: new GraphQLNonNull(GraphQLString) },
    dimensions: {
      type: new GraphQLList(DimensionNode),
      resolve: obj => obj.populate("dimensions").execPopulate()
    },
    needs: {
      type: new GraphQLList(NeedNode),
      resolve: obj => obj.populate("needs").execPopulate()
    }
  })
};

export const WantNode = new GraphQLObjectType(wantNodeConfig);
