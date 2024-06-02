import { XmlData } from "./xml-data";

type XmlJsonData = {
  elements: { name: string; elements: { 0: { text: string } } }[];
};

export interface XmlOneData extends XmlData {
  en: XmlJsonData;
  es: XmlJsonData;
}
