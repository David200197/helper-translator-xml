import convert from "xml-js";
import { randomUUID } from "crypto";
import { Paginator } from "../utils/paginator.js";
import { xmlDataCollection } from "../db.js";
import { convertEnToEmptyEs } from "../utils/convert-en-to-empty-es.js";
import { getTraductionPercent } from "../utils/get-traduction-percent.js";

export const setXmlData = async (req, res) => {
  const files = req.files;
  const xmlData = files.map((file) => {
    const id = randomUUID();
    const name = file.originalname;
    const xml = file.buffer.toString();
    const en = convert.xml2js(xml);
    const es = convertEnToEmptyEs(en);
    const createdAt = new Date();
    const updatedAt = new Date();
    return { id, name, en, es, updatedAt, createdAt };
  });
  await xmlDataCollection.insertAsync(xmlData);
  res.json({ ok: true });
};

export const getAllXmlData = async (req, res) => {
  const page = +(req.query.page ?? "1");
  const paginator = new Paginator({ page, perPage: 10 });
  const xmlData = await xmlDataCollection
    .findAsync({}, { en: 0 })
    .sort({ updatedAt: -1 })
    .skip(paginator.skip)
    .limit(paginator.limit);
  const data = xmlData.map(({ es, ...value }) => ({
    ...value,
    traductionPercent: getTraductionPercent(es),
  }));
  res.json({ ok: true, data });
};

export const getOneXmlData = async (req, res) => {
  const id = req.params.id;
  const data = await xmlDataCollection.findOneAsync({ id });
  res.json({ ok: true, data });
};

export const removeOneXmlData = async (req, res) => {
  const id = req.params.id;
  await xmlDataCollection.removeAsync({ id });
  res.json({ ok: true });
};
