import React, { Component } from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CropDin from "@material-ui/icons/CropDin";
import FolderOpen from "@material-ui/icons/FolderOpen";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Clear from "@material-ui/icons/Clear";

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
  state = {
    open: false,
  };

  render(): JSX.Element {
    //const { classes } = this.props;

    const handleClick = () => {
      this.setState({ open: !this.state.open });
    };

    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        // className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <Clear />
          </ListItemIcon>
          <ListItemText primary="Point A" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Clear />
          </ListItemIcon>
          <ListItemText primary="Point B" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <FolderOpen />
          </ListItemIcon>
          <ListItemText primary="Groupe 1" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon>
                <CropDin />
              </ListItemIcon>
              <ListItemText primary="Carré" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

export default withStyles(styles)(Hierarchy);
