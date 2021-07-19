import * as Three from "three";
import Scene from "../scene/Scene";
import OrbitControls from "./OrbitControls";

import { Point } from "../scene/primitives/Point";
import { PointOnLine } from "../scene/primitives/PointOnLine";
import { PointFromPosition } from "../scene/primitives/PointFromPosition";
import { Visual } from "./visuals/Visual";
import { PointVisual } from "./visuals/PointVisual";
import MainMenu from "../ui/MainMenu";
import { Segment } from "src/scene/primitives/Segment";
import { SegmentVisual } from "./visuals/SegmentVisual";
import Grid from "src/view/utils/Grid";
import PickHelper from "./utils/PickHelper";
import SceneObject from "src/scene/SceneObject";
import { arrayRemove } from "src/core/Utils";

class Viewport {
  private _renderer: Three.WebGLRenderer;
  private _camera: Three.OrthographicCamera;
  private _threeScene: Three.Scene;
  private _resize: any;
  private _element: HTMLCanvasElement;
  private _pickHelper: PickHelper;
  private _controls: OrbitControls;
  private _visuals: Visual<SceneObject>[];

  constructor(element: HTMLCanvasElement) {
    Viewport._instance = this;

    this._pickHelper = new PickHelper();

    this._element = element;

    // Create an empty scene
    this._threeScene = new Three.Scene();

    this._visuals = [];

    // Create a basic perspective camera
    //this._camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    this._camera = new Three.OrthographicCamera(
      this._element.offsetWidth / -2,
      this._element.offsetWidth / 2,
      this._element.offsetHeight / 2,
      this._element.offsetHeight / -2,
      1,
      1000
    );
    this._camera.up.set(0, 0, 1);

    // Create a renderer
    this._renderer = new Three.WebGLRenderer({ canvas: element, antialias: true });
    this._renderer.setClearColor("#ffffff");

    // Grid
    this._threeScene.add(new Grid());

    window.addEventListener(
      "resize",
      (this._resize = () => {
        //this._camera.aspect = this._element.offsetWidth / this._element.offsetHeight;
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
    MainMenu.getInstance().onViewModeChanged.subscribe(this, this.setViewMode);

    const labelsLayer = document.getElementById("labels");

    Scene.getInstance().onObjectAdded.subscribe(this, (sceneObject) => {
      let visual: Visual<SceneObject>;
      //console.log(sceneObject.constructor);
      switch (sceneObject.constructor) {
        case PointOnLine:
        case PointFromPosition:
          visual = new PointVisual(sceneObject as Point, this._camera, labelsLayer);
          break;
        case Segment:
          visual = new SegmentVisual(sceneObject as Segment, this._camera, labelsLayer);
          break;
        default:
          return;
      }

      visual.onCreate();
      this._threeScene.add(visual);
      this._visuals.push(visual);

      sceneObject.onDestroy.subscribe(this, () => {
        this._threeScene.remove(visual);
        arrayRemove(this._visuals, visual);
        visual.onDestroy();
      });
    });

    window.addEventListener("mousedown", (event) => {
      const pos = this.getCanvasRelativePosition(event);
      const x: number = (pos.x / this._element.width) * 2 - 1;
      const y: number = (pos.y / this._element.height) * -2 + 1; // note we flip Y

      const selected = this._pickHelper.pick(x, y, this._threeScene, this._camera);

      if (selected) {
        Scene.getInstance().setSelected(selected.getObject());
      }
    });

    window.addEventListener("mousemove", (event) => {
      const pos = this.getCanvasRelativePosition(event);
      const x: number = (pos.x / this._element.width) * 2 - 1;
      const y: number = (pos.y / this._element.height) * -2 + 1; // note we flip Y

      const highlighted = this._pickHelper.pick(x, y, this._threeScene, this._camera);

      Scene.getInstance().setHighlighted(highlighted?.getObject());
    });

    let group = new Three.Group();
    this._threeScene.add(group);

    this.render3d(0);
  }

  getCanvasRelativePosition(event) {
    const rect = this._element.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * this._element.width) / rect.width,
      y: ((event.clientY - rect.top) * this._element.height) / rect.height,
    };
  }

  unmount() {
    window.removeEventListener("resize", this._resize);
  }

  render3d(time) {
    for (const visual of this._visuals) {
      visual.onRender();
    }

    time *= 0.001; // convert to seconds;

    this._renderer.render(this._threeScene, this._camera);

    requestAnimationFrame(this.render3d.bind(this));
  }

  setViewMode(mode3D: boolean) {
    if (mode3D) {
      this._camera.position.y = -100;
      this._camera.position.z = 100;
      this._camera.lookAt(new Three.Vector3(0, 0, 0));
      this._controls.enableRotate = true;
    } else {
      this._camera.position.x = 0;
      this._camera.position.y = 0;
      this._camera.position.z = 100;
      this._camera.setRotationFromAxisAngle(new Three.Vector3(0, 0, 0), 0);
      console.log(this._camera.rotation);
      //this._camera.lookAt(new Three.Vector3(0, 0, 0));
      this._controls.enableRotate = false;
    }
  }

  takeScreenshort() {
    var w = window.open("", "");
    w.document.title = "Screenshot";
    //w.document.body.style.backgroundColor = "red";
    var img = new Image();
    // Without 'preserveDrawingBuffer' set to true, we must render now
    this._renderer.render(this._threeScene, this._camera);
    img.src = this._renderer.domElement.toDataURL();
    w.document.body.appendChild(img);
  }

  private static _instance: Viewport = null;
  static getInstance(): Viewport {
    return Viewport._instance;
  }
}

export default Viewport;
