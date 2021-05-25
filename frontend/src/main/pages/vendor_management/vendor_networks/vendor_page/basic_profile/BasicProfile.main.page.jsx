import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import MoreIcon from "@material-ui/icons/More";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Certificate from "./certificate";

import ContactMailIcon from "@material-ui/icons/ContactMail";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

//Modals
import CardSample from "./cardVendorBasicInfo";
import AddLiscenceModalBody from "./add_liscence_modal/AddLiscenceModalBody";

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: "1em" },
  contact: {
    fontWeight: "bold",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function BasicProfile({ vendor }) {
  const classes = useStyles();
  const [certlisc, setCertlisc] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [refreshCert, setRefreshCert] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("vendor in basic profile", vendor);
  let id = "";

  useEffect(() => {
    if (vendor && vendor.id) {
      id = vendor && vendor.id;

      var config = {
        method: "get",
        url: `http://127.0.0.1:8090/api/vendor_management/cert-lisc-list/?vendorId=${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then((res) => {
          const { data } = res;
          const { error, message } = JSON.stringify(data);
          if (!error) {
            console.log("data", data);
            setCertlisc(data);
          } else alert("Error");
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [vendor, refreshCert]);

  console.log("certlisc", certlisc);

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item sm={6}>
          <Card className={classes.root}>
            <CardContent>
              <Grid container>
                <Grid item sm={12}>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    style={{ paddingBottom: "1em" }}
                  >
                    <Grid item>
                      <Grid container spacing={2} alignContent="center">
                        <Grid item>
                          <ContactMailIcon />
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">
                            Contact Information
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button color="secondary" size="small">
                        Edit Contact Information
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider />
                </Grid>

                <Grid item style={{ paddingTop: "1em" }}>
                  <span className={classes.contact}>Contact Name : </span>
                  {vendor && vendor.contact_name}
                  <br />
                  <span className={classes.contact}>Email : </span>
                  {vendor && vendor.contact_email}
                  <br />
                  <span className={classes.contact}> Phone : </span>
                  {vendor && vendor.contact_phone}
                  <br />
                  <span className={classes.contact}> Department : </span>
                  {vendor && vendor.department}
                  <br />
                  <span className={classes.contact}> Designation : </span>
                  {vendor && vendor.designation}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Card className={classes.root}>
            <CardContent>
              <Grid container>
                <Grid item sm={12}>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    style={{ paddingBottom: "1em" }}
                  >
                    <Grid item>
                      <Grid container spacing={2} alignContent="center">
                        <Grid item>
                          <VpnKeyIcon />
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">External IDs</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button color="secondary" size="small">
                        Add External IDs
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider />
                </Grid>
                No External ID Added
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CardSample
        id="tags"
        icon="tags"
        title="Applied Tags"
        buttonTitle="Apply Tags"
        VendorDetail={vendor && vendor.tags}
        Vendor_full={vendor && vendor}
      />
      <CardSample
        id="category"
        icon="category"
        title="Applied Categories"
        buttonTitle="Apply Category"
        VendorDetail={vendor && vendor.category}
        Vendor_full={vendor && vendor}
      />

      <CardSample
        id="trade"
        icon="trade"
        title="Applied Trades"
        buttonTitle="Apply Trades"
        VendorDetail={vendor && vendor.trades}
        Vendor_full={vendor && vendor}
      />

      <CardSample
        id="payment"
        icon="payment"
        title="Payment Terms"
        buttonTitle="Apply Payment Term"
        VendorDetail={vendor && vendor.payment_term}
        Vendor_full={vendor && vendor}
      />
      <CardSample
        id="diversity"
        icon="diversity"
        title="Diversity Tags"
        buttonTitle="Apply Diversity Tag"
        VendorDetail={vendor && vendor.diversity}
        Vendor_full={vendor && vendor}
      />

      <Card className={classes.root}>
        <CardContent>
          <Grid container>
            <Grid item sm={12}>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                style={{ paddingBottom: "1em" }}
              >
                <Grid item>
                  <Grid container spacing={2} alignContent="center">
                    <Grid item>
                      <BusinessCenterIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        Certificates & Licenses
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button color="secondary" size="small" onClick={handleOpen}>
                    Add Certificates & Licenses
                  </Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paper}>
                        <AddLiscenceModalBody
                          setOpen={setOpen}
                          vendor={vendor && vendor}
                          refreshCert={refreshCert}
                          setRefreshCert={setRefreshCert}
                        />
                      </div>
                    </Fade>
                  </Modal>
                </Grid>
              </Grid>
              <Divider />
            </Grid>

            <Grid item style={{ paddingTop: "1em" }} sm={12}>
              <Grid container>
                {certlisc.data &&
                  certlisc.data.map((cert) => (
                    <Grid
                      item
                      style={{ paddingRight: "0.5em" }}
                      sm={3}
                      key={cert.id}
                    >
                      <Certificate
                        cert={cert}
                        refreshCert={refreshCert}
                        setRefreshCert={setRefreshCert}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
