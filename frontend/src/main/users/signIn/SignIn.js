import React from "react";
import styled from "styled-components";
import SignInForm from "./partials/SignInForm";

import Helmet from 'react-helmet';

import {
  Paper,
  Typography,
  Link,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#373e46',
    color: 'white',
    '&:hover': {
      boxShadow: '#232f3e 0px 54px 55px, #232f3e 0px -12px 30px, #232f3e 0px 4px 6px, #232f3e 0px 12px 13px, #BCE7FD 0px -3px 5px'
    }
  }
}));

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

function SignIn(props) {
  const classes = useStyles();
  const { userSignIn } = props;
  return (
    <Wrapper className={classes.root}>
      <Helmet title="Sign In" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        LOGIN TO YOUR ACCOUNT
      </Typography>
      <SignInForm userSignIn={userSignIn} />
      <Typography component="h5" align="center" gutterBottom>
        Don&apos;t have an account?
      </Typography>
      <Link href="/auth/sign-up">
        <Typography component="h5" align="center" gutterBottom>Create an account</Typography>
      </Link>
    </Wrapper>
  );
}

export default SignIn;
