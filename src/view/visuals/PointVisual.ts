import * as Blanquer3d from "src/blanquer3d";
import * as Three from "three";

export class PointVisual extends Blanquer3d.Visual<Blanquer3d.Point> {
  private _sphere: Three.Mesh;
  private _textSprite: Blanquer3d.TextSprite;

  onCreate() {
    const geometry = new Three.SphereGeometry(0.5, 32, 32);
    const material = new Three.MeshBasicMaterial({ color: 0xff0000 });
    this._sphere = new Three.Mesh(geometry, material);
    this.add(this._sphere);

    this._textSprite = new Blanquer3d.TextSprite();
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
      case "position": {
        var pos = this._object.position;
        this.position.set(pos.x, pos.y, pos.z);
        break;
      }
    }
  }

  onSelected() {
    throw new Error("Method not implemented.");
  }

  onDeselected() {
    throw new Error("Method not implemented.");
  }
}
