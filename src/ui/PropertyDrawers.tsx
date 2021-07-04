import { InputAdornment, TextField } from "@material-ui/core";
import { propertyDrawer } from "../core/PropertyDrawer";
import Vector3 from "../maths/Vector3";
import Point from "../scene/primitives/Point";
import MainMenu from "./MainMenu";

class PropertyDrawers {
  static initialize() {
    // Do nothing, but actually is useful for property drawers to avoid being optimized out
  }

  @propertyDrawer
  static drawVector3(object: Vector3) {
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
            // onChange={(event) => (object.x = event.target.value)}
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
            />
          </div>
        )}
      </div>
    );
  }

  @propertyDrawer
  static drawPoint(object: Point) {
    return <div>A point</div>;
  }
}

export default PropertyDrawers;
