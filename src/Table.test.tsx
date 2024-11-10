import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Table from "./Table"; // Adjust the path to your Table component
import '@testing-library/jest-dom';
describe("Table Component", () => {
  it("renders without crashing when list is empty", () => {
    render(<Table list={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders headers based on list keys if headers prop is not provided", () => {
    const data = [{ name: "John", age: 36 }];
    render(<Table list={data} />);
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("age")).toBeInTheDocument();
  });

  it("renders headers based on list keys if headers prop is not provided", () => {
    const data = [{ name: "John", age: 36 }];
    render(<Table list={data} />);
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("age")).toBeInTheDocument();
  });

  it("renders only specified headers when headers are different  prop is not provided", () => {
    const data = [
      { name: "Johnn", age: 36 },
      { name: "Jann", age: 25, location: "Erlangen" },
    ];
    render(<Table list={data} />);
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("age")).toBeInTheDocument();
    expect(screen.getByText("location")).toBeInTheDocument();
  });

  // 4. Renders rows of data correctly
  it("renders rows with data values correctly", () => {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    render(<Table list={data} />);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  // 5. Renders '-' for null or undefined values
  it("renders '-' for null or undefined values", () => {
    const data = [
      { name: "John", age: null },
      { name: "Jane", age: undefined },
    ];
    render(<Table list={data} />);
    expect(screen.getAllByText("-")).toHaveLength(2); // "-" should appear twice
  });

  it("renders React elements in table cells without conversion", () => {
    const data = [{ name: <strong>John</strong>, age: 30 }];
    render(<Table list={data} />);
    const nameElement = screen.getByText("John");
    expect(nameElement.tagName).toBe("STRONG");
  });

  it("generates unique headers from list keys if headers are not provided", () => {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    render(<Table list={data} />);
    const headers = screen.getAllByRole("columnheader");
    const headerTexts = new Set(headers.map((header) => header.textContent));
    const exceededHeaderSet = new Set(["name", "age"]);
    expect(new Set(headerTexts)).toEqual(exceededHeaderSet); 

  });

  it("handles mixed data types (string, number, objects, React elements) correctly", () => {
    const data = [
      { name: "Alice", age: 28, details: { city: "New York" } },
      { name: <em>Bob</em>, age: null, income: 50000 },
    ];
    render(
      <Table list={data} headers={["name", "age", "details", "income"]} />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob").tagName).toBe("EM");
    const dashElements = screen.getAllByText("-");
    expect(dashElements).toHaveLength(3); // Expecting three placeholders
    expect(screen.getByText("50000")).toBeInTheDocument();
    expect(screen.getByText('{"city":"New York"}')).toBeInTheDocument();
  });

  it("applies overflow scrolling when rows exceed the specified limit", () => {
    const data = Array.from({ length: 15 }, (_, i) => ({
      name: `Person ${i}`,
      age: i,
    }));
    render(<Table list={data} rows={10} />);
    const tableContainer = screen.getByRole("table").parentElement;

    expect(tableContainer).toHaveClass("overflow-y-auto");
  });

  it("dont apply overflow scrolling when rows less than specified limit", () => {
    const data = Array.from({ length: 15 }, (_, i) => ({
      name: `Person ${i}`,
      age: i,
    }));
    render(<Table list={data} rows={20} />);
    const tableContainer = screen.getByRole("table").parentElement;

    expect(tableContainer).toHaveClass("overflow-y-hidden");
  });

  it("handles very large datasets efficiently", () => {
    const largeData = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Person ${i}`,
      age: Math.floor(Math.random() * 100),
    }));
    render(<Table list={largeData} rows={50} />);

    // Check if the table is rendered
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Check if scrolling is enabled
    const tableContainer = screen.getByRole("table").parentElement;
    expect(tableContainer).toHaveClass("overflow-y-auto");

    // Check if all data is  rendered (this might take some time)
    expect(screen.getAllByRole("row").length).toBe(10001); // 10000 data rows + 1 header row

    // Optionally, you can check the performance
    // This is a basic check and might need adjustment based on the specific performance requirements
    const start = performance.now();
    render(<Table list={largeData} rows={50} />);
    const end = performance.now();
    expect(end - start).toBeLessThan(1000); // Assuming rendering should take less than 1 second
  });
  
  it("should calculate and set the correct container height based on row height", async () => {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    const rows = 2;
    const mockRowHeight = 36;
    const expectedHeight = mockRowHeight * (rows + 1); // +1 for the header row

    // Save the original clientHeight
    const originalClientHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "clientHeight"
    );

    // Mock clientHeight before rendering
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: mockRowHeight,
    });

    const { container } = render(<Table list={data} rows={rows} />);

    // Wait for the effect to update the container height
    await waitFor(
      () => {
        const tableContainer = container.firstChild as HTMLElement;
        expect(tableContainer.style.maxHeight).toBe(`${expectedHeight}px`);
      },
      { timeout: 2000 }
    );

    // Restore the original clientHeight after the test
    if (originalClientHeight) {
      Object.defineProperty(
        HTMLElement.prototype,
        "clientHeight",
        originalClientHeight
      );
    }
  });
});
