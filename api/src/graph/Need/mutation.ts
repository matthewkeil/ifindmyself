import {
  GraphQLObjectTypeConfig,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from "graphql";

import { Context } from "../";
import { Need } from "./types";

const CreateNeedInput = new GraphQLInputObjectType({
  name: "CreateNeedInput",
  fields: {}
});
const needMutation: GraphQLObjectTypeConfig<Need, Context>["fields"] = {
  createNeed: {
    type: Need,
    args: {},
    resolve: (_, args, {}) => {
      const need = `(need: Need {})`;
      const relationship = ``;
      // const dimension = `(dimension:Dimension {${(...args.input.dimension)}})`;

      // return neo.run(`
      //   CREATE ${need} -[:DIMENSIONED]-> ${dimension}
      //   RETURN need, dimension
      // `)
    }
  }
};

export default needMutation;
