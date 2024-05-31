import express from "express";
import open from "open";
import cors from "cors";
import "./db.js";
import { loadDatabase } from "./db.js";
import { xmlRouter } from "./routers/xml.router.js";

const main = async () => {
  await loadDatabase();
  const app = express();
  const port = 8080;

  app.use(cors());
  app.post("/api/close", () => process.exit(1));
  app.use("/api/xml", xmlRouter);
  app.use("/", express.static("public"));

  app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    await open(`http://localhost:${port}/`);
  });
};
main();
