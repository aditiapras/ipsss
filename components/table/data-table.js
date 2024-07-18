import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DataTable({ data, columns, search, filters, headers }) {
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
  });
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center  bg-white  border-b pb-2">
        {search && (
          <input
            type="text"
            name="filter"
            id="filter"
            className="border rounded-md p-2 w-[300px] text-sm font-hankook"
            placeholder="Search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        )}

        {filters && (
          <select
            name="page"
            id="page"
            className="w-fit"
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            <option value="10">Data size</option>
            <option value="10">10</option>
            <option value="50">50</option>
          </select>
        )}
      </div>

      <Table>
        {/* <ScrollArea className="h-[550px] w-full border-t"> */}
        {headers && (
          <TableHeader className="border-t shadow-sm bg-zinc-50 sticky -top-1">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow key={index} className="">
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={index}
                    onClick={header.column.getToggleSortingHandler()}
                    className="hover:bg-zinc-200"
                  >
                    <p className="flex items-center gap-2">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      <span>
                        {
                          { asc: "▲", desc: "▼" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </span>
                    </p>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <TableRow key={index}>
              {row.getVisibleCells().map((cell, index) => (
                <TableCell key={index} className={``}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {/* </ScrollArea> */}
      </Table>
    </div>
  );
}
