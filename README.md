# React Design Patterns

🚀 React Design Patterns is a GitHub repository that explores best practices and reusable patterns for building scalable, maintainable, and efficient React applications. It covers essential patterns like Higher-Order Components (HOCs), Render Props, Compound Components, Custom Hooks, and more. Ideal for developers looking to improve their React architecture and write cleaner, more modular code.

## 1 - Uncontrolled Components

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
- For more complex forms that need validation, default values, or conditional rendering, controlled components (using useState) are usually preferred.

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

## 3 - Higher Order Components (HOCs)

in React, Higher-Order Components (HOCs) are a pattern used for reusing component logic. A HOC is a function that takes a component as an argument and returns a new enhanced component.

Example 👇

This is an example of a Higher-Order Component (HOC) that enhances a wrapped component with fetching, updating, and resetting resource data from an API

`include-updatable-resources.jsx`

```js
import axios from "axios";
import { useEffect, useState } from "react";

const toCapitalCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const includeUpdatableResource = (
  Component,
  resourceUrl,
  resourceName
) => {
  return (props) => {
    const [initialResource, setInitialResource] = useState(null);
    const [resource, setResource] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(resourceUrl);
        const data = response.data;
        setInitialResource(data);
        setResource(data);
      })();
    }, []);

    const onChange = (updates) => {
      setResource({ ...resource, ...updates });
    };

    const onPost = async () => {
      const response = await axios.post(resourceUrl, {
        [resourceName]: resource,
      });
      setInitialResource(response.data);
      setResource(response.data);
    };

    const onReset = () => {
      setResource(initialResource);
    };

    const resourceProps = {
      [resourceName]: resource,
      [`onChange${toCapitalCase(resourceName)}`]: onChange,
      [`onPost${toCapitalCase(resourceName)}`]: onPost,
      [`onReset${toCapitalCase(resourceName)}`]: onReset,
    };

    return <Component {...props} {...resourceProps} />;
  };
};
```

usage 👇

`user-form.jsx`

```js
import { includeUpdatableResource } from "./include-updatable-resource";

export const UserInfoForm = includeUpdatableResource(
  ({ user, onChangeUser, onPostUser, onResetUser }) => {
    const { name, age, country } = user || {};

    return user ? (
      <>
        <div className="">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => onChangeUser({ name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => onChangeUser({ age: Number(e.target.value) })}
            />
          </div>

          <button onClick={onResetUser}>Reset</button>
          <button onClick={onPostUser}>Save</button>
        </div>
      </>
    ) : (
      <h3>Loading...</h3>
    );
  },
  "/users/2",
  "user"
);
```

#### 🔥 Why Use This HOC?

- ✅ Encapsulation of Data Fetching Logic – No need to write fetching logic in every component.
- ✅ Reusability – Can be used for any resource (e.g., posts, comments).
- ✅ Enhances Components Dynamically – Without modifying them directly.

## 4 - Custom Hooks in React

## What Are Custom Hooks?

Custom hooks in React are **reusable functions** that encapsulate **stateful logic** and can be shared across multiple components. They allow you to extract common logic from components and reuse it, making your code more readable and maintainable.

A **custom hook** is simply a **JavaScript function** that follows the **React hook naming convention**, meaning it **must start with** `use`, like `useCustomHook()`. It can use built-in hooks like `useState`, `useEffect`, etc.

---

## Main Goal of Custom Hooks

The **primary goal** of custom hooks is to **encapsulate and reuse complex logic** across multiple components. This helps in:

✅ **Code Reusability** → Avoid repeating the same logic in multiple components.  
✅ **Separation of Concerns** → Keep UI components clean by moving logic to hooks.  
✅ **Better Readability & Maintainability** → Easier to understand and manage.  
✅ **Avoiding Component Bloat** → Components remain focused on rendering, not handling logic.  
✅ **Easy Testing** → Custom hooks can be tested independently.

