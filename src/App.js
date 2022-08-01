import React from "react";
import ReactDOM from "react-dom";
import SignUpSide from "./components/Signup";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return <SignUpSide />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
