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
import { Button } from "../ui/button";
import SortButton from "../layer/SortButton";

const columns: ColumnDef<XmlData>[] = [
  {
    accessorKey: "name",
    header: () => <SortButton name="Nombre" field="name" />,
  },
  {
    accessorKey: "traductionPercent",
    header: () => (
      <SortButton name="Porciento de traducción" field="traductionPercent" />
    ),
    cell: ({ row }) => row.getValue("traductionPercent") + "%",
  },
  {
    accessorKey: "createdAt",
    header: () => <SortButton name="Fecha de creación" field="createdAt" />,
  },
  {
    accessorKey: "updatedAt",
    header: () => (
      <SortButton name="Fecha de actualización" field="updatedAt" />
    ),
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
  const {
    xmlData,
    downloadXml,
    deleteOneXmlData,
    totalPage,
    page,
    isEndPage,
    isInitialPage,
    nextPage,
    prevPage,
  } = useXmlData({
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
    <div>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={isInitialPage}
        >
          Previous
        </Button>
        <p>
          {page} - {totalPage}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={isEndPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default MainPage;