---

## Example: Custom Hook (`useFetch`) for Fetching Data

Instead of writing API fetching logic in multiple components, you can extract it into a **custom hook**.

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

---

## How to Use `useFetch` Hook in a Component

```javascript
import React from "react";
import useFetch from "./useFetch";

function UsersList() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UsersList;
```

---

## When Should You Use Custom Hooks?

Use custom hooks when:

- You need to **reuse logic** across multiple components.
- Your **component is getting too complex** with state and effects.
- You want to **abstract API calls, authentication logic, form handling**, etc.

---

## Summary

🔹 **Custom hooks** extract and reuse logic across multiple components.  
🔹 They **must start with "use"** and can use other hooks inside.  
🔹 Help with **reusability, separation of concerns, and maintainability**.  
🔹 Example: `useFetch()` for API requests, `useLocalStorage()` for storage, `useDarkMode()` for themes, etc.

---

## 5 - Recursive Components in React

This document explains how recursive components work in React and provides an example of a recursive component used to display nested comments.

## What is a Recursive Component?

A **recursive component** is a React component that calls itself until a base condition is met. This is useful for handling tree-like structures such as:

- Nested comments
- File directories
- Menus with submenus

## Example: Recursive Component for Nested Comments

### **Step 1: Define Recursive Data Structure**

```javascript
const comments = [
  {
    id: 1,
    text: "This is a comment",
    replies: [
      {
        id: 2,
        text: "This is a nested reply",
        replies: [{ id: 3, text: "A deeper nested reply", replies: [] }],
      },
    ],
  },
];
```

Each comment has a `replies` field, which contains an array of more comments.

### **Step 2: Create a Recursive Component**

```javascript
const Comment = ({ comment }) => {
  return (
    <div
      style={{
        marginLeft: "20px",
        borderLeft: "1px solid gray",
        paddingLeft: "10px",
      }}
    >
      <p>{comment.text}</p>
      {comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};
```

### **Step 3: Render the Recursive Component**

```javascript
const CommentSection = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

// Usage:
export default function App() {
  return <CommentSection comments={comments} />;
}
```

## How Recursion Works in This Component

1. **Base Case:** If a comment has no `replies`, the recursion stops.
2. **Recursive Case:** If a comment has replies, the `<Comment>` component calls itself.
3. Each level of recursion **adds indentation**, showing a nested hierarchy.

## Example Output

```
This is a comment
  ├── This is a nested reply
        ├── A deeper nested reply
```

Each recursive `<Comment>` component **renders itself inside itself** for replies.

## When to Use Recursive Components

✅ When dealing with **nested data** (e.g., JSON structures, tree-like lists).
✅ When components have **self-similar** behavior at different levels.
✅ When a **fixed iteration won’t work** (deeply nested structures).

## When NOT to Use Recursion

❌ If the data is **not deeply nested**, `.map()` might be enough.
❌ If recursion causes **too many re-renders**, impacting performance.
❌ If **state updates need tracking** (can become complex).

## License

This project is licensed under the MIT License.

## 6 - Composition Components in React

This document explains how **composition** works in React and provides an example of using composition to structure components efficiently.

## What is Component Composition?

Component composition is the practice of **combining smaller components** to build a larger, reusable UI. Instead of using inheritance, React encourages composition to keep components flexible and maintainable.

### **Why Use Composition?**

- **Encapsulation** → Each component handles its own logic.
- **Reusability** → Components can be reused in different contexts.
- **Flexibility** → Easily swap or extend functionalities without modifying existing code.

---

## **Example: Composition for a Layout System**

### **Step 1: Define Small, Reusable Components**

```javascript
const Header = () => (
  <header>
    <h1>My App</h1>
  </header>
);
const Footer = () => (
  <footer>
    <p>© 2024 My App</p>
  </footer>
);
```

### **Step 2: Create a Layout Component Using Composition**

