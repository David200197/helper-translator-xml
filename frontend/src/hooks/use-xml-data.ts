import env from "@/env";
import { useXmlDataStore } from "@/store/xml-data.store";
import { loadFile } from "@/utils/load-file";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

type Options = { autoLoad?: boolean };

const getXmlDataUrl = (url: string = "") => `${env.BACK}/api/xml${url}`;

export const useXmlData = ({ autoLoad = false }: Options = {}) => {
  const { page, setPage, setXmlData, xmlData } = useXmlDataStore();

  const getAllXmlData = useCallback(
    async (page: number) => {
      const { ok, data } = await fetch(getXmlDataUrl(`?page=${page}`)).then(
        (res) => res.json()
      );
      if (!ok) return toast.error("Los metadatos de xml no a sido cargados");
      setXmlData(data);
    },
    [setXmlData]
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
    await getAllXmlData(page);
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
    getAllXmlData(page);
  };

  useEffect(() => {
    const run = async () => {
      if (!autoLoad) return;
      getAllXmlData(page);
    };
    run();
  }, [autoLoad, getAllXmlData, page]);

  return {
    xmlData,
    getAllXmlData,
    setPage,
    page,
    downloadXml,
    deleteOneXmlData,
    addXML
  };
};
