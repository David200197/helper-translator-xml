//https://ui.shadcn.com/docs/components/data-table

import { useXmlData } from "@/hooks/use-xml-data";
import { XmlData } from "@/models/xml-data";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionCell from "../layer/ActionCell";

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
    cell: ActionCell,
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
