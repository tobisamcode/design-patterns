import React from "react";
import { UserInfo } from "./components/user-info";

function App() {
  return (
    <>
      <UserInfo userId="1" />
      <UserInfo userId="2" />
      <UserInfo userId="3" />
    </>
  );
}

export default App;
