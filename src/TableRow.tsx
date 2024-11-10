// src/TableRow.tsx

import React from "react";
import TableCell from "./TableCell";

interface TableRowProps<T> {
  item: T;
  allKeys: Array<keyof T>;
  isFirstRow: boolean;
  rowRef?: React.RefObject<HTMLTableRowElement>;
}

function TableRow<T extends Record<string, unknown>>({
  item,
  allKeys,
  isFirstRow,
  rowRef,
}: TableRowProps<T>): JSX.Element {
  return (
    <tr
      ref={isFirstRow ? rowRef : null}
      className="hover:bg-gray-100 even:bg-gray-50 last:border-none"
    >
      {allKeys.map((header, cellIndex) => (
        <TableCell key={cellIndex} value={item[header]} />
      ))}
    </tr>
  );
}

export default React.memo(TableRow) as typeof TableRow;
