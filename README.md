# React Input Div

A lightweight and customisable React component for creating editable `div` and `span` elements, with support for placeholder text, default values, parsing functions, and the ability to manage multiple editable elements simultaneously.

## Features

- Easily create content-editable `div` and `span` elements in React.
- Fully customizable via props.
- Supports placeholder text and default values.
- Integration with custom parsers for text processing.
- Retrieve content from multiple editableelements at once.
- Lightweight with minimal dependencies.

## Installation

Install the package using npm or yarn:

```bash
npm install react-input-div

# or

yarn add react-input-div
```

## Usage

Here is an example of how to use the `InputDiv` and `InputSpan` component in your project:

### Basic Example

```tsx
import { InputsScope, InputDiv, InputSpan, useInputs } from "react-input-div";

const Content = () => {
  const Component = () => {
  // When `useInputs` is inside a component wrapped by `InputsScope`
  const { getValues } = useInputs();

  const handleClick = () => {
    const values = getValues("user");
    console.log(values);
    // Result of calling getValues("user"):
    // {
    //   id: "123456789",
    //   name: {
    //     first: "Unchi",
    //     last: "Buriburi",
    //   },
    //   address: {
    //     street: "123 Hanakuso St",
    //     city: "Tokyo",
    //     country: {
    //       name: "Japan",
    //       code: "JP",
    //     },
    //   },
    //   contact: {
    //     phone: {
    //       home: "123-456-7890",
    //       work: "987-654-3210",
    //     },
    //     email: "unchi.buriburi@example.com",
    //   },
    // };
  };

  return (
    <div className="user-profile">
      <header>
        <h1>User Information</h1>
        <InputDiv label="user" inputKey="id">
          123456789
        </InputDiv>
      </header>
      <section>
        <h2>Name</h2>
        <InputDiv label="user" inputKey={["name", "first"]}>
          Unchi
        </InputDiv>
        <InputDiv label="user" inputKey={["name", "last"]}>
          Buriburi
        </InputDiv>
      </section>
      <section>
        <h2>Address</h2>
        <div>
          <span>Street:</span>
          <InputSpan label="user" inputKey={["address", "street"]}>
            123 Hanakuso St
          </InputSpan>
        </div>
        <div>
          <span>City:</span>
          <InputSpan label="user" inputKey={["address", "city"]}>
            Tokyo
          </InputSpan>
        </div>
        <div>
          <span>Country:</span>
          <ul>
            <li>
              Name:
              <InputSpan label="user" isEditing={false} inputKey={["address", "country", "name"]}>
                Japan
              </InputSpan>
            </li>
            <li>
              Code:
              <InputSpan label="user" isEditing={false} inputKey={["address", "country", "code"]}>
                JP
              </InputSpan>
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
              <td>
                <InputDiv label="user" inputKey={["contact", "phone", "home"]}>
                  123-456-7890
                </InputDiv>
              </td>
            </tr>
            <tr>
              <td>Work Phone</td>
              <td>
                <InputDiv label="user" inputKey={["contact", "phone", "work"]}>
                  987-654-3210
                </InputDiv>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <InputDiv label="user" inputKey={["contact", "email"]}>
                  unchi.buriburi@example.com
                </InputDiv>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <button onClick={handleClick}>Get Values!</button>
    </div>
  );
};

const App = () => {
  return (
    <InputsScope>
      <Content />
    </InputsScope>
  );
};

// or

const App = () => {
  return (
    // You can use it without wrapping it with `InputsScope` as well.
    <Content />
  );
};

export default App;
```

When using the `useInputs` hook in conjunction with `InputsScope`, it is essential to pass the `register` function from `useInputs` into the `InputsScope` component. This ensures that the input values are correctly registered and managed by the `InputsScope` for all nested components.

```tsx
const App = () => {
  // When useInputs is NOT inside a component wrapped by `InputsScope`
  const { getValues, register } = useInputs();

  return <InputsScope {...register}>{/* Content */}</InputsScope>;
};
```

### Property Usage

```tsx
const [isEditing, setIsEditing] = useState<boolean>(false);

const customParser = (input: string): string[] => {
  return input.split(',').map((item) => item.trim());
};

// You can also use standard HTML attributes for a div.
// The same applies to InputSpan.
<InputDiv
  className="keywords bg-white rounded-lg p-6"
  inputKey="keywords"
  isEditing={isEditing}
  isPreservingStyle={false}
  placeholder="Please enter the keywords"
  parser={customParser}
  defaultValue={defaultValue} {/* Default value can be set here or inside the component */}
>
  {defaultValue} {/* Default value can be set here or inside the component */}
</InputDiv>
```

By using `InputsScope`, there is no need to individually set `label`, `isEditing`, or `isPreservingStyle` for each `InputDiv`/`InputSpan`. These props, when specified in `InputsScope`, will be automatically passed down to all nested `InputDiv`/`InputSpan` components.

```tsx
const App = () => {
  return (
    <InputsScope label="user" isEditing={isEditing} isPreservingStyle={false}>
      <div className="user-profile">
        <header>
          <h1>User Information</h1>
          <InputDiv inputKey="id">123456789</InputDiv>
        </header>
        <section>
          <h2>Name</h2>
          <InputDiv inputKey={["name", "first"]}>Unchi</InputDiv>
          <InputDiv inputKey={["name", "last"]}>Buriburi</InputDiv>
        </section>
      </div>
      {/* ... */}
    </InputsScope>
  );
};
```

## Props

> **Note:** The `label` must be set either in the `InputsScope` or in the `InputDiv`/`InputSpan`. It is required in one of these two components.

### `InputsScope`

| Prop        | Type      | Default | Description                                                                                 |
| ----------- | --------- | ------- | ------------------------------------------------------------------------------------------- |
| `label`     | `string`  | **N/A** | If no `label` is provided here, the `label` values from each `InputDiv` will be applied.    |
| `isEditing` | `boolean` | `false` | Set the `isEditing` state for all `InputDiv` components contained within the `InputsScope`. |

### `InputDiv`/`InputSpan`

| Prop                | Type                        | Default      | Description                                                                 |
| ------------------- | --------------------------- | ------------ | --------------------------------------------------------------------------- |
| `label`             | `string`                    | **N/A**      | If a `label` is provided by the `InputsScope`, it will be applied here.     |
| `inputKey`          | `string` or `string[]`      | **Required** | A unique label or array of keys for the editable `div`/`span` element.      |
| `children`          | `ReactNode`                 | `undefined`  | The content to display inside the editable `div`/`span`.                    |
| `isEditing`         | `boolean`                   | `true`       | Whether the `div`/`span` is editable.                                       |
| `isPreservingStyle` | `boolean`                   | `false`      | Whether the `div`/`span` preserves its styling.                             |
| `placeholder`       | `string` or `number`        | `""`         | Placeholder text displayed when the `div`/`span` is empty.                  |
| `defaultValue`      | `string` or `number`        | `""`         | Default text content inside the editable `div`/`span`.                      |
| `parser`            | `(text: string) => any`     | `undefined`  | A custom function for parsing the text content before submitting or saving. |
| `...props`          | `HTMLProps<HTMLDivElement>` | `undefined`  | Additional props for the underlying `div`/`span` element.                   |

## Styling

The component includes a default CSS file (style.css) for basic styling. To customize the styles, you can override the default classes:

### Default CSS Class

- `.input-element`

### Example

```css
/* style.css */
.input-element {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  min-height: 40px;
}

.input-element:empty:before {
  content: attr(placeholder);
  color: #aaaaaa;
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
