import { GraphQLScalarType, Kind } from "graphql";
import { FilterQuery } from "mongodb";
import { isString, isObject, isNumber } from "util";
import { Model, Document as Doc, VirtualType, SchemaType } from "mongoose";

/**

$eq?: T[P];
        $gt?: T[P];
        $gte?: T[P];
        $in?: T[P][];
        $lt?: T[P];
        $lte?: T[P];
        $ne?: T[P];
        $nin?: T[P][];
        $and?: (FilterQuery<T[P]> | T[P])[];
        $or?: (FilterQuery<T[P]> | T[P])[];
        $not?: (FilterQuery<T[P]> | T[P])[] | T[P];


        $size?: number;
        $mod?: [number, number];
        $options?: string;
        $regex?: RegExp;

        $text?: {
            $search: string;
            $language?: string;
            $caseSensitive?: boolean;
            $diacraticSensitive?: boolean;
        };

        $where: Object;
        $geoIntersects?: Object;
        $geoWithin?: Object;
        $near?: Object;
        $nearSphere?: Object;
        $elemMatch?: Object;
        $bitsAllClear?: Object;
        $bitsAllSet?: Object;
        $bitsAnyClear?: Object;
        $bitsAnySet?: Object;


        $expr?: any;
        $jsonSchema?: any;

 */
export type Document<T extends object> = Doc & T;
type MongooseLeafType = {
  type: SchemaType | SchemaType[];
  required: boolean;
  unique: boolean;
  default: any;
  ref: string;
};

type MongooseLimbType = {
  [key: string]: MongooseLimbType | MongooseLeafType;
};

type MongooseBranchType = {
  [key: string]: VirtualType | MongooseLimbType | MongooseLeafType;
};

type MongooseTree<T> = { [key in keyof T]: MongooseBranchType };
type Validator<T extends string | number | boolean | {}> = (
  value: T
) => boolean;
type TreeValidator<T> = { [K in keyof T]: Validator<T[K]> };

export default <T extends object>(model: Model<Document<T>>) => {
  const tree = (model.schema as any).tree as MongooseTree<T>;

  (Object.entries(tree) as [keyof T, MongooseBranchType][]).forEach(
    ([fieldName, branch]) => ({ [fieldName]: branch })
  );

  const validateFilterQuery = <T>(value: any) => {
    let query = {} as FilterQuery<T>;
    let errors = [] as Error[];

    if (isString(value)) query = JSON.parse(value);
    else if (isObject(value)) query = value;
    else
      return [
        new Error(`FilterQuery<${model.modelName}> must be a JSON object`)
      ];

    Object.entries(query).forEach(([key, value]) => {
      if (key.startsWith("$")) {
        switch (key) {
          case "$size":
            if (!isNumber(value))
              errors.push(new Error("$size must be a number"));
            break;
          case "$mod":
            if (
              Array.isArray(value) &&
              (!value.length ||
                value.length > 2 ||
                value.filter(val => !isNumber(val)).length)
            )
              errors.push(
                new Error("$mod must be a tuple of [number, number]")
              );
            break;
          case "$options":
            if (!isString(value))
              errors.push(new Error("$options must be a string"));
            break;
          case "$regex":
            if (isString(value)) {
              if (value.startsWith("/") && value.endsWith("/"))
                query[key] = new RegExp(value.slice(1, value.length - 1));
              else query[key] = new RegExp(value);
            } else errors.push(new Error("$regex must be a RegExp"));
            break;
          // check values against model type
          case "$gt":
          case "$gte":
          case "$lt":
          case "$lte":
          case "$ne":
          // check all values in array against model types
          case "$in":
          case "$nin":
          // if isArray(value) check value types T[P]
          // else isObject(value) validateFilterQuery(value as FilterQuery<T>)
          case "$and":
          case "$or":
          case "$not":
          // check for $text keys
          case "$text":
          //generic objects
          case "$geoIntersects":
          case "$geoWithin":
          case "$near":
          case "$nearSphere":
          case "$elemMatch":
          case "$bitsAllClear":
          case "$bitsAllSet":
          case "$bitsAnyClear":
          case "$bitsAnySet":
            if (!isObject(value))
              errors.push(new Error(`${key} must be an object`));
            break;
          case "$jsonSchema":
            break;
          case "$where":
          case "$expr":
            errors.push(new Error(`${key} is not allowed over http`));
            break;
        }
      }
    });

    return errors.length ? errors : query;
  };

  return new GraphQLScalarType({
    name: `MongoQuery<${model.modelName}>`,
    description: "query input validation for mongodb",
    serialize: value => value,
    parseValue: value => {
      let results = validateFilterQuery(value);
      if (Array.isArray(results)) throw results[0];
      return results;
    },
    parseLiteral: ast => {
      if (ast.kind === Kind.STRING) {
        let results = validateFilterQuery(ast.value);
        if (Array.isArray(results)) throw results[0];
        return results;
      }
      throw new Error("unknown error parsing MongoQuery literal");
    }
  });
};
