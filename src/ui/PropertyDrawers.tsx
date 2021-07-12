import { InputAdornment, InputLabel, TextField } from "@material-ui/core";
import React from "react";
import { propertyDrawer } from "../core/PropertyDrawer";
import Vector3 from "../maths/Vector3";
import Point from "../scene/primitives/Point";
import Segment from "../scene/primitives/Segment";
import MainMenu from "./MainMenu";
import Scene from "src/scene/Scene";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
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
            id="vector3-x"
            type="number"
            key={current.x}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">x</InputAdornment>,
            }}
            defaultValue={current.x}
            onChange={(event) => {
              const old: Vector3 = object[propName];
              object[propName] = new Vector3(+event.target.value, old.y, old.z);
            }}
          />
        </div>
        <div className="spacer" />
        <div className="prop">
          <TextField
            id="vector3-y"
            type="number"
            key={current.y}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">y</InputAdornment>,
            }}
            defaultValue={current.y}
            onChange={(event) => {
              const old: Vector3 = object[propName];
              object[propName] = new Vector3(old.x, +event.target.value, old.z);
            }}
          />
        </div>
        {MainMenu.getInstance().is3d() && (
          <React.Fragment>
            <div className="spacer" />
            <div className="prop">
              <TextField
                id="vector3-z"
                type="number"
                key={current.z}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">z</InputAdornment>,
                }}
                defaultValue={current.z}
                onChange={(event) => {
                  const old: Vector3 = object[propName];
                  object[propName] = new Vector3(old.x, old.y, +event.target.value);
                }}
              />
            </div>
          </React.Fragment>
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
      <React.Fragment>
        <Select
          key={current}
          defaultValue={current}
          onChange={(event) => {
            let index = +event.target.value;
            object[propName] = index === -1 ? undefined : indexToObj[index];
          }}
          displayEmpty
          inputProps={{
            "aria-label": "Without label",
          }}
          startAdornment={<InputAdornment position="start">{propName}</InputAdornment>}
        >
          {elements}
        </Select>
      </React.Fragment>
    );
  }

  @propertyDrawer(Segment)
  static drawSegment(object: any, propName: string) {
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
      <React.Fragment>
        <Select
          key={current}
          defaultValue={current}
          onChange={(event) => {
            let index = +event.target.value;
            object[propName] = index === -1 ? undefined : indexToObj[index];
          }}
          displayEmpty
          inputProps={{
            "aria-label": "Without label",
          }}
          startAdornment={<InputAdornment position="start">{propName}</InputAdornment>}
        >
          {elements}
        </Select>
      </React.Fragment>
    );
  }

  @propertyDrawer(String)
  static drawString(object: any, propName: string) {
    return (
      <TextField
        key={object[propName]}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{propName}</InputAdornment>,
        }}
        defaultValue={object[propName]}
        onChange={(event) => {
          object[propName] = event.target.value;
        }}
      />
    );
  }

  //@propertyDrawer(Enum)
  static drawString2(object: any, propName: string) {
    return (
      <TextField
        key={object[propName]}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{propName}</InputAdornment>,
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
