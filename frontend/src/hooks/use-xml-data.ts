import env from "@/env";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Options = { autoLoad?: boolean };

const getXmlDataUrl = (url: string = "") => `${env.BACK}/api/xml${url}`;

export const useXmlData = ({ autoLoad = false }: Options = {}) => {
  const [xmlData, setXmlData] = useState([]);

  useEffect(() => {
    const run = async () => {
      if (!autoLoad) return;
      const { ok, data } = await fetch(getXmlDataUrl()).then((res) =>
        res.json()
      );
      if (!ok) return toast.error("los metadatos de xml no a sido cargados");
      setXmlData(data);
    };
    run();
  }, [autoLoad]);

  console.log(xmlData);

  return { xmlData };
};
