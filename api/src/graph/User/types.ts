import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLInterfaceTypeConfig,
  GraphQLObjectTypeConfig,
  GraphQLOutputType,
  GraphQLType,
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldResolver,
  GraphQLResolveInfo,
  GraphQLFieldConfigMap,
  GraphQLInputObjectType
} from "graphql";
import { Context } from "../";

// const privateFields: { [key: string]: true } = {
//   passwords: true,
//   tokens: true
// };
// type PrivateFields = keyof typeof privateFields;
// export type SerializedUser = Exclude<User, PrivateFields>;

// const REQUIRED = true;
// const LIST = true;

// type FieldConfig = {
//   base?: GraphQLType;
//   REQUIRED?: boolean;
//   LIST?: boolean;
//   type?: GraphQLOutputType;
//   args?: GraphQLFieldConfigArgumentMap;
//   resolve?: GraphQLFieldResolver<any, Context>;
//   info?: GraphQLResolveInfo;
// };

// const _fields: { [key: string]: FieldConfig } = {
//   id: { REQUIRED, base: GraphQLID },
//   created: { REQUIRED, base: GraphQLInt },
//   emails: { REQUIRED, LIST, base: GraphQLString },
//   passwords: { REQUIRED, base: GraphQLString },
//   tokens: { REQUIRED, LIST, base: GraphQLString }
// };

// const buildFields = (inPublic: boolean = true) => (): GraphQLFieldConfigMap<
//   any,
//   Context
// > => {
//   let fields = {} as GraphQLFieldConfigMap<any, Context>;

//   for (let fieldName in _fields) {
//     const {
//       base: _base,
//       REQUIRED: required,
//       LIST: list,
//       type: _type,
//       args,
//       resolve,
//       info
//     } = _fields[fieldName];

//     if (inPublic && privateFields[fieldName]) continue;

//     let type: GraphQLType;

//     if (!_type && _base) {
//       let base = _base;
//       if (list) base = new GraphQLList(base);
//       if (required) base = new GraphQLNonNull(base);
//       type = base;
//     } else throw new Error("must specify a type");

//     Object.assign(fields, {
//       [fieldName]: {
//         type: type ? type : _type,
//         args,
//         resolve,
//         info
//       }
//     });
//   }

//   return fields;
// };

// export const SerializedUser = new GraphQLInterfaceType({
//   name: "SerializedUser",
//   description:
//     "serialized user object that will be sent between client and server",
//   fields: {
//     ...buildFields()
// });

// export const User = new GraphQLObjectType({
//   name: "User",
//   description: "User node in the graph",
//   interfaces: [SerializedUser],
//   fields: {
//     ...buildFields(false),
//     password: {
//       type: new GraphQLNonNull(GraphQLString),
//       resolve: obj => {
//         return obj.passwords[0];
//       }
//     },
//   token: {
//     type: new GraphQLNonNull(GraphQLString),
//     resolve: obj => {
//       return obj.tokens[0];
//     }
//   },
//   email: {
//     type: new GraphQLNonNull(GraphQLString),
//     resolve: obj => {
//       return obj.emails[0];
//     }
//   }
// }
// });
