// src/TableHeader.tsx

import React from "react";

interface TableHeaderProps<T> {
  allKeys: Array<keyof T>;
}

function TableHeader<T>({ allKeys }: TableHeaderProps<T>): JSX.Element {
  return (
    <thead className="bg-gray-200 border-gray-300 sticky top-0 z-10">
      <tr>
        {allKeys.map((header, index) => (
          <th
            key={index}
            className="py-2 px-4 font-medium text-left text-gray-600 uppercase tracking-wider bg-gray-200"
          >
            {String(header)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default React.memo(TableHeader) as typeof TableHeader;
