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
interface User {
  id: string;
  created: number;
  emails: string[];
  passwords: string[];
  tokens: string[];
}

const privateFields: { [key: string]: true } = {
  emails: true,
  passwords: true,
  tokens: true
};
type PrivateFields = keyof typeof privateFields;
export type SerializedUser = Exclude<User, PrivateFields>;

const REQUIRED = true;
const LIST = true;

type FieldConfig = {
  base?: GraphQLType;
  REQUIRED?: boolean;
  LIST?: boolean;
  type?: GraphQLOutputType;
  args?: GraphQLFieldConfigArgumentMap;
  resolve?: GraphQLFieldResolver<any, Context>;
  info?: GraphQLResolveInfo;
};

const _fields: { [key: string]: FieldConfig } = {
  emails: { REQUIRED, LIST, base: GraphQLString },
  passwords: { REQUIRED, base: GraphQLString },
  tokens: { REQUIRED, LIST, base: GraphQLString },
  id: { REQUIRED, base: GraphQLID },
  created: { REQUIRED, base: GraphQLInt }
};

const buildFields = (inPublic: boolean = true) => (): GraphQLFieldConfigMap<
  any,
  Context
> => {
  let fields = {} as GraphQLFieldConfigMap<any, Context>;

  for (let fieldName in _fields) {
    const {
      base: _base,
      REQUIRED: required,
      LIST: list,
      type: _type,
      args,
      resolve,
      info
    } = _fields[fieldName];

    if (inPublic && privateFields[fieldName]) continue;

    let type: GraphQLType;

    if (!_type && _base) {
      let base = _base;
      if (list) base = new GraphQLList(base);
      if (required) base = new GraphQLNonNull(base);
      type = base;
    } else throw new Error("must specify a type");

    Object.assign(fields, {
      [fieldName]: {
        type: type ? type : _type,
        args,
        resolve,
        info
      }
    });
  }

  return fields;
};

export const SerializedUser = new GraphQLInterfaceType({
  name: "SerializedUser",
  description:
    "serialized user object that will be sent between client and server",
  fields: {
    ...buildFields(),
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: obj => {
        return obj.tokens[0];
      }
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: obj => {
        return obj.emails[0];
      }
    }
  }
});

export const User = new GraphQLObjectType({
  name: "User",
  description: "User node in the graph",
  interfaces: [SerializedUser],
  fields: {
    ...buildFields(false),
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: obj => {
        return obj.passwords[0];
      }
    }
  }
});
