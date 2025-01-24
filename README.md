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
import { InputDivProvider, InputDiv, useInputDiv } from "react-input-div";

const Component = () => {
  // useInputDiv can only be used within components that are wrapped by InputDivProvider.
  const getValues = useInputDiv();

  const handleClick = () => {
    const values = getValues("user");
    console.log(values);
    // Result of calling getValues("user"):
    // {
    //   id: "123456789",
    //   name: {
    //     first: "John",
    //     last: "Doe",
    //   },
    //   address: {
    //     street: "123 Main St",
    //     city: "Springfield",
    //     country: {
    //       name: "United States",
    //       code: "US",
    //     },
    //   },
    //   contact: {
    //     phone: {
    //       home: "123-456-7890",
    //       work: "987-654-3210",
    //     },
    //     email: "john.doe@example.com",
    //   },
    // };
  }

  return (
    <div className="user-profile">
      <header>
        <h1>User Information</h1>
        <InputDiv label="user" inputKey="id">123456789</InputDiv>
      </header>
      <section>
        <h2>Name</h2>
        <p>
          <InputDiv label="user" inputKey={["name", "first"]}>Unko</InputDiv>
          <InputDiv label="user" inputKey={["name", "last"]}>Buriburi</InputDiv>
        </p>
      </section>
      <section>
        <h2>Address</h2>
        <div>
          <span>Street:</span> 
          <InputDiv label="user" inputKey={["address", "street"]}>123 Hanakuso St</InputDiv>
        </div>
        <div>
          <span>City:</span> 
          <InputDiv label="user" inputKey={["address", "city"]}>Tokyo</InputDiv>
        </div>
        <div>
          <span>Country:</span>
          <ul>
            <li>
              Name: <InputDiv label="user" inputKey={["address", "country", "name"]}>Japan</InputDiv>
            </li>
            <li>
              Code: <InputDiv label="user" inputKey={["address", "country", "code"]}>JP</InputDiv>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2>Contact</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home Phone</td>
              <td><InputDiv label="user" inputKey={["contact", "phone", "home"]}>123-456-7890</InputDiv></td>
            </tr>
            <tr>
              <td>Work Phone</td>
              <td><InputDiv label="user" inputKey={["contact", "phone", "work"]}>987-654-3210</InputDiv></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><InputDiv label="user" inputKey={["contact", "email"]}>unko.buriburi@example.com</InputDiv></td>
            </tr>
          </tbody>
        </table>
      </section>
      <button onClick={handleClick}>Get Values!</button>
    </div>
  );
}

const App = () => {
  return (
    <InputDivProvider>
      <Component />
    </InputDivProvider>
  );
};

export default App;
```

When the `InputDivProvider` is given a label attribute, any `InputDiv` components contained within it can omit their own label attribute. In such cases, the `InputDivProvider`’s label value will be automatically applied to all nested `InputDiv` components.

```tsx
const App = () => {
  return (
    <InputDivProvider label="user">
      <Component />
    </InputDivProvider>
  );
};
```

### Advanced Example of InputDiv

```tsx
const [isEditing, setIsEditing] = useState<boolean>(false);

const customParser = (input: string): string[] => {
  return input.split(',').map((item) => item.trim());
};

// You can also use standard HTML attributes for a div. 
<InputDiv
  className="keywords bg-white rounded-lg p-6" 
  inputKey="keywords"
  isEditing={isEditing}
  placeholder="Please enter the keywords"
  parser={customParser}
  defaultValue={defaultValue} {/* Default value can be set here or inside InputDiv */}
>
  {defaultValue} {/* Default value can be set here or inside InputDiv */}
</InputDiv>
```


## Props

> **Note:** The `label` must be set either in the `InputDivProvider` or in the `InputDiv`. It is required in one of these two components.

### `InputDivProvider`
| Prop              | Type                             | Default         | Description                                                                                        |
| ----------------- | -------------------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `label`           | `string`                         | **N/A**         | If no `label` is provided here, the `label` values from each `InputDiv` will be applied.           |
| `isEditing`       | `boolean`                        | `false`         | Set the `isEditing` state for all `InputDiv` components contained within the `InputDivProvider`.   |


### `InputDiv`

| Prop              | Type                             | Default         | Description                                                                                        |
| ----------------- | -------------------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `label`           | `string`                         | **N/A**         | If a `label` is provided by the `InputDivProvider`, it will be applied here.                       |
| `inputKey`        | `string` or `string[]`           | **Required**    | A unique label or array of keys for the editable `div` element.                                    |
| `children`        | `ReactNode`                      | `undefined`     | The content to display inside the editable `div`.                                                  |
| `isEditing`       | `boolean`                        | `true`          | Whether the `div` is editable.                                                                     |
| `placeholder`     | `string`                         | `""`            | Placeholder text displayed when the `div` is empty.                                                | 
| `defaultValue`    | `string`                         | `""`            | Default text content inside the editable `div`.                                                    |
| `parser`          | `(text: string) => any`          | `undefined`     | A custom function for parsing the text content before submitting or saving.                        |
| `...props`        | `HTMLProps<HTMLDivElement>`      | `undefined`     | Additional props for the underlying `div` element.                                                 |


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