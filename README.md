
# Table Component

A reusable, configurable table component built with React and styled using Tailwind CSS. This component dynamically adjusts its height and supports conditional scrolling based on the number of rows provided.

## Prerequisites

To use this component, ensure your project meets the following requirements:
- **React**: This component is designed to work in a React environment.
- **Tailwind CSS**: Tailwind CSS should be set up in your project. See instructions below for adding Tailwind CSS.

## Installation

1. **Install the Table Component**

   First, add the `Table` component package to your project:

   ```bash
   npm install rami-table-ui-component
   ```

2. **Add Tailwind CSS**

   If you haven’t already, set up Tailwind CSS in your project:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   Update `tailwind.config.js` to include the `Table` component's files for Tailwind’s `content` option. This ensures unused Tailwind CSS classes are purged in production:

   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
       "./node_modules/rami-table-component/dist/**/*.{js,ts,jsx,tsx}" // Include component files
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. **Import Tailwind CSS**

   In your main CSS file (e.g., `src/index.css`), add the following Tailwind directives to load its styles:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```


## Usage

Once installed, you can use the `Table` component by importing it into your project and providing it with the necessary props.

### Example

```javascript
import React from 'react';
import Table from 'rami-table-component';

const App = () => {
  const data = [
    { name: "Rami  Mahfoud", age: 36, email: "rami@example.com", city: "Erlangen" },
    { name: "Sarah Müller", age: 30, email: "sarah@example.com", city: "Berlin" },
    // Add more data as needed
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <Table
        list={data}
        headers={["name", "age", "email", "city"]}
        rows={5} // Number of rows to display before scrolling
      />
    </div>
  );
};

export default App;
```

### Props

The `Table` component accepts the following props:

- **`list`** (required): An array of objects representing table data.
- **`headers`** (optional): An array of strings to display as table headers.
- **`rows`** (optional): A number specifying how many rows to display before the table becomes scrollable.

### Example Data

Here’s an example of the `list` data structure:

```javascript
const data = [
   { name: "John", age: 36, email: "john@example.com", city: "Milan" },
   { name: "Jana Müller", age: 30, email: "jana@example.com", city: "Berlin" },
  // More entries...
];
```

You can also include JS element in the data


```javascript
const data = [
   { name: <strong>John </strong>, age: 36, email: "john@example.com", city: "Milan" },
   { name: <strong> Sarah Müller</strong>, age: 30, email: "jana@example.com", city: "Berlin" },
  // More entries...
];
```

## Customization

The `Table` component is built using Tailwind CSS classes, making it easy to extend and override styles within your own project. Customize by applying additional classes as needed in your Tailwind setup.

## Test the component

If you want to update the component  you can test it by run 
```bash
npm run test
```
