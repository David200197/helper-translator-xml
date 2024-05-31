import Datastore from "@seald-io/nedb";
import path from "path";

export const xmlDataCollection = new Datastore({
  filename: path.join("db", "xml-data.json"),
});

export const loadDatabase = async () => {
  await xmlDataCollection.loadDatabaseAsync();
};
