import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FileUploadMain from "./file-upload/file-upload.main";
import ContentHistoryTable from "./history/history.table";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: "#cad2c5",
    height: "0.5em",
  },
}));

export default function SimpleTabs({ ticket_id }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("ticket id from tab", ticket_id);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          classes={{
            indicator: classes.indicator,
          }}
          onChange={handleChange}
          aria-label="simple tabs example"
          style={{ backgroundColor: "#15616d" }}
        >
          <Tab label="File Upload" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FileUploadMain ticket_id={ticket_id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContentHistoryTable ticket_id={ticket_id} />
      </TabPanel>
    </div>
  );
}
