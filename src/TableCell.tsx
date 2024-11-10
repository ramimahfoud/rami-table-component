// src/TableCell.tsx

import React from "react";

interface TableCellProps {
  value: unknown;
}

function TableCell({ value }: TableCellProps): JSX.Element {
  let content;
  if (value !== null && value !== undefined) {
    if (React.isValidElement(value)) {
      content = value; // Render React elements directly
    } else if (typeof value === "object") {
      content = JSON.stringify(value); // Convert objects to JSON string
    } else {
      content = String(value); // Convert other types to string
    }
  } else {
    content = "-";
  }

  return <td className="py-2 px-4 text-left">{content}</td>;
}

export default TableCell;
