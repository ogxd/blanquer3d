import Point from "../../scene/primitives/Point";
import TextSprite from "src/view/utils/TextSprite";
import { Visual } from "./Visual";
import * as Three from "three";

export class PointVisual extends Visual<Point> {
  private _sphere: Three.Mesh;
  private _textSprite: TextSprite;
  private _material: Three.MeshBasicMaterial;

  onCreate() {
    console.log("CACA PROUT");
    const geometry = new Three.SphereGeometry(0.5, 32, 32);
    this._material = new Three.MeshBasicMaterial({ color: 0xff0000 });
    this._sphere = new Three.Mesh(geometry, this._material);
    this.add(this._sphere);

    this._textSprite = new TextSprite();
    this._textSprite.parameters.text = this._object.name;
    this._textSprite.update();
    this.add(this._textSprite);
  }

  onDestroy() {
    //this._scene.remove(this._sphere);
    //this._scene.remove(this._textSprite);
  }

  onRender() {
    //console.log(this._object);
  }

  onVisibilityChanged(isVisible: boolean) {
    this._sphere.visible = isVisible;
  }

  onPropertyChanged(name: string) {
    switch (name) {
      case "name": {
        this._textSprite.parameters.text = this._object.name;
        this._textSprite.update();
        break;
      }
      case "point":
      case "segment":
      case "position": {
        var pos = this._object.getPosition();
        this.position.set(pos.x, pos.y, pos.z);
        break;
      }
    }
  }

  onSelected(selected: boolean) {
    this._material.color = new Three.Color(selected ? 0x00ff00 : 0xff0000);
  }
}
