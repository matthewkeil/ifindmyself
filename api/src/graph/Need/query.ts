import {
  GraphQLString,
  GraphQLObjectTypeConfig,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from "graphql";
// import { Db } from "mongodb";

import { Context } from "../";
import { Need } from "./types";

const needQuery: GraphQLObjectTypeConfig<Need, Context>["fields"] = {
  getAllNeeds: {
    type: new GraphQLList(Need),
    resolve: (_, __, { db }) =>
      db
        .collection("needs")
        .find({})
        .toArray()
  },
  getNeedById: {
    type: Need,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, { id }, { db }) => db.collection("needs").findOne({ id })
  }
};

export default needQuery;
