import convert from "xml-js";
import { randomUUID } from "crypto";
import { Paginator } from "../utils/paginator.js";
import { xmlDataCollection } from "../db.js";
import { convertEnToEmptyEs } from "../utils/convert-en-to-empty-es.js";
import { getTraductionPercent } from "../utils/get-traduction-percent.js";
import { createTranslateFields } from "../utils/create-translate-fields.js";
import { updateEs } from "../utils/update-es.js";

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
    return { id, name, en, es, updatedAt, createdAt, traductionPercent: 0 };
  });
  await xmlDataCollection.insertAsync(xmlData);
  res.json({ ok: true });
};

export const getAllXmlData = async (req, res) => {
  const sortBy = req.query.sortBy || "updatedAt"
  const sort = +(req.query.sort ?? "-1")
  const page = +(req.query.page ?? "1");
  const filter = (req.query.filter ?? "");
  const filterBy = (req.query.filterBy ?? "name");
  const filterValue = filterBy === "traductionPercent" && filter ? +filter : new RegExp(filter)
  const paginator = new Paginator({ page, perPage: 6 });
  const data = await xmlDataCollection
    .findAsync({ [filterBy]: filterValue }, { en: 0, es: 0 })
    .sort({ [sortBy]: sort })
    .skip(paginator.skip)
    .limit(paginator.limit);

  const totalElement = await xmlDataCollection.countAsync({})
  const totalPage = paginator.getTotalPage(totalElement)
  res.json({ ok: true, data, totalElement, totalPage });
};

export const getOneXmlData = async (req, res) => {
  const id = req.params.id;
  const data = await xmlDataCollection.findOneAsync({ id });
  if (!data) return res.status(400).json({ ok: false });
  const translateFields = createTranslateFields(data.en, data.es)
  data.translateFields = translateFields
  delete data.en
  delete data.es
  res.json({ ok: true, data });
};

export const removeOneXmlData = async (req, res) => {
  const id = req.params.id;
  const countDeleted = await xmlDataCollection.removeAsync({ id });
  if (!countDeleted) return res.status(400).json({ ok: false });
  res.json({ ok: true });
};

export const downloadXml = async (req, res) => {
  const id = req.params.id;
  const language =
    req.query.language !== "es" && req.query.language !== "en"
      ? "es"
      : req.query.language;
  const data = await xmlDataCollection.findOneAsync({ id });
  if (!data) return res.status(400).json({ ok: false });
  const xml = convert.js2xml(data[language]);
  res.setHeader("Content-disposition", "attachment; filename=" + data.name);
  res.setHeader("Content-type", "application/xml");
  const buffer = Buffer.from(xml, "utf8");
  res.end(buffer)
};

export const updateOneFieldEsXml = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name
  const text = req.body.text
  const data = await xmlDataCollection.findOneAsync({ id });
  if (!data) return res.status(400).json({ ok: false });
  data.traductionPercent = getTraductionPercent(data.es)
  const updated = updateEs(data.es, name, text)
  if (!updated)
    return res.json({ ok: false });
  await xmlDataCollection.updateAsync({ id }, data)
  res.json({ ok: true });
}

export const updateManyFieldEsXml = async (req, res) => {
  const id = req.params.id;
  const changes = req.body.changes
  if (!Array.isArray(changes)) return res.json({ ok: false });
  const data = await xmlDataCollection.findOneAsync({ id });
  if (!data) return res.status(400).json({ ok: false });
  data.traductionPercent = getTraductionPercent(data.es)
  for (const { name, text } of changes)
    updateEs(data.es, name, text)
  await xmlDataCollection.updateAsync({ id }, data)
  res.json({ ok: true });
}