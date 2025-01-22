# React Input Div

A lightweight and customisable React component for creating editable `div` elements, with support for placeholder text, default values, parsing functions, and the ability to manage multiple editable `div` elements simultaneously.


## Features

- Easily create content-editable `div` elements in React.
- Fully customizable via props.
- Supports placeholder text and default values.
- Integration with custom parsers for text processing.
- Retrieve content from multiple editable `div` elements at once.
- Lightweight with minimal dependencies.


## Installation

Install the package using npm or yarn:

```bash
npm install react-input-div
# or
yarn add react-input-div
```


## Usage

Here is an example of how to use the `InputDiv` component in your project:

### Basic Example

```tsx
import React from "react";
import { InputDiv } from "react-input-div";

const App = () => {
  return (
    <InputDiv
      inputKey="example"
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
import { InputDiv, InputDivProvider } from "react-input-div";

const App = () => {
  const customParser = (text: string) => text.trim().toUpperCase();

  return (
    <InputDivProvider>
      <InputDiv
        inputKey="advanced-example"
        placeholder="Start typing..."
        parser={customParser}
      />
    </InputDivProvider>
  );
};

export default App;
```


## Props

| Prop             | Type                              | Default         | Description                                                                 |
| ----------------- | --------------------------------- | --------------- | --------------------------------------------------------------------------- |
| `inputKey`        | `string` or `string[]`           | **Required**    | A unique label or array of labels for the editable `div` element.           |
| `children`        | `ReactNode`                      | `undefined`     | The content to display inside the editable `div`.                           |
| `isEditing`       | `boolean`                        | `true`          | Whether the `div` is editable.                                              |
| `placeholder`     | `string`                         | `""`            | Placeholder text displayed when the `div` is empty.                         |
| `defaultValue`    | `string`                         | `""`            | Default text content inside the editable `div`.                             |
| `parser`          | `(text: string) => any`          | `undefined`     | A custom function for parsing the text content before submitting or saving. |
| `...props`        | `HTMLProps<HTMLDivElement>`      | `undefined`     | Additional props for the underlying `div` element.                          |


## Styling

The component includes a default CSS file (style.css) for basic styling. To customize the styles, you can override the default classes:

### Default CSS Class

- `.input-div`

### Example

```css
/* style.css */
.input-div {
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
git clone https://github.com/Sibelius1865/react-input-div.git
cd react-input-div
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