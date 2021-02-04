import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTheme } from "../../redux/actions/themeActions";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Button as MuiButton,
  Container,
  Grid,
  Hidden,
  Tooltip,
  Typography as MuiTypography,
  Link,
  withWidth
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const Typography = styled(MuiTypography)(spacing);

const TypographyMuted = styled(Typography)`
  color: ${props => props.theme.palette.grey[700]};
`

const IntroductionBase = styled.div`
  padding: 3vw 5vw;
`;

const IntroductionContent = styled.div`
  padding: ${props => props.theme.spacing(6)}px;
  line-height: 150%;
`;

const IntroductionImage = styled.img`
  margin: ${props => props.theme.spacing(6)}px;
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 6px 18px 0 rgba(18,38,63,.1);
`;

const IntroductionSubtitle = styled(Typography)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  color: ${props => props.theme.palette.grey[800]};
  font-family: ${props => props.theme.typography.fontFamily};
  margin-bottom: ${props => props.theme.spacing(4)}px;
`;

const BrandIcons = styled.div(spacing);

const BrandIcon = styled.img`
  vertical-align: middle;
  margin: ${props => props.theme.spacing(1)}px;
  height: auto;
`;

const BrandIconStyledComponents = styled.span`
  font-size: 1.875rem;
  vertical-align: middle;
  margin: ${props => props.theme.spacing(1)}px;
  cursor: default;
`;

const DemoListContent = styled.div`
  ${spacing};
  background: ${props => props.theme.palette.common.white};
  text-align: center;
`;

const DemoContent = styled.div(spacing);

const DemoLink = styled.div`
  cursor: pointer;
`;

const DemoImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 4px 12px 0 rgba(18,38,63,.125);
  transition: .2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const JoinUsContent = styled.div`
  ${spacing};
  text-align: center;
`;

const FaqContent = styled(Typography)`
  ${spacing};
  background: ${props => props.theme.palette.common.white};
  text-align: center;
`

const Accordion = styled(MuiAccordion)`
  border: 1px solid rgba(0, 0, 0, .125);
  border-radius: 6px;
  box-shadow: 0;
  text-align: left;
  margin: 16px 0 !important;

  &:before {
    display: none;
  }
`

const AccordionSummary = styled(MuiAccordionSummary)`
  padding: 0 16px;
  box-shadow: 0;
  min-height: 48px !important;

  .MuiAccordionSummary-content {
    margin: 12px 0 !important;
  }
`

const AccordionDetails = styled(MuiAccordionDetails)`
  padding-left: 16px;
  padding-right: 16px;
