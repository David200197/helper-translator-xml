import { XmlData } from "@/models/xml-data";
import { create } from "zustand";

interface XmlDataStore {
  xmlData: XmlData[];
  page: number;
  setXmlData: (xmlData: XmlData[]) => void;
  setPage: (page: number) => void;
}

export const useXmlDataStore = create<XmlDataStore>((set) => ({
  page: 1,
  xmlData: [],
  setPage: (page) => set({ page }),
  setXmlData: (xmlData) => set({ xmlData }),
}));
