import * as Three from "three";
import * as Blanquer3d from "blanquer3d";

export interface ViewportProps {}

export interface ViewportState {}

export class Viewport {
  private _renderer: Three.WebGLRenderer;
  private _camera: Three.PerspectiveCamera;
  private _threeScene: Three.Scene;
  private _resize: any;
  private _element: HTMLElement;

  constructor(element: HTMLElement) {
    Viewport._instance = this;

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
    // var gridXZ = new Three.GridHelper(100, 10, "#ff0000", "#999999");
    // gridXZ.rotateX(Math.PI / 2);
    // this._threeScene.add(gridXZ);
    this._threeScene.add(new Blanquer3d.Grid());

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

    this._controls = new Blanquer3d.OrbitControls(this._camera, this._renderer.domElement);

    // Light
    var ambientLight = new Three.AmbientLight(0xffffff);
    this._threeScene.add(ambientLight);

    this.setViewMode(false);
    Blanquer3d.MainMenu.getInstance().onViewModeChanged.subscribe(this, this.setViewMode);

    Blanquer3d.Scene.getInstance().onObjectAdded.subscribe(this, (sceneObject) => {
      let visual: Blanquer3d.VisualBase;
      switch (sceneObject.constructor) {
        case Blanquer3d.Point:
          visual = new Blanquer3d.PointVisual(sceneObject as Blanquer3d.Point);
          break;
        case Blanquer3d.Segment:
          visual = new Blanquer3d.SegmentVisual(sceneObject as Blanquer3d.Segment);
          break;
        default:
          return;
      }
      visual.onCreate();
      this._threeScene.add(visual);
      sceneObject.onDestroy.subscribe(this, () => {
        this._threeScene.remove(visual);
        visual.onDestroy();
      });
    });
  }

  private _controls: Blanquer3d.OrbitControls;

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
      //console.log(this._camera.rotation);
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
