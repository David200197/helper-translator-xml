import { Router } from "express";
import {
  getAllXmlData,
  getOneXmlData,
  removeOneXmlData,
  setXmlData,
} from "../controllers/xml.controller.js";
import multer from "multer";

const xmlRouter = new Router();
const upload = multer();

xmlRouter.post("/", upload.array("files"), setXmlData);
xmlRouter.get("/", getAllXmlData);
xmlRouter.get("/:id", getOneXmlData);
xmlRouter.delete("/:id", removeOneXmlData);

export { xmlRouter };
