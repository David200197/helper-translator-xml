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
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const columns: ColumnDef<XmlData>[] = [
  {
    accessorKey: "name",
    header: () => <SortButton name="Nombre" field="name" />,
    meta: { name: "Nombre", field: "name" },
  },
  {
    accessorKey: "traductionPercent",
    header: () => (
      <SortButton name="Porciento de traducción" field="traductionPercent" />
    ),
    cell: ({ row }) => row.getValue("traductionPercent") + "%",
    meta: { name: "Porciento de traducción", field: "traductionPercent" },
  },
  {
    accessorKey: "createdAt",
    header: () => <SortButton name="Fecha de creación" field="createdAt" />,
    meta: { name: "Fecha de creación", field: "createdAt" },
  },
  {
    accessorKey: "updatedAt",
    header: () => (
      <SortButton name="Fecha de actualización" field="updatedAt" />
    ),
    meta: { name: "Fecha de actualización", field: "updatedAt" },
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
    setFilter,
    filter,
    setFilterBy,
    getAllXmlData,
    sort,
    sortBy,
    filterBy,
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por..."
          value={filter}
          onChange={async (event) => {
            const currentValue = event.target.value;
            setFilter(currentValue);
            await getAllXmlData(page, sortBy, sort, currentValue, filterBy);
          }}
          className="max-w-sm mr-2"
        />
        <Select
          defaultValue={(columns[0].meta as Record<string, string>).field}
          onValueChange={(value) => setFilterBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nombre</SelectItem>
            <SelectItem value="traductionPercent">
              Porciento de traducción
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
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
