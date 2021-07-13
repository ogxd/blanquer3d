import React, { Component } from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Scene from "../scene/Scene";
import { drawProperty } from "../core/PropertyDrawer";
import PropertyDrawers from "./PropertyDrawers";
import MainMenu from "./MainMenu";
import { ListItem } from "@material-ui/core";

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
    const selectedObject: any = Scene.getInstance().getSelected();

    if (!selectedObject) {
      return <h2>Nothing Selected</h2>;
    }

    const elements = [];
    const properties: any[] = selectedObject.properties;

    let key = 0;

    // console.log("iterate");
    // Object.keys(selectedObject).forEach((x) => {
    //   console.log(x);
    // });

    //todo: per object type property drawer OR getProperties trick
    properties.forEach((property) => {
      const propertyName = property.name;
      const propertyType = property.type;

      //console.log(`name:${propertyName} type:${propertyType}`);

      elements.push(<ListItem key={key}>{drawProperty(selectedObject, propertyName, propertyType)}</ListItem>);
      key++;
    });

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
