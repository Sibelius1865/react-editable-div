# React Editable Div

A lightweight and customizable React component for creating editable `div` elements, with support for placeholder text, default values, and parsing functions.


## Features

- Easily create content-editable `div` elements in React.
- Fully customizable via props.
- Supports placeholder text and default values.
- Integration with custom parsers for text processing.
- Lightweight with minimal dependencies.


## Installation

Install the package using npm or yarn:

```bash
npm install react-editable-div
```

or

```bash
yarn add react-editable-div
```


## Usage

Here is an example of how to use the `EditableDiv` component in your project:

### Basic Example

```tsx
import React from "react";
import { EditableDiv } from "react-editable-div";

const App = () => {
  return (
    <EditableDiv
      divLabel="example"
      placeholder="Type something..."
      defaultValue="Hello, world!"
    />
  );
};

export default App;
```

### Advanced Example with Parsing

```tsx
import React from "react";
import { EditableDiv, EditableDivProvider } from "react-editable-div";

const App = () => {
  const customParser = (text: string) => text.trim().toUpperCase();

  return (
    <EditableDivProvider>
      <EditableDiv
        divLabel="advanced-example"
        placeholder="Start typing..."
        parser={customParser}
      />
    </EditableDivProvider>
  );
};

export default App;
```


## Props

| Prop             | Type                              | Default         | Description                                                                 |
| ----------------- | --------------------------------- | --------------- | --------------------------------------------------------------------------- |
| `divLabel`        | `string` or `string[]`           | **Required**    | A unique label or array of labels for the editable `div` element.           |
| `children`        | `ReactNode`                      | `undefined`     | The content to display inside the editable `div`.                           |
| `isEditing`       | `boolean`                        | `true`          | Whether the `div` is editable.                                              |
| `placeholder`     | `string`                         | `""`            | Placeholder text displayed when the `div` is empty.                         |
| `defaultValue`    | `string`                         | `""`            | Default text content inside the editable `div`.                             |
| `parser`          | `(text: string) => any`          | `undefined`     | A custom function for parsing the text content before submitting or saving. |
| `...props`        | `HTMLProps<HTMLDivElement>`      | `undefined`     | Additional props for the underlying `div` element.                          |


## Styling

The component includes a default CSS file (style.css) for basic styling. To customize the styles, you can override the default classes:

### Default CSS Class

- `.editable-div`

### Example

```css
/* style.css */
.editable-div {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  min-height: 40px;
}
```


## Development

To set up the project locally for development:

1. Clone the repository:
   
```bash
git clone https://github.com/Sibelius1865/react-editable-div.git
cd react-editable-div
```

2. Install dependencies:
   
```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build the project:

```bash
npm run build
```


## Contributing

Contributions are most welcome! Kindly open an issue or submit a pull request for any features, bug fixes, or improvements.


## Licence

This project is licensed under the MIT License. See the LICENCE file for details.