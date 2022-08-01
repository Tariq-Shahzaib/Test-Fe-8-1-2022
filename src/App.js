import React from "react";
import ReactDOM from "react-dom";
import SignUpSide from "./components/Createuser";

export default function App() {
  return <SignUpSide />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
