import * as Three from "three";
import Scene from "../scene/Scene";
import OrbitControls from "./OrbitControls";
// import { SpriteText2D, MeshText2D, textAlign } from "three-text2d";
import SpriteText from "three-spritetext";

import Point from "../scene/primitives/Point";
import Visual from "./visuals/Visual";
import PointVisual from "./visuals/PointVisual";

export interface ViewportProps {}

export interface ViewportState {}

class Viewport {
  private _renderer: Three.WebGLRenderer;
  private _camera: Three.PerspectiveCamera;
  private _threeScene: Three.Scene;
  private _resize: any;
  private _element: HTMLElement;
  private _scene: Scene;

  constructor(element: HTMLElement, scene: Scene) {
    Viewport._instance = this;

    this._scene = scene;

    this._element = element;

    // Create an empty scene
    this._threeScene = new Three.Scene();

    // Create a basic perspective camera
    this._camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    this._camera.up.set(0, 0, 1);

    // Create a renderer
    this._renderer = new Three.WebGLRenderer({ antialias: true });
    this._renderer.setClearColor("#ffffff");
    element.appendChild(this._renderer.domElement);

    // Grid
    var gridXZ = new Three.GridHelper(100, 10, "#ff0000", "#999999");
    gridXZ.rotateX(Math.PI / 2);
    this._threeScene.add(gridXZ);

    // Render Loop
    this.render3d();

    //Scene.getInstance().onObjectAdded.subscribe(() => {}, this);

    window.addEventListener(
      "resize",
      (this._resize = () => {
        this._camera.aspect = this._element.offsetWidth / this._element.offsetHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(this._element.offsetWidth, this._element.offsetHeight);
      })
    );

    this._resize();

    this._controls = new OrbitControls(this._camera, this._renderer.domElement);

    // Light
    var ambientLight = new Three.AmbientLight(0xffffff);
    this._threeScene.add(ambientLight);

    this.setViewMode(false);

    this._scene.onObjectAdded.subscribe(this, (sceneObject) => {
      switch (sceneObject.constructor) {
        case Point:
          var pv = new PointVisual(sceneObject as Point, this._threeScene);
          pv.onCreate();
          break;
      }
    });

    var pt = new Point();
    this._scene.addObject(pt);

    pt.initialize();
  }

  private _visuals: any[];

  private _controls: OrbitControls;

  unmount() {
    window.removeEventListener("resize", this._resize);
  }

  render3d() {
    requestAnimationFrame(() => this.render3d());

    // for (const visual of this._visuals) {
    //   visual.onRender();
    // }

    this._renderer.render(this._threeScene, this._camera);
  }

  setViewMode(mode3D: boolean) {
    // Todo : freeze / unfreeze orbit controls and simply rotate camera
    if (mode3D) {
      this._camera.position.y = -100;
      this._camera.position.z = 100;
      this._camera.lookAt(new Three.Vector3(0, 0, 0));
      this._controls.enableRotate = true;
    } else {
      this._camera.position.x = 0;
      this._camera.position.y = 0;
      this._camera.position.z = 100;
      this._camera.lookAt(new Three.Vector3(0, 0, 0));
      this._controls.enableRotate = false;
    }
  }

  static _instance: Viewport = null;
  static getInstance(): Viewport {
    return this._instance;
  }
}

export default Viewport;
