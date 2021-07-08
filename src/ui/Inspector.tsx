import React, { Component } from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";
import * as Blanquer3d from "src/blanquer3d";

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

class InspectorUnstyled extends Component {
  constructor(props) {
    super(props);
    Blanquer3d.PropertyDrawers.initialize(); // Force static property drawers initialization
    Blanquer3d.Scene.getInstance().onObjectAdded.subscribe(this, (object) => this.refresh());
    Blanquer3d.Scene.getInstance().onObjectSelected.subscribe(this, (object) => this.refresh());
    Blanquer3d.MainMenu.getInstance().onViewModeChanged.subscribe(this, (mode) => this.refresh());
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
    const selectedObject: any = Blanquer3d.Scene.getInstance().getSelected();

    if (!selectedObject) {
      return <h2>Nothing Selected</h2>;
    }

    const elements = [];
    const properties: any[] = selectedObject.properties;

    let key = 0;

    console.log("iterate");
    Object.keys(selectedObject).forEach((x) => {
      console.log(x);
    });

    properties.forEach((property) => {
      const propertyName = property.name;
      const propertyType = property.type;

      //console.log(`name:${propertyName} type:${propertyType}`);

      elements.push(
        <ListItem key={key}>
          {Blanquer3d.PropertyDrawersReg.drawProperty(selectedObject, propertyName, propertyType)}
        </ListItem>
      );
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

export const Inspector = withStyles(styles)(InspectorUnstyled);
