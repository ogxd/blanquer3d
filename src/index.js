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

var point = new Point();

point.onPropertyChanged.subscribe((x) => {
  console.log("point property changed: " + x + "=" + point[x]);
});

point.position = new Vector3(1, 2, 3);
point.position = new Vector3(1, 2, 4);
point.position = new Vector3(1, 2, 5);

console.log((() => console.log("prout")) == (() => console.log("prout")));

var segment = new Segment();

segment.onPropertyChanged.subscribe((x) => {
  console.log("segment property changed: " + x + "=" + segment[x]);
});

segment.point1 = new Point();
segment.point1.position = new Vector3(2, 2, 2);
