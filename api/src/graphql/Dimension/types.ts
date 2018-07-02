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
    wants: { type: new GraphQLList(WantNode) },
    needs: { type: new GraphQLList(NeedNode) }
  })
};

export const DimensionNode = new GraphQLObjectType(dimensionNodeConfig);
