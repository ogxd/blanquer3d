import * as Three from "three";
import Scene from "../scene/Scene";
import OrbitControls from "./OrbitControls";
// import { SpriteText2D, MeshText2D, textAlign } from "three-text2d";
import SpriteText from "three-spritetext";

export interface ViewportProps {}

export interface ViewportState {}

class Viewport {
  private _renderer: Three.WebGLRenderer;
  private _camera: Three.PerspectiveCamera;
  private _scene: Three.Scene;
  private _resize: any;
  private _element: HTMLElement;

  constructor(element: HTMLElement) {
    Viewport._instance = this;

    this._element = element;

    // Create an empty scene
    this._scene = new Three.Scene();

    // Create a basic perspective camera
    this._camera = new Three.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this._camera.up.set(0, 0, 1);
    this._camera.position.y = -100;
    this._camera.position.z = 100;
    this._camera.lookAt(new Three.Vector3(0, 0, 0));

    // Create a renderer
    this._renderer = new Three.WebGLRenderer({ antialias: true });
    this._renderer.setClearColor("#ffffff");
    element.appendChild(this._renderer.domElement);

    // Grid
    var gridXZ = new Three.GridHelper(100, 10, "#ff0000", "#999999");
    gridXZ.rotateX(Math.PI / 2);
    this._scene.add(gridXZ);

    // Render Loop
    this.render3d();

    Scene.getInstance().onObjectAdded.subscribe(() => {});

    window.addEventListener(
      "resize",
      (this._resize = () => {
        this._camera.aspect =
          this._element.offsetWidth / this._element.offsetHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(
          this._element.offsetWidth,
          this._element.offsetHeight
        );
      })
    );

    this._resize();

    var controls = new OrbitControls(this._camera, this._renderer.domElement);

    // Light
    var ambientLight = new Three.AmbientLight(0xffffff);
    this._scene.add(ambientLight);
    var pointLight = new Three.PointLight(0xffffff);
    pointLight.position.set(0, 300, 200);
    this._scene.add(pointLight);

    // Geometry
    var geometry = new Three.PlaneGeometry(30, 30);
    const texture = new Three.TextureLoader().load("res/point.png");
    var material = new Three.MeshBasicMaterial({
      map: texture,
    });
    material.side = Three.DoubleSide;
    material.transparent = true;
    this._billboard = new Three.Mesh(geometry, material);
    this._scene.add(this._billboard);

    // Text test
    // var text = new MeshText2D("RIGHT", {
    //   align: textAlign.right,
    //   font: "30px Arial",
    //   fillStyle: "#000000",
    //   antialias: true,
    // });
    this._text = new SpriteText("       A", 10, "#000000");
    this._scene.add(this._text);
  }

  private _billboard: Three.Mesh;
  private _text: SpriteText;

  unmount() {
    window.removeEventListener("resize", this._resize);
  }

  render3d() {
    requestAnimationFrame(() => this.render3d());

    var widthHalf = this._renderer.domElement.width / 2;
    var heightHalf = this._renderer.domElement.height / 2;

    if (this._billboard) {
      this._billboard.lookAt(this._camera.position);
      var distance =
        0.0007 * this._billboard.position.distanceTo(this._camera.position);
      this._billboard.scale.set(distance, distance, distance);

      distance *= 35;
      this._text.textHeight = distance;

      //this._text.scale.set(distance, distance, distance);

      // Projection 2D if required for DOM overlay approach
      var vector = this._billboard.position.clone();
      vector.project(this._camera);
      vector.x = Math.floor(vector.x * widthHalf + widthHalf);
      vector.y = -Math.floor(vector.y * heightHalf + heightHalf);
      //console.log("x:" + vector.x);
      //console.log("y:" + vector.y);
    }

    // Render the scene
    this._renderer.render(this._scene, this._camera);
  }

  setViewMode(mode3D: boolean) {
    // Todo : freeze / unfreeze orbit controls and simply rotate camera
    if (mode3D) {
      this._camera.position.y = -100;
      this._camera.position.z = 100;
      this._camera.lookAt(new Three.Vector3(0, 0, 0));
    } else {
      this._camera.position.x = 0;
      this._camera.position.y = 0;
      this._camera.position.z = 100;
      this._camera.lookAt(new Three.Vector3(0, 0, 0));
    }
  }

  static _instance: Viewport = null;
  static getInstance(): Viewport {
    return this._instance;
  }
}

export default Viewport;
