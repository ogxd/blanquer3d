import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as Blanquer3d from "blanquer3d";

export class PropertyDrawers {
  static initialize() {
    // Do nothing, but actually is useful for property drawers to avoid being optimized out
  }

  @Blanquer3d.propertyDrawer(Blanquer3d.Vector3)
  static drawVector3(object: any, propName: string) {
    const current = object[propName];
    return (
      <div className="rows">
        <div className="prop">
          <MaterialUI.TextField
            id="vector3-x"
            type="number"
            key={current.x}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: <MaterialUI.InputAdornment position="start">x</MaterialUI.InputAdornment>,
            }}
            defaultValue={current.x}
            onChange={(event) => {
              const old: Blanquer3d.Vector3 = object[propName];
              object[propName] = new Blanquer3d.Vector3(+event.target.value, old.y, old.z);
            }}
          />
        </div>
        <div className="spacer" />
        <div className="prop">
          <MaterialUI.TextField
            id="vector3-y"
            type="number"
            key={current.y}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: <MaterialUI.InputAdornment position="start">y</MaterialUI.InputAdornment>,
            }}
            defaultValue={current.y}
            onChange={(event) => {
              const old: Blanquer3d.Vector3 = object[propName];
              object[propName] = new Blanquer3d.Vector3(old.x, +event.target.value, old.z);
            }}
          />
        </div>
        {Blanquer3d.MainMenu.getInstance().is3d() && (
          <React.Fragment>
            <div className="spacer" />
            <div className="prop">
              <MaterialUI.TextField
                id="vector3-z"
                type="number"
                key={current.z}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: <MaterialUI.InputAdornment position="start">z</MaterialUI.InputAdornment>,
                }}
                defaultValue={current.z}
                onChange={(event) => {
                  const old: Blanquer3d.Vector3 = object[propName];
                  object[propName] = new Blanquer3d.Vector3(old.x, old.y, +event.target.value);
                }}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  @Blanquer3d.propertyDrawer(Blanquer3d.Point)
  static drawPoint(object: any, propName: string) {
    const elements = [];
    let key = 0;
    let current = -1;
    const currentObject = object[propName];
    const indexToObj = new Map<number, any>();
    elements.push(
      <MaterialUI.MenuItem key={-1} value={-1}>
        None
      </MaterialUI.MenuItem>
    );
    Blanquer3d.Scene.getInstance().forEach((x) => {
      if (currentObject === x) {
        current = key;
      }
      elements.push(
        <MaterialUI.MenuItem key={key} value={key}>
          {x["name"]}
        </MaterialUI.MenuItem>
      );
      indexToObj[key] = x;
      key++;
    });
    console.log("current: " + current);
    return (
      <React.Fragment>
        <MaterialUI.Select
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
          startAdornment={<MaterialUI.InputAdornment position="start">{propName}</MaterialUI.InputAdornment>}
        >
          {elements}
        </MaterialUI.Select>
      </React.Fragment>
    );
  }

  @Blanquer3d.propertyDrawer(String)
  static drawString(object: any, propName: string) {
    console.log("draw string !");
    return (
      <MaterialUI.TextField
        key={object[propName]}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <MaterialUI.InputAdornment position="start">{propName}</MaterialUI.InputAdornment>,
        }}
        defaultValue={object[propName]}
        onChange={(event) => {
          object[propName] = event.target.value;
        }}
      />
    );
  }
}
