import env from "@/env";
import { useXmlDataStore } from "@/store/xml-data.store";
import { loadFile } from "@/utils/load-file";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

type Options = { autoLoad?: boolean };

const getXmlDataUrl = (url: string = "") => `${env.BACK}/api/xml${url}`;

export const useXmlData = ({ autoLoad = false }: Options = {}) => {
  const {
    page,
    setPage,
    setXmlData,
    xmlData,
    setTotalElement,
    setTotalPage,
    totalElement,
    totalPage,
    changeSort,
    setSortBy,
    sort,
    sortBy,
    setSort,
    filter,
    setFilterBy,
    filterBy,
    setFilter,
  } = useXmlDataStore();

  const isInitialPage = page <= 1;
  const isEndPage = page >= totalPage;

  const getAllXmlData = useCallback(
    async (
      page: number,
      sortBy: string,
      sort: 1 | -1,
      filter: string,
      filterBy: string
    ) => {
      const { ok, data, totalElement, totalPage } = await fetch(
        getXmlDataUrl(
          `?page=${page}&sort=${sort}&sortBy=${sortBy}&filter=${filter}&filterBy=${filterBy}`
        )
      ).then((res) => res.json());
      if (!ok) return toast.error("Los metadatos de xml no a sido cargados");
      setTotalElement(totalElement);
      setTotalPage(totalPage);
      setXmlData(data);
    },
    [setTotalElement, setTotalPage, setXmlData]
  );

  const addXML = async () => {
    const files = await loadFile({ accept: "text/xml", multiple: true });
    if (!files) return;
    const body = new FormData();
    for (let i = 0; i < files.length; i++) {
      body.append("files", files[i], files[i].name);
    }
    await fetch(`${env.BACK}/api/xml`, {
      method: "POST",
      body,
    });
    await getAllXmlData(page, sortBy, sort, filter, filterBy);
    toast.success("Xml agregado correctamente");
  };

  const downloadXml = async (id: string, language: "en" | "es") => {
    const currentXmlData = xmlData.find((data) => data.id === id);
    const blob = await fetch(
      getXmlDataUrl(`/download/${id}/?language=${language}`)
    ).then((res) => res.blob());
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${language}.${currentXmlData!.name}`;
    link.click();
    toast.success(
      `El Xml en ${language === "en" ? "ingles" : "español"} a sido descargado`
    );
  };

  const deleteOneXmlData = async (id: string) => {
    const { ok } = await fetch(getXmlDataUrl(`/${id}`), {
      method: "DELETE",
    }).then((res) => res.json());
    if (!ok) return toast.error("Los metadatos de xml no a sido borrados");
    toast.success("Los metadatos de xml a sido borrados");
    getAllXmlData(page, sortBy, sort, filter, filterBy);
  };

  const nextPage = () => {
    if (isEndPage) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (isInitialPage) return;
    setPage(page - 1);
  };

  useEffect(() => {
    const run = async () => {
      if (!autoLoad) return;
      getAllXmlData(page, sortBy, sort, filter, filterBy);
    };
    run();
  }, [autoLoad, getAllXmlData, page, sort, sortBy, filter, filterBy]);

  return {
    xmlData,
    getAllXmlData,
    setPage,
    page,
    downloadXml,
    deleteOneXmlData,
    addXML,
    totalElement,
    totalPage,
    nextPage,
    prevPage,
    isInitialPage,
    isEndPage,
    changeSort,
    setSortBy,
    sort,
    sortBy,
    setSort,
    filter,
    setFilterBy,
    filterBy,
    setFilter,
  };
};
