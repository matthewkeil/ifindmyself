import {
  GraphQLOutputType,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull
} from "graphql";

import { Model, Document } from "mongoose";

import { FieldsMap } from "..";
import GraphQLMongoQuery from "../../util/GraphQLMongoQuery";

export interface BuildArgs<T extends Document> {
  model: Model<T>;
  node: GraphQLOutputType;
}

export const MongooseOptions = new GraphQLInputObjectType({
  name: "MongooseQueryOptions",
  fields: {
    sort: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    skip: { type: GraphQLInt }
  }
});

const count = <T extends Document>({ model }: BuildArgs<T>): FieldsMap<T> => ({
  /**
   * Counts number of matching documents in a database collection.
   *
   * ####Example:
   *
   *     Adventure.count({ type: 'jungle' }, function (err, count) {
   *       if (err) ..
   *       console.log('there are %d jungle adventures', count);
   *     });
   *
   * @param {Object} conditions
   * @param {Function} [callback]
   * @return {Query}
   * @api public
   */
  [`count${model.modelName}`]: {
    type: GraphQLInt,
    args: {
      query: { type: new GraphQLNonNull(GraphQLMongoQuery(model)) },
      options: { type: MongooseOptions }
    },
    resolve: (_, { query }, context) => {
      return (context[model.modelName] as Model<T>).count(query).exec();
    }
  }
});

const find = <T extends Document>({
  model,
  node
}: BuildArgs<T>): FieldsMap<T> => ({
  /**
   * Finds documents
   *
   * The `conditions` are cast to their respective SchemaTypes before the command is sent.
   *
   * ####Examples:
   *
   *     // named john and at least 18
   *     MyModel.find({ name: 'john', age: { $gte: 18 }});
   *
   *     // executes immediately, passing results to callback
   *     MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});
   *
   *     // name LIKE john and only selecting the "name" and "friends" fields, executing immediately
   *     MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })
   *
   *     // passing options
   *     MyModel.find({ name: /john/i }, null, { skip: 10 })
   *
   *     // passing options and executing immediately
   *     MyModel.find({ name: /john/i }, null, { skip: 10 }, function (err, docs) {});
   *
   *     // executing a query explicitly
   *     var query = MyModel.find({ name: /john/i }, null, { skip: 10 })
   *     query.exec(function (err, docs) {});
   *
   *     // using the promise returned from executing a query
   *     var query = MyModel.find({ name: /john/i }, null, { skip: 10 });
   *     var promise = query.exec();
   *     promise.addBack(function (err, docs) {});
   *
   * @param {Object} conditions
   * @param {Object|String} [projection] optional fields to return, see [`Query.prototype.select()`](#query_Query-select)
   * @param {Object} [options] optional see [`Query.prototype.setOptions()`](http://mongoosejs.com/docs/api.html#query_Query-setOptions)
   * @param {Function} [callback]
   * @return {Query}
   * @see field selection #query_Query-select
   * @see promise #promise-js
   * @api public
   */
  [`count${model.modelName}`]: {
    type: GraphQLInt,
    args: {
      query: { type: GraphQLMongoQuery(model) },
      options: { type: MongooseOptions }
    },
    resolve: (_, { query, options }, context) => {
      return (context[model.modelName] as Model<T>)
        .find(...(options ? [query, options] : [query]))
        .exec();
    }
  }
});

const findOne = <T extends Document>({
  model,
  node
}: BuildArgs<T>): FieldsMap<T> => ({
  /**
   * Finds one document.
   *
   * The `conditions` are cast to their respective SchemaTypes before the command is sent.
   *
   * *Note:* `conditions` is optional, and if `conditions` is null or undefined,
   * mongoose will send an empty `findOne` command to MongoDB, which will return
   * an arbitrary document. If you're querying by `_id`, use `findById()` instead.
   *
   * ####Example:
   *
   *     // find one iphone adventures - iphone adventures??
   *     Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
   *
   *     // same as above
   *     Adventure.findOne({ type: 'iphone' }).exec(function (err, adventure) {});
   *
   *     // select only the adventures name
   *     Adventure.findOne({ type: 'iphone' }, 'name', function (err, adventure) {});
   *
   *     // same as above
   *     Adventure.findOne({ type: 'iphone' }, 'name').exec(function (err, adventure) {});
   *
   *     // specify options, in this case lean
   *     Adventure.findOne({ type: 'iphone' }, 'name', { lean: true }, callback);
   *
   *     // same as above
   *     Adventure.findOne({ type: 'iphone' }, 'name', { lean: true }).exec(callback);
   *
   *     // chaining findOne queries (same as above)
   *     Adventure.findOne({ type: 'iphone' }).select('name').lean().exec(callback);
   *
   * @param {Object} [conditions]
   * @param {Object|String} [projection] optional fields to return, see [`Query.prototype.select()`](#query_Query-select)
   * @param {Object} [options] optional see [`Query.prototype.setOptions()`](http://mongoosejs.com/docs/api.html#query_Query-setOptions)
   * @param {Function} [callback]
   * @return {Query}
   * @see field selection #query_Query-select
   * @see lean queries #query_Query-lean
   * @api public
   */
  [`count${model.modelName}`]: {
    type: GraphQLInt,
    args: {
      query: { type: GraphQLMongoQuery(model) },
      options: { type: MongooseOptions }
    },
    resolve: (_, { query, options }, context) => {
      return (context[model.modelName] as Model<T>)
        .findOne(...(options ? [query, options] : [query]))
        .exec();
    }
  }
});

export const buildBaseQuery = <T extends Document>({
  model,
  node
}: BuildArgs<T>): FieldsMap<T> => ({
  ...count({ model, node }),
  ...find({ model, node }),
  ...findOne({ model, node })
});

// export default buildBaseQuery;
