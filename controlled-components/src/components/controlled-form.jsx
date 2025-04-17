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
