import convert from "xml-js";
import { randomUUID } from "crypto";
import { Paginator } from "../utils/paginator.js";

export const setXmlData = async (req, res) => {
  const files = req.files;
  const xmlData = files.map((file) => {
    const id = randomUUID();
    const name = file.originalname;
    const xml = file.buffer.toString();
    const data = convert.xml2js(xml);
    return { id, name, data };
  });
  res.json({ ok: true });
};

export const getAllXmlData = async (req, res) => {
  const page = +(req.query.page ?? "1");
  const paginator = new Paginator({ page, perPage: 10 });
  const xmlData = [];
  res.json({ ok: true, xmlData });
};
