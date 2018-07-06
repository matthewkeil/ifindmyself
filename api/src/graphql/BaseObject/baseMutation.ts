// import {
//   GraphQLOutputType,
//   GraphQLFieldConfig,
//   GraphQLFieldConfigMap,
//   GraphQLObjectTypeConfig,
//   GraphQLField,
//   GraphQLResolveInfo
// } from "graphql";

import { Document, Model } from "mongoose";

import { FieldsMap } from "..";
import { BuildArgs, MongooseOptions } from "./baseQuery";
import { GraphQLNonNull } from "graphql";
import GraphQLMongoQuery from "../../util/GraphQLMongoQuery";

const create = <T extends Document>({
  model,
  node
}: BuildArgs<T>): FieldsMap<T> => ({
  /**
   * Shortcut for saving one or more documents to the database.
   * `MyModel.create(docs)` does `new MyModel(doc).save()` for every doc in
   * docs.
   *
   * This function triggers the following middleware.
   *
   * - `save()`
   *
   * ####Example:
   *
   *     // pass a spread of docs and a callback
   *     Candy.create({ type: 'jelly bean' }, { type: 'snickers' }, function (err, jellybean, snickers) {
   *       if (err) // ...
   *     });
   *
   *     // pass an array of docs
   *     var array = [{ type: 'jelly bean' }, { type: 'snickers' }];
   *     Candy.create(array, function (err, candies) {
   *       if (err) // ...
   *
   *       var jellybean = candies[0];
   *       var snickers = candies[1];
   *       // ...
   *     });
   *
   *     // callback is optional; use the returned promise if you like:
   *     var promise = Candy.create({ type: 'jawbreaker' });
   *     promise.then(function (jawbreaker) {
   *       // ...
   *     })
   *
   * @param {Array|Object} docs Documents to insert, as a spread or array
   * @param {Function} [callback] callback
   * @return {Promise}
   * @api public
   */
  [`create${model.modelName}`]: {
    type: node,
    resolve: (_, __, context) => {
      return context[model.modelName].create();
    }
  }
});

const insertMany = <T extends Document>({
  model,
  node
}: BuildArgs<T>): FieldsMap<T> => ({
  /**
   * Shortcut for validating an array of documents and inserting them into
   * MongoDB if they're all valid. This function is faster than `.create()`
   * because it only sends one operation to the server, rather than one for each
   * document.
   *
   * Mongoose always validates each document **before** sending `insertMany`
   * to MongoDB. So if one document has a validation error, no documents will
   * be saved, unless you set
   * [the `ordered` option to false](https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#error-handling).
   *
   * This function does **not** trigger save middleware.
   *
   * This function triggers the following middleware.
   *
   * - `insertMany()`
   *
   * ####Example:
   *
   *     var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
   *     Movies.insertMany(arr, function(error, docs) {});
   *
   * @param {Array|Object|*} doc(s)
   * @param {Object} [options] see the [mongodb driver options](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insertMany)
   * @param {Boolean} [options.ordered = true] if true, will fail fast on the first error encountered. If false, will insert all the documents it can and report errors later. An `insertMany()` with `ordered = false` is called an "unordered" `insertMany()`.
   * @param {Boolean} [options.rawResult = false] if false, the returned promise resolves to the documents that passed mongoose document validation. If `false`, will return the [raw result from the MongoDB driver](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~insertWriteOpCallback) with a `mongoose` property that contains `validationErrors` if this is an unordered `insertMany`.
   * @param {Function} [callback] callback
   * @return {Promise}
   * @api public
   */
  [`insertMany${model.modelName}`]: {
    type: node,
    resolve: (_, __, context) => {
      return context[model.modelName].insertMany();
    }
  }
});

