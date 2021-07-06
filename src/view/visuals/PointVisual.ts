import Point from "../../scene/primitives/Point";
import TextSprite from "src/view/utils/TextSprite";
import Visual from "./Visual";
import * as Three from "three";

class PointVisual extends Visual<Point> {
  private _sphere: Three.Mesh;
  private _textSprite: TextSprite;

  onCreate() {
    const geometry = new Three.SphereGeometry(0.5, 32, 32);
    const material = new Three.MeshBasicMaterial({ color: 0xff0000 });
    this._sphere = new Three.Mesh(geometry, material);
    this._scene.add(this._sphere);

    this._textSprite = new TextSprite();
    this._textSprite.parameters.text = this._object.name;
    this._textSprite.update();
    this._scene.add(this._textSprite);
  }

  onDestroy() {
    this._scene.remove(this._sphere);
    this._scene.remove(this._textSprite);
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
      case "position": {
        var pos = this._object.position;
        this._sphere.position.set(pos.x, pos.y, pos.z);
        this._textSprite.position.set(pos.x, pos.y, pos.z);
        break;
      }
    }
  }
}

export default PointVisual;
