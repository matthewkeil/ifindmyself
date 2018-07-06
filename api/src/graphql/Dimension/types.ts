import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectTypeConfig
} from "graphql";

import { baseFields, Context } from "../";
import { Dimension } from "./model";
import { WantNode } from "../Want";
import { NeedNode } from "../Need";

export const dimensionNodeConfig: GraphQLObjectTypeConfig<
  Dimension,
  Context
> = {
  name: "Dimension",
  fields: () => ({
    ...baseFields,
    name: { type: new GraphQLNonNull(GraphQLString) },
    primary: { type: new GraphQLNonNull(GraphQLString) },
    secondary: { type: new GraphQLNonNull(GraphQLString) },
    wants: {
      type: new GraphQLList(WantNode),
      resolve: obj => obj.populate("wants").execPopulate()
    },
    needs: {
      type: new GraphQLList(NeedNode),
      resolve: obj => obj.populate("needs").execPopulate()
    }
  })
};

export const DimensionNode = new GraphQLObjectType(dimensionNodeConfig);
