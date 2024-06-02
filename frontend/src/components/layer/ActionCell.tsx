import { XmlData } from "@/models/xml-data";
import { CellContext } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useXmlData } from "@/hooks/use-xml-data";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export const ActionCell = ({ row }: CellContext<XmlData, unknown>) => {
  const currentXmlData = row.original;

  const { deleteOneXmlData, downloadXml } = useXmlData();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Traducir</DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadXml(currentXmlData.id, "en")}>
          Descargar Xml en ingles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadXml(currentXmlData.id, "es")}>
          Descargar Xml en español
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger className="text-left text-sm w-full bg-white hover:border-transparent hover:bg-[#F1F5F9] focus:outline-none px-2 py-1 text-red-600 rounded">
            Eliminar
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Deseas eliminar esta traducción?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteOneXmlData(currentXmlData.id)}
              >
                Si
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ActionCell;
