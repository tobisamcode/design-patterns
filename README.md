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


## 2 - Controlled Components

In React, Controlled Components are those in which form’s data is handled by the component’s state. It takes its current value through props and makes changes through callbacks like onClick, onChange, etc. A parent component manages its own state and passes the new values as props to the controlled component.
```js
import React, { useEffect, useState } from "react";

export default function ControlledForm() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, age);
  };

  useEffect(() => {
    console.log(name.length);

    if (name.length < 1) {
      setError(`name cannot be empty`);
    } else {
      setError("");
    }
  }, [name]);

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        name="age"
        value={age}
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />

      <button>Submit</button>
    </form>
  );
}

```

When to Use Controlled Components?

- When you need real-time updates (e.g., validation, formatting)
- When the input value depends on other state variables
- When handling dynamic forms
- When integrating with React state management (Redux, Context API, etc.)


For simple cases where React doesn't need to control the input, uncontrolled components (using ref) might be more efficient. 🚀







