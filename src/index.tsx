import ReactDOM from "react-dom";
import Hierarchy from "./ui/Hierarchy";
import Viewport from "./view/Viewport";
import Inspector from "./ui/Inspector";
import MainMenu from "./ui/MainMenu";
import Scene from "./scene/Scene";
import "reflect-metadata";

ReactDOM.render(<Hierarchy />, document.getElementById("hierarchy"));
ReactDOM.render(<MainMenu />, document.getElementById("mainmenu"));
ReactDOM.render(<Inspector />, document.getElementById("inspector"));

var viewport = new Viewport(document.getElementById("viewport") as HTMLCanvasElement);

// Eventualy later we can use URL for scene serialization
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const product = urlParams.has('s')
// const product = urlParams.get('s')
