import React, { Component } from "react";
import Switch from "./components/Switch";
import Viewport from "../view/Viewport";

class MainMenu extends Component {
  onViewModeChanged(is3D: boolean) {
    Viewport.getInstance().setViewMode(is3D);
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
              input?.onStateChanged.subscribe(this, this.onViewModeChanged);
            }}
          />
        </div>
      </div>
    );
  }
}
export default MainMenu;