`

const Button = styled(MuiButton)(spacing);

function Introduction() {
  return (
    <IntroductionBase>
      <Container>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} xl={6}>
            <IntroductionContent>
              <Typography variant="h1" gutterBottom>
                Modern, Flexible and Responsive
                <br /> Material-UI Admin Template
              </Typography>
              <IntroductionSubtitle>
                A professional package that comes with plenty of UI components,
                forms, tables, charts, dashboards, pages and svg icons. Each one is
                fully customizable, responsive and easy to use.
              </IntroductionSubtitle>

              <BrandIcons mb={4}>
                <Tooltip title="Material-UI">
                  <BrandIcon
                    alt="Material-UI"
                    src="/static/img/brands/material-ui.svg"
                    style={{ width: "44px" }}
                  />
                </Tooltip>
                <Tooltip title="Webpack">
                  <BrandIcon
                    alt="Webpack"
                    src="/static/img/brands/webpack.svg"
                    style={{ width: "48px" }}
                  />
                </Tooltip>
                <Tooltip title="Npm / Yarn">
                  <BrandIcon
                    alt="Npm"
                    src="/static/img/brands/npm.svg"
                    style={{ width: "48px" }}
                  />
                </Tooltip>
                <Tooltip title="Styled Components">
                  <BrandIconStyledComponents>
                    <span role="img" aria-label="Styled Components">
                      💅
                    </span>
                  </BrandIconStyledComponents>
                </Tooltip>
                <Tooltip title="React">
                  <BrandIcon
                    alt="React"
                    src="/static/img/brands/react.svg"
                    style={{ width: "50px" }}
                  />
                </Tooltip>
                <Tooltip title="Redux">
                  <BrandIcon
                    alt="Redux"
                    src="/static/img/brands/redux.svg"
                    style={{ width: "38px" }}
                  />
                </Tooltip>
              </BrandIcons>

              <MuiButton
                href="#demos"
                variant="contained"
                color="primary"
              >
                View Demos
              </MuiButton>
              <Button
                component={RouterLink}
                to="/documentation/welcome"
                variant="outlined"
                color="default"
                ml={2}
              >
                Documentation
              </Button>
            </IntroductionContent>
          </Grid>
          <Hidden lgDown>
            <Grid item xs={12} xl={6}>
              <IntroductionImage
                alt="Material App - React Admin Template"
                src={`/static/img/screenshots/blue.png`}
                />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </IntroductionBase>
  );
}

const Demo = ({ dispatch, id, title, img }) => {
  const history = useHistory();

  const toggleDemo = (id) => {
    dispatch(setTheme(id));
    history.push("/dashboard/analytics");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <DemoContent px={4}>
        <DemoLink onClick={() => toggleDemo(id)}>
          <DemoImage
            alt={title}
            src={`/static/img/screenshots/${img}.png`}
          />
        </DemoLink>
        <Spacer mb={3} />
        <Typography variant="h6">{title}</Typography>
      </DemoContent>
    </Grid>
  );
}

const ConnectedDemo = connect()(Demo);

function DemoList({ width }) {
  return (
    <DemoListContent id="demos" mx={isWidthUp("lg", width) ? -10 : -5} py={16}>
      <Container>
        <Typography variant="h3" gutterBottom>
          Multiple Demos
        </Typography>
        <TypographyMuted variant="subtitle1" gutterBottom>
          The package includes 50+ prebuilt pages, 6 theme variants and 2 prebuilt dashboards.
        </TypographyMuted>
        <Spacer mb={8} />

        <Grid container spacing={6}>
          <ConnectedDemo id={0} title="Dark variant - React Admin Template" img="dark" />
          <ConnectedDemo id={1} title="Light variant - React Admin Template" img="light" />
          <ConnectedDemo id={2} title="Blue variant - React Admin Template" img="blue" />
          <ConnectedDemo id={3} title="Green variant - React Admin Template" img="green" />
          <ConnectedDemo id={4} title="Indigo variant - React Admin Template" img="indigo" />
          <ConnectedDemo id={5} title="Teal variant - React Admin Template" img="teal" />
        </Grid>
      </Container>
    </DemoListContent>
  );
}

function Faq({ width }) {
  return (
    <FaqContent id="demos" mx={isWidthUp("lg", width) ? -10 : -5} py={16}>
      <Container>
        <Typography variant="h3" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <TypographyMuted variant="subtitle1" gutterBottom>
          The questions below have been selected from those most commonly asked by our customers.
        </TypographyMuted>
        <Spacer mb={8} />

        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} xl={8}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq1-content"
                id="faq1-header"
              >
                <Typography variant="subtitle1">Can I use this template for my client?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TypographyMuted variant="subtitle1">
                  Yes, the marketplace license allows you to use this theme in any end products. For more information on licenses, <Link href="https://material-ui.com/store/license/" target="_blank" rel="noreferrer noopener">click here</Link>. 
                </TypographyMuted>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq2-content"
                id="faq2-header"
              >
                <Typography variant="subtitle1">Does this product support TypeScript?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TypographyMuted variant="subtitle1">
                  Yes, the TypeScript version is included in the Standard Plus and Extended License. The default (JavaScript) version is available on all licenses.
                </TypographyMuted>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq2-content"
                id="faq2-header"
              >
                <Typography variant="subtitle1">Are design assets (Figma, Sketch) included?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TypographyMuted variant="subtitle1">
                  Yes, design assets (Figma and Sketch) are included in the Standard Plus and Extended License.
                </TypographyMuted>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq2-content"
                id="faq2-header"
              >
                <Typography variant="subtitle1">How can I request support?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TypographyMuted variant="subtitle1">
                  You can use our dedicated support email (<Link href="mailto:support@bootlab.io">support@bootlab.io</Link>) to send your issues or feedback. We are here to help.
                </TypographyMuted>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </FaqContent>
  );
}

function JoinUs() {
  return (
    <JoinUsContent pt={12} pb={4}>
      <Container>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="h2" gutterBottom>
              Join over 3,000 developers who are already working with our
              products
            </Typography>
            <Spacer mb={4} />

            <MuiButton
              href="https://material-ui.com/store/items/material-app/"
              variant="contained"
              color="primary"
              size="large"
              target="_blank"
            >
              Purchase Now
            </MuiButton>
          </Grid>
        </Grid>
      </Container>
    </JoinUsContent>
  );
}

function Presentation({ width }) {
  return (
    <React.Fragment>
      <Introduction />
      <DemoList width={width} />
      <Faq width={width} />
      <JoinUs />
    </React.Fragment>
  );
}

export default withWidth()(Presentation);
