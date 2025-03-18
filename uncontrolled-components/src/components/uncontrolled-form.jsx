import React from "react";

export const UncontrolledForm = () => {
  const nameInputRef = React.createRef();
  const ageInputRef = React.createRef();

  const SubmitForm = (e) => {
    console.log(nameInputRef.current.value);
    console.log(ageInputRef.current.value);

    e.preventDefault();
  };

  return (
    <form onSubmit={SubmitForm}>
      <input name="name" type="text" placeholder="Name" ref={nameInputRef} />
      <input name="age" type="number" placeholder="Age" ref={ageInputRef} />
      <input type="submit" value="Submit" />
    </form>
  );
};
