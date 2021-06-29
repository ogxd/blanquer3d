import ReactDOM from "react-dom";
import Hierarchy from "./ui/Hierarchy";
import Viewport from "./view/Viewport";
import MainMenu from "./ui/MainMenu";
import Scene from "./scene/Scene";

ReactDOM.render(<Hierarchy />, document.getElementById("hierarchy"));
ReactDOM.render(<MainMenu />, document.getElementById("mainmenu"));

var viewport = new Viewport(document.getElementById("viewport"), new Scene());
