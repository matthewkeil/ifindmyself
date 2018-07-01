/**
 *
 *  - build graphql types from mongoose schema config
 *  - save schema name to list of known schemas
 *  - resolve graphql leaf types to/from collection holding schema
 *  - resolve non-leaf types to other know schemas
 *  - auto-resolve nested types by _id from appropriate collection
 *  - should be able to build mongo query directly into graphql query
 *
 *
 *  index.ts
 *  - should aggregate model files
 *  - should export SourceModule[]
 *
 * modelFile.ts
 *  - export default SourceModule
 *  - base on {definition: SchemaDefinition, options?: SchemaOptions}
 */
