import React, { Component } from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Scene from "../scene/Scene";
import { drawProperty } from "../core/PropertyDrawer";
import { getProperties } from "../core/PropertyDecorator";
import PropertyDrawers from "./PropertyDrawers";
import MainMenu from "./MainMenu";
import { ListItem } from "@material-ui/core";
import SceneObject from "src/scene/SceneObject";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  });

class Inspector extends Component {
  constructor(props) {
    super(props);
    PropertyDrawers.initialize(); // Force static property drawers initialization
    Scene.getInstance().onObjectAdded.subscribe(this, (object) => this.refresh());
    Scene.getInstance().onObjectSelected.subscribe(this, (object) => this.refresh());
    MainMenu.getInstance().onViewModeChanged.subscribe(this, (mode) => this.refresh());
  }

  state = {
    open: false,
    anchorEl: null,
  };

  refresh() {
    this.setState(this.state);
    this.render();
  }

  getVisuals() {
    const selectedObject: SceneObject = Scene.getInstance().getSelected();

    if (!selectedObject) {
      return <h3>Nothing Selected</h3>;
    }

    let key = 0;

    const elements = getProperties(selectedObject).map((property) => (
      <ListItem key={key++}>{drawProperty(selectedObject, property.propertyName, property.typeName)}</ListItem>
    ));

    return (
      <React.Fragment>
        <h2 key="header">{selectedObject.constructor.name}</h2>
        <List component="nav" aria-labelledby="nested-list-subheader">
          {elements}
        </List>
      </React.Fragment>
    );
  }

  render(): JSX.Element {
    const setAnchorEl = (anchor: any) => {
      this.setState({ anchorEl: anchor });
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    return <React.Fragment>{this.getVisuals()}</React.Fragment>;
  }
}

export default withStyles(styles)(Inspector);
