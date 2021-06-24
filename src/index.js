import React, { Component } from "react";
import ReactDOM from "react-dom";
import HierarchyAddButton from "./components/hierarchy-add-button";
import Hierarchy from "./components/hierarchy";
import Viewport from "./components/viewport";
//import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <HierarchyAddButton />,
  document.getElementById("hierarchy-add-button")
);
ReactDOM.render(<Hierarchy />, document.getElementById("hierarchy"));
ReactDOM.render(<Viewport />, document.getElementById("viewport"));
