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
import { useXmlData } from "@/hooks/use-xml-data";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { addXML } = useXmlData();
  const navigate = useNavigate();

  const navigateToHome = () => navigate("/");

  const saveTranslate = () => {
    console.log("save XML");
  };

  useHotkeys("ctrl + e", closeApp);
  useHotkeys("ctrl + o", addXML);
  useHotkeys("ctrl + s", saveTranslate);

  return (
    <Menubar className="fixed w-full top-0 left-0 rounded-none">
      <MenubarMenu>
        <MenubarTrigger>Inicio</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={navigateToHome}>
            Ir a la página principal
          </MenubarItem>
          <MenubarItem onClick={addXML}>
            Agregar XML <MenubarShortcut>Ctrl + O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled onClick={() => {}}>
            Salvar Traducción <MenubarShortcut>Ctrl + S</MenubarShortcut>
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
