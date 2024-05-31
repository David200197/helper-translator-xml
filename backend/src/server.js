import express from "express";
import open from "open";
import multer from "multer";
import { getAllXmlData, setXmlData } from "./controllers/xml.controller.js";
import cors from "cors";
import "./db.js";

const upload = multer();
const app = express();
const port = 8080;

app.use(cors());
app.post("/api/close", () => process.exit(1));
app.post("/api/xml", upload.array("files"), setXmlData);
app.get("/api/xml", getAllXmlData);
app.use("/", express.static("public"));

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await open(`http://localhost:${port}/`);
});
