import React, { Component } from "react";
import Switch from "./components/Switch";
import Viewport from "../view/Viewport";
import EventSubscriber from "../core/EventSubscriber";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    MainMenu._instance = this;
  }

  readonly onViewModeChanged = new EventSubscriber<boolean>();

  private _is3d: boolean;

  is3d() {
    return this._is3d;
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "auto" }}>🚀 Blanquer 3D</div>
        <div style={{ marginLeft: "auto", marginRight: "20px" }}>
          <Switch
            labelOff={"2D"}
            labelOn={"3D"}
            ref={(input) => {
              input?.onStateChanged.subscribe(this, (mode: boolean) => {
                this._is3d = mode;
                this.onViewModeChanged.dispatch(mode);
              });
            }}
          />
        </div>
      </div>
    );
  }

  private static _instance: MainMenu = null;
  static getInstance(): MainMenu {
    return MainMenu._instance;
  }
}
export default MainMenu;
