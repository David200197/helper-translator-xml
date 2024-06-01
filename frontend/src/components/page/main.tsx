//https://ui.shadcn.com/docs/components/data-table

import { useXmlData } from "@/hooks/use-xml-data";
import { XmlData } from "@/interfaces/xml-data";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const columns: ColumnDef<XmlData>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "traductionPercent",
    header: "Porciento de traducción",
    cell: ({ row }) => row.getValue("traductionPercent") + "%",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
  },
  {
    accessorKey: "updatedAt",
    header: "Fecha de actualización",
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const xmlData = row.original;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deleteOneXmlData = (table.options.meta as any).deleteOneXmlData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const downloadXml = (table.options.meta as any).downloadXml;

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
            <DropdownMenuItem onClick={() => downloadXml(xmlData.id, "en")}>
              Descargar Xml en ingles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadXml(xmlData.id, "es")}>
              Descargar Xml en español
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteOneXmlData(xmlData.id)}
              className="text-red-600"
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/* interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
} */

const MainPage = () => {
  const { xmlData, downloadXml, deleteOneXmlData } = useXmlData({
    autoLoad: true,
  });

  const table = useReactTable({
    data: xmlData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      downloadXml,
      deleteOneXmlData,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default MainPage;
