import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  keyField: (row: T) => string | number;
  emptyMessage?: string;
}

export default function DataTable<T>({ columns, data, keyField, emptyMessage = "No records found." }: Props<T>) {
  return (
    <div className="overflow-x-auto card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50 text-left text-gray-500">
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-3 font-semibold whitespace-nowrap">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center py-10 text-gray-400">{emptyMessage}</td>
            </tr>
          )}
          {data.map((row) => (
            <tr key={keyField(row)} className="border-b last:border-0 hover:bg-gray-50">
              {columns.map((col, i) => (
                <td key={i} className={`px-4 py-3 whitespace-nowrap ${col.className || ""}`}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
