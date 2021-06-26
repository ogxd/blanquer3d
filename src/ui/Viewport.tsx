import * as Three from "three";
import * as React from "react";

export interface ViewportProps {}

export interface ViewportState {}

class Viewport extends React.Component<ViewportProps, ViewportState> {
  renderer: Three.WebGLRenderer;
  container: HTMLDivElement;
  cube: Three.Mesh;
  camera: Three.PerspectiveCamera;
  scene: Three.Scene;

  constructor(props: ViewportProps) {
    super(props);

    // Create an empty scene
    this.scene = new Three.Scene();

    // Create a basic perspective camera
    this.camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 4;

    // Create a renderer with Antialiasing
    this.renderer = new Three.WebGLRenderer({ antialias: true });

    // Configure renderer clear color
    this.renderer.setClearColor("#BBBBBB");

    // Create a Cube Mesh with basic material
    var geometry = new Three.BoxGeometry(1, 1, 1);
    var material = new Three.MeshBasicMaterial({ color: "#433F81" });
    this.cube = new Three.Mesh(geometry, material);

    // Add cube to Scene
    this.scene.add(this.cube);

    // Render Loop
    this.render3d();
  }

  render3d() {
    requestAnimationFrame(() => this.render3d());

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  componentDidMount() {
    this.container?.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.width = "inherit";
    this.renderer.domElement.style.height = "inherit";

    this.renderer.setPixelRatio(window.devicePixelRatio);

    window.addEventListener("resize", this.resize);
  }

  resize() {
    // var box = this.container?.getBoundingClientRect();
    // console.log(this.container);
    // console.log(box.width);
    // this.renderer?.setSize(box.width, box.height);
    // this.renderer;
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
