import env from "@/env";
import { XmlData } from "@/interfaces/xml-data";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Options = { autoLoad?: boolean };

const getXmlDataUrl = (url: string = "") => `${env.BACK}/api/xml${url}`;

export const useXmlData = ({ autoLoad = false }: Options = {}) => {
  const [xmlData, setXmlData] = useState<XmlData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllXmlData = async (page: number) => {
    const { ok, data } = await fetch(getXmlDataUrl(`?page=${page}`)).then(
      (res) => res.json()
    );
    if (!ok) return toast.error("Los metadatos de xml no a sido cargados");
    setXmlData(data);
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
    getAllXmlData(currentPage);
  };

  useEffect(() => {
    const run = async () => {
      if (!autoLoad) return;
      getAllXmlData(currentPage);
    };
    run();
  }, [autoLoad, currentPage]);

  return {
    xmlData,
    getXmlDataUrl,
    setCurrentPage,
    downloadXml,
    deleteOneXmlData,
  };
};
