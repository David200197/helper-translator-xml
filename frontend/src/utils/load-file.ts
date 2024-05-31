import { promiseResolver } from "./promise-resolver";

type Options = { multiple?: boolean; accept?: string };

export const loadFile = async ({ accept, multiple }: Options = {}) => {
  const { promise, resolve } = promiseResolver<FileList | null>();
  const selectorFile = document.createElement("input");
  selectorFile.type = "file";
  if (multiple) selectorFile.multiple = multiple;
  if (accept) selectorFile.accept = accept;

  selectorFile.addEventListener("cancel", () => {
    resolve(null);
  });

  selectorFile.addEventListener("change", (event) => {
    const files = (event?.target as HTMLInputElement)?.files;
    resolve(files);
  });

  selectorFile.click();
  return await promise;
};
