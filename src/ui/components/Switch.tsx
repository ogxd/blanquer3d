import React, { Component } from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import MaterialSwitch, {
  SwitchClassKey,
  SwitchProps,
} from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EventSubscriber from "../../core/EventSubscriber";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface MySwitchProps {
  labelOn?: string;
  labelOff?: string;
}

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(MaterialSwitch);

class Switch extends Component<MySwitchProps> {
  public static defaultProps = {
    labelOn: "On",
    labelOff: "Off",
  };

  state = {
    checked: false,
  };

  readonly onStateChanged = new EventSubscriber<boolean>();

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.state.checked = event.target.checked;
    this.setState(this.state);
    this.onStateChanged.dispatch(event.target.checked);
  };

  render() {
    return (
      <FormGroup>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>{this.props.labelOff}</Grid>
            <Grid item>
              <AntSwitch
                checked={this.state.checked}
                onChange={this.handleChange}
                name="checkedC"
              />
            </Grid>
            <Grid item>{this.props.labelOn}</Grid>
          </Grid>
        </Typography>
      </FormGroup>
    );
  }
}

export default Switch;
