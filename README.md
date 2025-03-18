# React Design Patterns

🚀 React Design Patterns is a GitHub repository that explores best practices and reusable patterns for building scalable, maintainable, and efficient React applications. It covers essential patterns like Higher-Order Components (HOCs), Render Props, Compound Components, Custom Hooks, and more. Ideal for developers looking to improve their React architecture and write cleaner, more modular code.

## 1 -  Uncontrolled Components
An uncontrolled component in React is a form input element that manages its own state rather than relying on React state. This means that React does not control the value of the input field; instead, the DOM itself handles it.
```js
import { useRef } from "react";

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Entered value: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;

```

When to Use Uncontrolled Components?

- When integrating with third-party libraries that manipulate the DOM
- When you don’t need real-time control of input values
- When working with simple forms that don’t require state synchronization
- 
For more complex forms that need validation, default values, or conditional rendering, controlled components (using useState) are usually preferred.
