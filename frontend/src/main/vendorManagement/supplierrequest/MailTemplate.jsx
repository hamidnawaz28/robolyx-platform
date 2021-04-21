import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { height } from "@material-ui/system";
const useStyles = makeStyles((theme) => ({
  mailContainer: {
    padding: "20px",
    backgroundColor: "white",
  },
  mailHead: {},
  mailContent: {
    padding: "15px",
    boxShadow: "0px 0px 9px 0.08px #c1c1c1",
  },
  companyLogo: {
    width: "100%",
    backgroundColor: "gainsboro",
    height: "50px",
  },
}));
const MailTemplate = ({ data, submitForm }) => {
  const classes = useStyles();
  const { companyName, firstName, lastName, deadline } = data;
  return (
    <div className={classes.mailContainer}>
      <div className={classes.mailHead}>
        <h4>Preview Registration Request</h4>
        <h5>
          Robolyx Registration Team to{" "}
          {companyName ? `${companyName}` : "[ Company Name ] "}
        </h5>
        <p>
          {firstName || lastName
            ? `${firstName} ${lastName} `
            : "[ Requested By ] "}
          ,Action Required
        </p>
      </div>
      <img src="../" className={classes.companyLogo} />
      <p className={classes.mailContent}>
        <h4>Dear {firstName ? `${firstName} ` : "[ First Name] "}</h4>
        <p>
          {firstName || lastName
            ? `${firstName} ${lastName} `
            : "[ Requested By ] "}{" "}
          is commited to a culture focused on safety,sustainability,and
          environmental compliance.To support their vision,
          {firstName || lastName
            ? `${firstName} ${lastName} `
            : "[ Requested By ] "}{" "}
          has parterned with Robolyx(www.robolyx.com) to manage and streamline
          the pre-qualification process for new suppliers.
        </p>

        <p>
          {firstName || lastName
            ? `${firstName} ${lastName} `
            : "[ Requested By ] "}{" "}
          is requiring their suppliers to submit important documentation for
          verification before performing work. Waqas Khan -
          waqas.khan@boral.com.au asked us to contact you directly to help you
          complete the registration before
          {deadline ? ` ${deadline} ` : "[ Deadline]"} . It is your
          responsibility to ensure compliance within{" "}
          {firstName || lastName
            ? `${firstName} ${lastName} `
            : "[ Requested By ] "}
          's established timeframe to avoid disruption with ongoing or future
          projects. Complete your registration by going to{" "}
          <a href="https://www.Robolyx.com">https://www.Robolyx.com</a> or by
          contacting our dedicated registration team. Once registration is
          complete,{" "}
          {firstName || lastName
            ? `${firstName} ${lastName} `
            : "[ Requested By ] "}{" "}
          will be notified, and you can start uploading your safety
          documentation to your Avetta profile. If you have any question, please
          reach out to Waqas Khan-Wagas khan@boral.com.au or contact Avetta. We
          look forward to working with you!
        </p>
        <h4>The Avetta Registration Team</h4>
        <Button
          variant="contained"
          color="primary"
          href="#contained-buttons"
          onClick={submitForm}
        >
          Register Now
        </Button>
      </p>
    </div>
  );
};
export default MailTemplate;
