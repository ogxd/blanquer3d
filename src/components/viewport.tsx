import * as Three from "three";
import * as React from "react";

export interface ViewportProps {}

export interface ViewportState {}

class Viewport extends React.Component<ViewportProps, ViewportState> {
  renderer: Three.WebGLRenderer;
  container: HTMLDivElement;

  constructor(props: ViewportProps) {
    super(props);

    // Create an empty scene
    var scene = new Three.Scene();

    // Create a basic perspective camera
    var camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    // Create a renderer with Antialiasing
    this.renderer = new Three.WebGLRenderer({ antialias: true });

    // Configure renderer clear color
    this.renderer.setClearColor("#000000");

    // Configure renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  componentDidMount() {
    this.container?.appendChild(this.renderer.domElement);
  }

  render() {
    return (
      <div
        style={{ width: "inherit", height: "inherit", position: "absolute" }}
        ref={(thisNode) => (this.container = thisNode)}
      ></div>
    );
  }
}

export default Viewport;
