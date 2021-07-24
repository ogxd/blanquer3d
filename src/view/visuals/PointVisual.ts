import { Point } from "../../scene/primitives/Point";
import { Visual } from "./Visual";
import * as Three from "three";
import { HtmlLabel } from "../utils/HtmlLabel";

export class PointVisual extends Visual<Point> {
  private _sphere: Three.Mesh;
  private _material: Three.MeshBasicMaterial;
  private _textLabel: HtmlLabel;

  onCreate() {
    const geometry = new Three.SphereGeometry(0.5, 32, 32);
    this._material = new Three.MeshBasicMaterial({ color: 0xff0000 });
    this._sphere = new Three.Mesh(geometry, this._material);
    this.add(this._sphere);

    this._textLabel = new HtmlLabel(this._element, false);
    this.add(this._textLabel);

    this.updateLabel();
    this.updatePosition();
  }

  onDestroy() {
    this._textLabel.destroy();
  }

  onRender() {
    this._textLabel.updatePosition(this._camera);
  }

  onVisibilityChanged(isVisible: boolean) {
    this._sphere.visible = isVisible;
  }

  onPropertyChanged(name: string) {
    switch (name) {
      case "name": {
        this.updateLabel();
        break;
      }
      case "point":
      case "segment":
      case "position": {
        this.updatePosition();
        break;
      }
    }
  }

  private updateLabel() {
    this._textLabel.setHTML(this._object.name);
  }

  private updatePosition() {
    var pos = this._object.getPosition();
    this.position.set(pos.x, pos.y, pos.z);
  }

  onSelected(selected: boolean) {
    this._material.color = new Three.Color(selected ? 0x00ff00 : 0xff0000);
  }

  onHighlighted(highlighted: boolean) {
    this._material.color = new Three.Color(highlighted ? 0x0000ff : 0xff0000);
  }
}
