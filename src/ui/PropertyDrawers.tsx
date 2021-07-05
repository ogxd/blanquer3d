import { InputAdornment, TextField } from "@material-ui/core";
import { propertyDrawer } from "../core/PropertyDrawer";
import Vector3 from "../maths/Vector3";
import Point from "../scene/primitives/Point";
import MainMenu from "./MainMenu";
import Scene from "src/scene/Scene";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Hierarchy from "./Hierarchy";

class PropertyDrawers {
  static initialize() {
    // Do nothing, but actually is useful for property drawers to avoid being optimized out
  }

  @propertyDrawer(Vector3)
  static drawVector3(object: any, propName: string) {
    const current = object[propName];
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
    const elements = [];
    let key = 0;
    let current = -1;
    const currentObject = object[propName];
    const indexToObj = new Map<number, any>();
    elements.push(
      <MenuItem key={-1} value={-1}>
        None
      </MenuItem>
    );
    Scene.getInstance().forEach((x) => {
      if (currentObject === x) {
        current = key;
      }
      elements.push(
        <MenuItem key={key} value={key}>
          {x["name"]}
        </MenuItem>
      );
      indexToObj[key] = x;
      key++;
    });
    return (
      <Select
        value={current}
        onChange={(event) => {
          object[propName] = indexToObj[+event.target.value];
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {elements}
      </Select>
    );
  }

  @propertyDrawer(String)
  static drawString(object: any, propName: string) {
    console.log("draw string ! ");
    return (
      <TextField
        key={object[propName]}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Name</InputAdornment>,
        }}
        defaultValue={object[propName]}
        onChange={(event) => {
          object[propName] = event.target.value;
        }}
      />
    );
  }
}

export default PropertyDrawers;
