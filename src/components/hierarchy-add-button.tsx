import React, { Component } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Clear from "@material-ui/icons/Clear";
import Remove from "@material-ui/icons/Remove";
import CropFree from "@material-ui/icons/CropFree";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 380,
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    speedDial: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  });

const actions = [
  { icon: <Clear />, name: "Point" },
  { icon: <Remove />, name: "Segment" },
  { icon: <Remove />, name: "Droite" },
  { icon: <CropFree />, name: "Plan" },
  { icon: <RadioButtonUnchecked />, name: "Cercle" },
];

class HierarchyAddButton extends Component {
  state = {
    open: false,
    hidden: false,
  };

  render() {
    //const { classes } = this.props;

    const handleOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };

    return (
      <div>
        {/* <Backdrop open={this.state.open} /> */}
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          // className={classes.speedDial}
          hidden={this.state.hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={this.state.open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

export default withStyles(styles)(HierarchyAddButton);