const findOneAndUpdate = <T extends Document>({
  model,
  node
}: BuildArgs<T>): FieldsMap<T> => ({
  /**
   * Issues a mongodb findAndModify update command.
   *
   * Finds a matching document, updates it according to the `update` arg, passing any `options`, and returns the found document (if any) to the callback. The query executes immediately if `callback` is passed else a Query object is returned.
   *
   * ####Options:
   *
   * - `new`: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
   * - `upsert`: bool - creates the object if it doesn't exist. defaults to false.
   * - `fields`: {Object|String} - Field selection. Equivalent to `.select(fields).findOneAndUpdate()`
   * - `maxTimeMS`: puts a time limit on the query - requires mongodb >= 2.6.0
   * - `sort`: if multiple docs are found by the conditions, sets the sort order to choose which doc to update
   * - `runValidators`: if true, runs [update validators](/docs/validation.html#update-validators) on this command. Update validators validate the update operation against the model's schema.
   * - `setDefaultsOnInsert`: if this and `upsert` are true, mongoose will apply the [defaults](http://mongoosejs.com/docs/defaults.html) specified in the model's schema if a new document is created. This option only works on MongoDB >= 2.4 because it relies on [MongoDB's `$setOnInsert` operator](https://docs.mongodb.org/v2.4/reference/operator/update/setOnInsert/).
   * - `rawResult`: if true, returns the [raw result from the MongoDB driver](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findAndModify)
   * - `strict`: overwrites the schema's [strict mode option](http://mongoosejs.com/docs/guide.html#strict) for this update
   *
   * ####Examples:
   *
   *     A.findOneAndUpdate(conditions, update, options, callback) // executes
   *     A.findOneAndUpdate(conditions, update, options)  // returns Query
   *     A.findOneAndUpdate(conditions, update, callback) // executes
   *     A.findOneAndUpdate(conditions, update)           // returns Query
   *     A.findOneAndUpdate()                             // returns Query
   *
   * ####Note:
   *
   * All top level update keys which are not `atomic` operation names are treated as set operations:
   *
   * ####Example:
   *
   *     var query = { name: 'borne' };
   *     Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
   *
   *     // is sent as
   *     Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options, callback)
   *
   * This helps prevent accidentally overwriting your document with `{ name: 'jason bourne' }`.
   *
   * ####Note:
   *
   * Values are cast to their appropriate types when using the findAndModify helpers.
   * However, the below are not executed by default.
   *
   * - defaults. Use the `setDefaultsOnInsert` option to override.
   *
   * `findAndModify` helpers support limited validation. You can
   * enable these by setting the `runValidators` options,
   * respectively.
   *
   * If you need full-fledged validation, use the traditional approach of first
   * retrieving the document.
   *
   *     Model.findById(id, function (err, doc) {
   *       if (err) ..
   *       doc.name = 'jason bourne';
   *       doc.save(callback);
   *     });
   *
   * @param {Object} [conditions]
   * @param {Object} [update]
   * @param {Object} [options] optional see [`Query.prototype.setOptions()`](http://mongoosejs.com/docs/api.html#query_Query-setOptions)
   * @param {Object} [options.lean] if truthy, mongoose will return the document as a plain JavaScript object rather than a mongoose document. See [`Query.lean()`](http://mongoosejs.com/docs/api.html#query_Query-lean).
   * @param {Function} [callback]
   * @return {Query}
   * @see mongodb http://www.mongodb.org/display/DOCS/findAndModify+Command
   * @api public
   */
  [`find${model.modelName}AndUpdate`]: {
    type: node,
    args: {
      query: { type: new GraphQLNonNull(GraphQLMongoQuery(model)) },
      options: { type: MongooseOptions }
    },
    resolve: (_, { query, options }, context) => {
      return (context[model.modelName] as Model<T>).count(query).exec();
    }
  }
});

const aggregate = <T extends Document>({
  model,
  node
}: BuildArgs<T>): FieldsMap<T> => ({
  /**
   * Performs [aggregations](http://docs.mongodb.org/manual/applications/aggregation/) on the models collection.
   *
   * If a `callback` is passed, the `aggregate` is executed and a `Promise` is returned. If a callback is not passed, the `aggregate` itself is returned.
   *
   * This function does not trigger any middleware.
   *
   * ####Example:
   *
   *     // Find the max balance of all accounts
   *     Users.aggregate([
   *       { $group: { _id: null, maxBalance: { $max: '$balance' }}},
   *       { $project: { _id: 0, maxBalance: 1 }}
   *     ]).
   *     then(function (res) {
   *       console.log(res); // [ { maxBalance: 98000 } ]
   *     });
   *
   *     // Or use the aggregation pipeline builder.
   *     Users.aggregate().
   *       group({ _id: null, maxBalance: { $max: '$balance' } }).
   *       project('-id maxBalance').
   *       exec(function (err, res) {
   *         if (err) return handleError(err);
   *         console.log(res); // [ { maxBalance: 98 } ]
   *       });
   *
   * ####NOTE:
   *
   * - Arguments are not cast to the model's schema because `$project` operators allow redefining the "shape" of the documents at any stage of the pipeline, which may leave documents in an incompatible format.
   * - The documents returned are plain javascript objects, not mongoose documents (since any shape of document can be returned).
   * - Requires MongoDB >= 2.1
   *
   * @see Aggregate #aggregate_Aggregate
   * @see MongoDB http://docs.mongodb.org/manual/applications/aggregation/
   * @param {Array} [pipeline] aggregation pipeline as an array of objects
   * @param {Function} [callback]
   * @return {Aggregate}
   * @api public
   */
  [`aggregate${model.modelName}`]: {
    type: node,
    resolve: (_, __, context) => {
      return context[model.modelName].aggregate();
    }
  }
});

export const buildBaseMutation = <T extends Document>({
  model,
  node
}: BuildArgs<T>): FieldsMap<T> => ({
  ...create({ model, node }),
  ...insertMany({ model, node }),
  ...findOneAndUpdate({ model, node }),
  ...aggregate({ model, node })
});

export default buildBaseMutation;
