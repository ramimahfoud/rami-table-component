// src/Table.tsx

import React, { useRef, useState, useMemo, useLayoutEffect } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { unique } from "./utils";

export interface TableProps<T extends Record<string, unknown>> {
  list: T[];
  headers?: Array<keyof T>;
  rows?: number;
}

function Table<T extends Record<string, unknown>>({
  list,
  headers,
  rows = 10,
}: TableProps<T>) {
  const estimatedRowHeight = 36;
  const [containerHeight, setContainerHeight] = useState<number>(
    (rows + 1) * estimatedRowHeight
  );

  // Create a ref to hold the row element to calculate the row height dynamically.
  // We use layout effect to ensure the row height is calculated after the component renders.
  // This is necessary because we need to know the row height to set the container height correctly.
  // We also check if the rowRef is currently the first row to set the rowRef correctly.
  const rowRef = useRef<HTMLTableRowElement>(null);


  // Get all keys from the list or headers.
  // We use useMemo to memoize the result to avoid unnecessary re-calculations.
  // We also check if headers are provided and if they are different from the list keys.
  // If they are different, we update the allKeys state. This ensures that the table header will update correctly when the headers change.
  const allKeys = useMemo(() => {
    return (
      headers || unique(list.flatMap((item) => Object.keys(item)))
    ) as Array<keyof T>;
  }, [headers, list]);


  // Check if the list is larger than the specified number of rows and provide a scrollable container if needed.
  const needsScroll = list.length > rows;


  // Set the container height dynamically based on the number of rows and the estimated row height.
  useLayoutEffect(() => {
    if (rowRef.current && list.length > 0) {
      const rowHeight = rowRef.current.clientHeight;
      const dynamicHeight = rowHeight * (rows + 1);
      setContainerHeight(dynamicHeight);
    }
  }, [rows, list]);


  // If the list is empty, return a message indicating no data available.
  if (list.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div
      className={`w-full border border-gray-300 rounded-md shadow-md ${
        needsScroll ? "overflow-y-auto" : "overflow-y-hidden"
      }`}
      style={{ maxHeight: `${containerHeight}px` }}
    >
      <table className="w-full bg-white text-sm text-gray-700 min-w-max">
        <TableHeader<T> allKeys={allKeys} />
        <tbody>
          {list.map((item, rowIndex) => (
            <TableRow<T>
              key={rowIndex}
              item={item}
              allKeys={allKeys}
              isFirstRow={rowIndex === 0}
              rowRef={rowIndex === 0 ? rowRef : undefined}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
