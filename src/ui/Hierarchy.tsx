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
    anchorEl: null,
  };

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
          <ListItem button>
            <ListItemText primary="Point A" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Point B" />
          </ListItem>
        </List>
        <Grid container justify="center">
          <Button
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Add
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Point</MenuItem>
            <MenuItem onClick={handleClose}>Segment</MenuItem>
            <MenuItem onClick={handleClose}>Circle</MenuItem>
          </Menu>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Hierarchy);
