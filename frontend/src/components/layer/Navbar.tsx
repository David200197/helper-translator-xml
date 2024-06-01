import { closeApp } from "@/utils/close-app";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";

import { useHotkeys } from "@/hooks/use-hotkeys";
import { loadFile } from "@/utils/load-file";
import env from "@/env";
import toast from "react-hot-toast";

const Navbar = () => {
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
    toast.success("Xml agregado correctamente");
  };

  useHotkeys("ctrl + e", closeApp);
  useHotkeys("ctrl + o", addXML);

  return (
    <Menubar className="fixed w-full top-0 left-0 rounded-none">
      <MenubarMenu>
        <MenubarTrigger>Inicio</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={addXML}>
            Agregar XML <MenubarShortcut>Ctrl + O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={closeApp}>
            Cerrar <MenubarShortcut>Ctrl + E</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
export default Navbar;
