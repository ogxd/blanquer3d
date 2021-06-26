import ReactDOM from "react-dom";
import HierarchyAddButton from "./ui/HierarchyAddButton";
import Hierarchy from "./ui/Hierarchy";
import Viewport from "./ui/Viewport";
import Segment from "./scene/primitives/Segment";
import Point from "./scene/primitives/Point";
import Vector3 from "./maths/Vector3";

ReactDOM.render(
  <HierarchyAddButton />,
  document.getElementById("hierarchy-add-button")
);
ReactDOM.render(<Hierarchy />, document.getElementById("hierarchy"));
ReactDOM.render(<Viewport />, document.getElementById("viewport"));
