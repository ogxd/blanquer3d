import React, { Component } from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CropDin from "@material-ui/icons/CropDin";
import FolderOpen from "@material-ui/icons/FolderOpen";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Clear from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Scene from "../scene/Scene";
import SceneObject from "../scene/SceneObject";
import Point from "../scene/primitives/Point";
import Segment from "../scene/primitives/Segment";

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

class Hierarchy extends Component {
  constructor(props) {
    super(props);
    Scene.getInstance().onObjectAdded.subscribe(this, this.onObjectAdded);
    Scene.getInstance().onObjectSelected.subscribe(this, this.onObjectSelected);
  }

  state = {
    open: false,
    anchorEl: null,
  };

  onObjectAdded(object: SceneObject) {
    this.setState(this.state);
    this.render();
  }

  onObjectSelected(object: SceneObject) {
    this.setState(this.state);
    this.render();
  }

  getVisuals() {
    var l = [];
    let key = 0;
    Scene.getInstance().forEach((value: SceneObject, index: number, array: SceneObject[]) => {
      l.push(
        <ListItem
          key={key}
          button
          selected={Scene.getInstance().getSelected() === value}
          onClick={(event) => Scene.getInstance().setSelected(value)}
        >
          <ListItemText key={index} primary={"" + value.constructor.name} />
        </ListItem>
      );
      key++;
    });
    return l;
  }

  render(): JSX.Element {
    console.log("render");

    const setAnchorEl = (anchor: any) => {
      this.setState({ anchorEl: anchor });
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    return (
      <React.Fragment>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          // className={classes.root}
        >
          {this.getVisuals()}
        </List>
        <Grid container justify="center">
          <Button color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Add
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                Scene.getInstance().addObject(new Point());
                handleClose();
              }}
            >
              Point
            </MenuItem>
            <MenuItem
              onClick={() => {
                Scene.getInstance().addObject(new Segment());
                handleClose();
              }}
            >
              Segment
            </MenuItem>
          </Menu>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Hierarchy);
