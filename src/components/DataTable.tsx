import { useState } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  pageSize?: number;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchKey,
  pageSize = 5,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const filtered = data.filter((item) => {
    if (!searchKey) return true;
    const value = String(item[searchKey]).toLowerCase();
    return value.includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handleExport = () => {
    const headers = columns.map((c) => c.label).join(",");
    const rows = filtered.map((item) =>
      columns.map((c) => String(item[c.key])).join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        {searchKey && (
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(0);
            }}
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
          />
        )}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 text-sm"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left px-4 py-3 font-medium text-gray-600"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-gray-700">
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
          <p className="text-sm text-gray-500">
            Page {currentPage + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}