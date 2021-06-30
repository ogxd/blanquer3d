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
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

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
    Scene.getInstance().onObjectAdded.subscribe(this, this.onObjectAdded);
    Scene.getInstance().onObjectSelected.subscribe(this, this.onObjectSelected);
  }

  state = {
    open: false,
    anchorEl: null,
  };

  onObjectAdded(object: SceneObject) {
    this.render();
  }

  onObjectSelected(object: SceneObject) {
    this.setState(this.state);
    this.render();
  }

  getVisuals() {
    return <h1>{Scene.getInstance().getSelected()?.constructor.name}</h1>;
  }

  render(): JSX.Element {
    //const { classes } = this.props;

    //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

        <div className="rows">
          <div className="prop">
            <TextField
              id="standard-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">X</InputAdornment>,
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
                startAdornment: <InputAdornment position="start">Y</InputAdornment>,
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
                startAdornment: <InputAdornment position="start">Z</InputAdornment>,
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Inspector);
