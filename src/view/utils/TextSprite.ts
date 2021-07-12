import { CancelSharp } from "@material-ui/icons";
import * as Three from "three";

interface ITextSpriteProps {
  text: string;
  fontFace: string;
  bold: boolean;
  fontSize: number;
  border: boolean;
  borderThickness: number;
  borderColor: { r: number; g: number; b: number; a: number };
  backgroundColor: { r: number; g: number; b: number; a: number };
  alignment: Three.Vector2;
}

class TextSprite extends Three.Object3D {
  constructor() {
    super();

    this.parameters = {
      text: "",
      fontFace: "Arial",
      bold: false,
      fontSize: 30,
      border: false,
      borderThickness: 4,
      borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
      backgroundColor: { r: 255, g: 255, b: 255, a: 1.0 },
      alignment: new Three.Vector2(0.5, -0.5),
    };

    this._spriteMaterial = new Three.SpriteMaterial();
    this._spriteMaterial.sizeAttenuation = false;
    var sprite = new Three.Sprite(this._spriteMaterial);
    sprite.scale.set(0.2, 0.1, 1.0);
    sprite.center.set(-0.04, 0.65);

    let group = new Three.Group();
    group.add(sprite);

    //this.add(sprite);
    this.add(group);

    this.update();
  }

  public readonly parameters: ITextSpriteProps;
  private readonly _spriteMaterial: Three.SpriteMaterial;

  update() {
    let parameters = this.parameters;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    context.imageSmoothingEnabled = false;

    context.font = (parameters.bold ? "Bold " : "") + parameters.fontSize + "px " + parameters.fontFace;

    // get size data (height depends only on font size)
    const metrics = context.measureText(parameters.text);
    const textWidth = metrics.width;

    /*
    context.fillStyle =
      "rgba(" +
      parameters.backgroundColor.r +
      "," +
      parameters.backgroundColor.g +
      "," +
      parameters.backgroundColor.b +
      "," +
      parameters.backgroundColor.a +
      ")";
    context.strokeStyle =
      "rgba(" +
      parameters.borderColor.r +
      "," +
      parameters.borderColor.g +
      "," +
      parameters.borderColor.b +
      "," +
      parameters.borderColor.a +
      ")";

    context.lineWidth = parameters.borderThickness;
    this.roundRect(
      context,
      parameters.borderThickness / 2,
      parameters.borderThickness / 2,
      textWidth + parameters.borderThickness,
      parameters.fontSize * 1.4 + parameters.borderThickness,
      6
    );
    // 1.4 is extra height factor for text below baseline: g,j,p,q.
    */

    context.imageSmoothingEnabled = true;
    // text color
    context.fillStyle = "rgba(0, 0, 0, 1.0)";

    context.fillText(parameters.text, parameters.borderThickness, parameters.fontSize + parameters.borderThickness);

    // canvas contents will be used for a texture
    var texture = new Three.Texture(canvas);
    texture.needsUpdate = true;

    this._spriteMaterial.map = texture;
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

export default TextSprite;
