import React, { Component } from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import * as Blanquer3d from "blanquer3d";

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

export class HierarchyUnstyled extends Component {
  constructor(props) {
    super(props);
    Blanquer3d.Scene.getInstance().onObjectAdded.subscribe(this, (x) => this.refresh());
    Blanquer3d.Scene.getInstance().onObjectSelected.subscribe(this, (x) => this.refresh());
    HierarchyUnstyled._instance = this;
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
    var l = [];
    let key = 0;
    Blanquer3d.Scene.getInstance().forEach(
      (value: Blanquer3d.SceneObject, index: number, array: Blanquer3d.SceneObject[]) => {
        l.push(
          <ListItem
            key={key}
            button
            selected={Blanquer3d.Scene.getInstance().getSelected() === value}
            onClick={(event) => Blanquer3d.Scene.getInstance().setSelected(value)}
          >
            <ListItemText key={index} primary={value["name"]} />
          </ListItem>
        );
        key++;
      }
    );
    return l;
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
                Blanquer3d.Scene.getInstance().addObject(new Blanquer3d.Point());
                handleClose();
              }}
            >
              Point
            </MenuItem>
            <MenuItem
              onClick={() => {
                Blanquer3d.Scene.getInstance().addObject(new Blanquer3d.Segment());
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

  private static _instance: HierarchyUnstyled = null;
  public static getInstance(): HierarchyUnstyled {
    return HierarchyUnstyled._instance;
  }
}

export const Hierarchy = withStyles(styles)(HierarchyUnstyled);