```javascript
const Layout = ({ children }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px" }}>
      {children} {/* Allows any component to be inserted dynamically */}
    </div>
  );
};
```

### **Step 3: Use Composition to Build a Page**

```javascript
const HomePage = () => {
  return (
    <Layout>
      <Header />
      <main>
        <p>Welcome to my app!</p>
      </main>
      <Footer />
    </Layout>
  );
};
```

### **How Composition Works in This Example**

1. **`Layout` acts as a wrapper component**, controlling the overall structure.
2. The `{children}` prop **allows dynamic content**, making the layout reusable.
3. **`Header`, `main`, and `Footer`** are injected inside the `Layout`.

---

## **Using Composition with Props**

Composition also allows passing components as props to modify behavior dynamically.

```javascript
const Card = ({ title, content, FooterComponent }) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
      <h2>{title}</h2>
      <p>{content}</p>
      {FooterComponent && <FooterComponent />}{" "}
      {/* Dynamically insert a component */}
    </div>
  );
};
```

### **Using the Card Component with Different Footers**

```javascript
const SimpleFooter = () => <p>Simple Footer</p>;
const DetailedFooter = () => <p>More details here...</p>;

const App = () => (
  <div>
    <Card
      title="Card 1"
      content="This is a basic card."
      FooterComponent={SimpleFooter}
    />
    <Card
      title="Card 2"
      content="This is another card."
      FooterComponent={DetailedFooter}
    />
  </div>
);
```

---

## **When to Use Composition?**

✅ When **structuring layouts** (e.g., headers, sidebars, footers).  
✅ When **passing dynamic UI** as props (e.g., modals, cards, and lists).  
✅ When creating **highly reusable components**.

## **When NOT to Use Composition?**

❌ If a component is **simple and isolated**, no need for composition.  
❌ If passing too many components **makes it complex to manage**.

---

## 7 - Partial Components in React

## **What are Partial Components?**

Partial components are **smaller subcomponents** within a larger component that **handle a specific part of the UI**. This helps in breaking down complex components into smaller, reusable pieces.

## **Why Use Partial Components?**

- ✅ **Encapsulation** → Each component handles a specific UI section.
- ✅ **Reusability** → Components can be reused in different contexts.
- ✅ **Scalability** → UI updates only require changes in specific components.

---

## **Example: Using Partial Components in a Card Component**

### **Step 1: Define a Partial Components**

```js
export const partialComponent = (Component, partialProps) => {
  return (props) => {
    return <Component {...props} {...partialProps} />;
  };
};

export const Button = ({ size, text, color, ...props }) => {
  return (
    <button
      style={{
        fontSize: size === "small" ? "10px" : "32px",
        backgroundColor: color,
      }}
    >
      {text}
    </button>
  );
};
```

### **Step 2: Combine Partial Components in a Parent Component**

```javascript
export const RedButton = partialComponent(Button, { color: "red" });
export const SmallRedButton = partialComponent(RedButton, { size: "small" });
export const SmallGreenButton = partialComponent(Button, {
  color: "green",
  size: "small",
});
```

### **Step 3: Use the Card Component**

```javascript
const App = () => {
  return (
    <div>
      <SmallRedButton text="I am a small red button" />
    </div>
  );
};
```

---

## **How Partial Components Improve Composition Flow**

1. **Encapsulation** → Each component handles only one part of the UI (`CardHeader`, `CardBody`, `CardFooter`).
2. **Reusability** → The same partial components can be reused in different contexts.
3. **Scalability** → If the UI changes, we only need to update individual partial components.

---

## **When to Use Partial Components?**

✅ When a component **has distinct sections** (e.g., headers, footers, lists).  
✅ When **multiple components share a similar structure**.  
✅ When you want to **improve readability** in large components.

❌ **Avoid Over-Fracturing** → If a component is too simple, breaking it down may add unnecessary complexity.

---

### 🚀 **Happy Coding!**
