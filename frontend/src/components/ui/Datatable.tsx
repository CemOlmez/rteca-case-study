type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function DataTable<T>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-100  text-left text-gray-600 border-b">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="py-3 px-4 font-semibold whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-3 px-4 text-gray-500">
                  {col.render
                    ? col.render(row)
                    : col.accessor
                    ? String(row[col.accessor])
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
