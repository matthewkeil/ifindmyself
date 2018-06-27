import { MongoClient, Db, ObjectId, Collection } from "mongodb";
import { MONGO } from "../util/helpers";
import { ServerError } from "../util";

// interface IUser extends SerializableObject {
//   id: string;
//   name: number;
//   email: string;
// }

type SerializableType = string | number | boolean;
type SerializableArray = SerializableType[] | SerializableObject[];
type SerializableObject = {
  [key: string]: SerializableProperty;
};
type SerializableProperty =
  | SerializableType
  | SerializableArray
  | SerializableObject;

type DocumentType = {
  [key: string]: SerializableProperty | ObjectId;
};
interface Document extends DocumentType {
  _id: ObjectId;
}

// const Property: (config: {}) => PropertyDecorator = ({}) => (
//   target: ODM,
//   key: string
// ) => {
//   Object.defineProperty(target, key, {
//     configurable: false,
//     enumerable: true,
//     writable: true,
//     get: () => target.getProp(key),
//     set: (value: any) => target.setProp({ [key]: value })
//   });
// };

let Collection;

MongoClient.connect(
  MONGO.URL,
  (err, client) => {
    const db = client.db(MONGO.DB_NAME);
    db.on("error", ServerError("mongoose connection error"));
    db.once("open", () =>
      console.log(`ODM - Connected to db ${MONGO.DB_NAME} at ${MONGO.URL}`)
    );

    class CollectionManager<T extends Document> {
      constructor(private _collection: Collection<T>) {}
      findById: (id: string) => Collection<T>["findOne"];
    }

    const Collection = (name: string): ClassDecorator => (target: T) => {
      const { prototype: pro } = target;
      const col = (pro._collection = db.collection(name));
      pro.findById = (id: string) => col.findOne({ id });
    };

    // Collection = name => <T>(
    //   target: T,
    //   key: string,
    //   descriptor: TypedPropertyDescriptor<>
    // ) => {
    //   target.prototype.collection = db.collection(name);
    //   target.prototype.findBy = (prop: Partial<User>) =>
    //     collection.findBy({ ...prop });
    // };
  }
);

export default Collection;
