import {
  createMuiTheme,
  responsiveFontSizes,
  makeStyles,
} from "@material-ui/core/styles";
import { cyan } from "@material-ui/core/colors";

let theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: cyan,
    secondary: cyan,
  },
});

theme = responsiveFontSizes(theme);

const useStyle = makeStyles(() => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "auto",
      marginLeft: "auto",
      marginRight: "auto",
    },
    backgroundColor: "",
    color: theme.palette.text.primary,
    maxHeight: "80%",
    overflowY: "scroll",
    maxWidth: "90%",
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1200 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
      padding: theme.spacing(1),
    },
  },
}));

export { theme, useStyle };
