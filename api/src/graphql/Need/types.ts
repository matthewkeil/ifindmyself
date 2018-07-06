import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectTypeConfig
} from "graphql";

import { baseFields, Context } from "../";
import { Need } from "./model";
import { DimensionNode } from "../Dimension";
import { WantNode } from "../Want";

export const needNodeConfig: GraphQLObjectTypeConfig<Need, Context> = {
  name: "Need",
  fields: () => ({
    ...baseFields,
    name: { type: new GraphQLNonNull(GraphQLString) },
    dimensions: {
      type: new GraphQLList(DimensionNode),
      resolve: obj => obj.populate("dimensions").execPopulate()
    },
    wants: {
      type: new GraphQLList(WantNode),
      resolve: obj => obj.populate("wants").execPopulate()
    }
  })
};

export const NeedNode = new GraphQLObjectType(needNodeConfig);
