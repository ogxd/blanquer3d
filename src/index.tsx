import ReactDOM from "react-dom";
import * as Blanquer3d from "blanquer3d";
import "reflect-metadata";

ReactDOM.render(<Blanquer3d.Hierarchy />, document.getElementById("hierarchy"));
ReactDOM.render(<Blanquer3d.MainMenu />, document.getElementById("mainmenu"));
ReactDOM.render(<Blanquer3d.Inspector />, document.getElementById("inspector"));

var viewport = new Blanquer3d.Viewport(document.getElementById("viewport"));

// Eventualy later we can use URL for scene serialization
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const product = urlParams.has('s')
// const product = urlParams.get('s')
