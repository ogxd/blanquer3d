import ReactDOM from "react-dom";
import HierarchyAddButton from "./ui/HierarchyAddButton";
import Hierarchy from "./ui/Hierarchy";
import Viewport from "./ui/Viewport";
import Scene from "./scene/Scene";
//import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <HierarchyAddButton />,
  document.getElementById("hierarchy-add-button")
);
ReactDOM.render(<Hierarchy />, document.getElementById("hierarchy"));
ReactDOM.render(<Viewport />, document.getElementById("viewport"));
