// import { GraphQLNonNull, GraphQLString } from "graphql";

// import { generate as shortid } from "shortid";
// import { hash } from "bcrypt";

// import { GraphModule } from "..";
// import { User, SerializedUser } from "./types";
// import { Token } from "../Token";
// import { ServerError, toPropString } from "../../util";

// const mutation: GraphModule.Mutation = {
//   createUser: {
//     type: SerializedUser,
//     description: "Create a new user node",
//     args: {
//       email: { type: new GraphQLNonNull(GraphQLString) },
//       password: { type: new GraphQLNonNull(GraphQLString) }
//     },
//     resolve: async (_, { email, password }, {}) => {
//       let user!: User;
//       try {
//         user = {
//           email,
//           created: Date.now(),
//           password: await hash(password, 10),
//           id: await shortid(),
//           token: await Token.sign({ id: user.id })
//         };
//       } catch (err) {ServerError("error creating user props", {err})
//     }
//   }
// };
