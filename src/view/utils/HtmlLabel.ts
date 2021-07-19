import * as Three from "three";

export class HtmlLabel extends Three.Object3D {
  private _element: HTMLElement;

  constructor(parentElement: HTMLElement) {
    super();
    const div = document.createElement("div");
    div.className = "text-label";
    div.style.position = "absolute";
    div.style.width = "100";
    div.style.height = "100";
    div.innerHTML = "hi there!";
    div.style.top = "-1000";
    div.style.left = "-1000";

    this._element = div;

    parentElement.appendChild(this._element);
  }

  setHTML(html: string) {
    this._element.innerHTML = html;
  }

  updatePosition(camera: Three.Camera) {
    const coords2d = this.get2DCoords(this.position, camera);
    this._element.style.left = coords2d.x + "px";
    this._element.style.top = coords2d.y + "px";
  }

  get2DCoords(position: Three.Vector3, camera: Three.Camera) {
    const posCopy = new Three.Vector3();
    position.copy(posCopy);
    const vector = posCopy.project(camera);
    vector.x = ((vector.x + 1) / 2) * window.innerWidth;
    vector.y = (-(vector.y - 1) / 2) * window.innerHeight;
    return vector;
  }

  destroy() {
    this._element.remove();
  }
}
