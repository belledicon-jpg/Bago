import type { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
}

export default function Table<T>({ columns, data, keyExtractor }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={String(column.accessorKey)}
                className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <td key={String(column.accessorKey)} className="px-4 py-3 text-gray-700">
                    {column.cell
                      ? column.cell(row)
                      : String(row[column.accessorKey] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
