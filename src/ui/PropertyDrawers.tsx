import { InputAdornment, TextField } from "@material-ui/core";
import { propertyDrawer } from "../core/PropertyDrawer";
import Vector3 from "../maths/Vector3";
import Point from "../scene/primitives/Point";
import MainMenu from "./MainMenu";

class PropertyDrawers {
  static initialize() {
    // Do nothing, but actually is useful for property drawers to avoid being optimized out
  }

  @propertyDrawer(Vector3)
  static drawVector3(object: any, propName: string) {
    return (
      <div className="rows">
        <div className="prop">
          <TextField
            id="standard-number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">x</InputAdornment>,
            }}
            onChange={(event) => {
              const old: Vector3 = object[propName];
              object[propName] = new Vector3(+event.target.value, old.y, old.z);
            }}
          />
        </div>
        <div className="prop">
          <TextField
            id="standard-number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">y</InputAdornment>,
            }}
            onChange={(event) => {
              const old: Vector3 = object[propName];
              object[propName] = new Vector3(old.x, +event.target.value, old.z);
            }}
          />
        </div>
        {MainMenu.getInstance().is3d() && (
          <div className="prop">
            <TextField
              id="standard-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">z</InputAdornment>,
              }}
              onChange={(event) => {
                const old: Vector3 = object[propName];
                object[propName] = new Vector3(old.x, old.y, +event.target.value);
              }}
            />
          </div>
        )}
      </div>
    );
  }

  @propertyDrawer(Point)
  static drawPoint(object: any, propName: string) {
    return <div>A point</div>;
  }
}

export default PropertyDrawers;
