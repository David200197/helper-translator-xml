import { XmlData } from "@/models/xml-data";
import { create } from "zustand";

interface XmlDataStore {
  xmlData: XmlData[];
  page: number;
  totalElement: number;
  totalPage: number;
  sortBy: string;
  sort: 1 | -1;
  filterBy: string;
  filter: string;
  setXmlData: (xmlData: XmlData[]) => void;
  setPage: (page: number) => void;
  setTotalElement: (totalElement: number) => void;
  setTotalPage: (totalPage: number) => void;
  setSortBy: (sortBy: string) => void;
  changeSort: () => void;
  setSort: (sort: 1 | -1) => void;
  setFilterBy: (filterBy: string) => void;
  setFilter: (filter: string) => void;
}

export const useXmlDataStore = create<XmlDataStore>((set) => ({
  page: 1,
  xmlData: [],
  totalElement: 0,
  totalPage: 0,
  sortBy: "updatedAt",
  sort: -1,
  filterBy: "name",
  filter: "",
  setPage: (page) => set({ page }),
  setXmlData: (xmlData) => set({ xmlData }),
  setTotalElement: (totalElement) => set({ totalElement }),
  setTotalPage: (totalPage) => set({ totalPage }),
  setSortBy: (sortBy) => set({ sortBy }),
  changeSort: () => set(({ sort }) => ({ sort: sort === 1 ? -1 : 1 })),
  setSort: (sort) => set({ sort }),
  setFilterBy: (filterBy) => set({ filterBy }),
  setFilter: (filter) => set({ filter }),
}));
