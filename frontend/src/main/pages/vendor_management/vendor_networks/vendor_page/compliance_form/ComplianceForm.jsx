import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MainFormik from './form_generator/Formik.main.page';

import { fetchVenComplianceListStart } from '../../redux/vendorNetworksActions';
import Button from '@material-ui/core/Button';
import localStorage from '../../../../../../common/storage/localStorage';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Rating from '@material-ui/lab/Rating';

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 10,
		borderRadius: 5,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
	},
	bar: {
		borderRadius: 5,
		backgroundColor: '#1a90ff',
	},
}))(LinearProgress);

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
			style={{ width: '100%' }}
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
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		minHeight: 424,
		height: 'auto',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	tab: {
		MuiTabWrapper: {
			flexDirection: 'row',
		},
	},
}));

function ComplianceForm() {
	const classes = useStyles();
	const dispatch = useDispatch();
	let history = useHistory();
	let { id, vendorId } = useParams();

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const { complianceQuery, currentPage, perPage, ven_compliance_list } =
		useSelector((state) => state.vendorNetworks);

	let fetchApiData = {
		vendorId: vendorId,
		complianceQuery: JSON.stringify(complianceQuery),
		currentPage: currentPage,
		perPage: 10,
	};
	console.log('vendors.count', ven_compliance_list.data);

	useEffect(() => {
		dispatch(fetchVenComplianceListStart({ fetchApiData }));
	}, []);

	let vendorTemp =
		ven_compliance_list.data &&
		ven_compliance_list.data.filter((temp) => temp.id == id);

	vendorTemp && console.log('vendorTemp', vendorTemp[0].compliance_template);

	// let isCompleted =
	//   vendorTemp && vendorTemp[0].overall_status == "completed" ? true : false;

	// let formSubmission =
	//   vendorTemp && vendorTemp[0].review_template.filter((sec) => !sec.submitted);

	// let formSub =
	//   vendorTemp && vendorTemp[0].review_template.filter((sec) => sec.submitted);

	// let progress =
	//   formSub && formSub.length / (formSub.length + formSubmission.length);

	// let overall_rating =
	//   vendorTemp &&
	//   vendorTemp[0].review_template.map(
	//     (sec) =>
	//       sec.questions.reduce((prev, currentQues) => {
	//         if (currentQues.question_type == "Dropdown")
	//           prev += parseInt(currentQues.selectedAnswer);
	//         return prev;
	//       }, 0) /
	//       sec.questions.filter((ques) => ques.question_type == "Dropdown").length
	//   );

	// let finalRating =
	//   overall_rating &&
	//   overall_rating.reduce((a, b) => parseInt(a) + parseInt(b), 0) /
	//     overall_rating.length;

	// console.log("finalRating", finalRating);
	// console.log("overall_rating", overall_rating);

	const handleSubmit = () => {
		// vendorTemp[0].review_template.map((sec) => {
		//   sec.questions.map((ques, index) => {
		//     console.log("here is the ques", ques);
		//     const { userId } = localStorage.get("user") && localStorage.get("user");
		//     let post_data = {};
		//     post_data.vendor_id = parseInt(vendorId);
		//     post_data.template_id = parseInt(id);
		//     post_data.section_name = sec.section_name;
		//     post_data.question_no = index + 1;
		//     post_data.question_text = ques.question_text;
		//     post_data.answer = ques.selectedAnswer;
		//     post_data.question_type = ques.question_type;
		//     post_data.created_by = userId;
		//     console.log("post_data", post_data);
		//     var config = {
		//       method: "post",
		//       url: `http://127.0.0.1:8090/api/vendor_management/review-response/`,
		//       headers: {
		//         "Content-Type": "application/json",
		//       },
		//       data: JSON.stringify(post_data),
		//     };
		//     axios(config)
		//       .then((res) => {
		//         console.log(res);
		//         const { data } = res;
		//         const { error, message } = JSON.stringify(data);
		//         if (!error) {
		//           console.log("posted data", data);
		//           //alert("Questions Added Successfully");
		//           // dispatch(fetchVenReviewlistStart({ fetchApiData }));
		//         } else alert("Error");
		//         console.log(data);
		//       })
		//       .catch(function (error) {
		//         console.log(error);
		//       });
		//   });
		// });
		// let post_data1 = {
		//   overall_status: "completed",
		//   overall_rating: Math.round(finalRating),
		// };
		// var config = {
		//   method: "put",
		//   url: `http://127.0.0.1:8090/api/vendor_management/review-response-status/${id}/`,
		//   headers: {
		//     "Content-Type": "application/json",
		//   },
		//   data: post_data1,
		// };
		// axios(config)
		//   .then((res) => {
		//     console.log(res);
		//     const { data } = res;
		//     const { error, message } = JSON.stringify(data);
		//     if (!error) {
		//       console.log("posted data", data);
		//       alert("Review Response Status Updated Successfully");
		//       dispatch(fetchVenReviewlistStart({ fetchApiData }));
		//     } else alert("Error");
		//     console.log(data);
		//   })
		//   .catch(function (error) {
		//     console.log(error);
		//   });
	};

	return (
		<Grid container>
			<Grid item sm={12}>
				<Grid container spacing={1}>
					<Grid item>
						<ArrowBackIcon
							className={classes.backArrow}
							onClick={() => {
								history.push({
									pathname: `/vendor-management/vendor/${vendorId}`,
								});
							}}
						/>
					</Grid>
					<Grid item>
						<Typography variant='h6'>
							{vendorTemp && vendorTemp[0].compliance_form_name}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item sm={12} style={{ margin: '1.3em 0em' }}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item sm={0.5}>
						<Typography variant='caption'>Progress</Typography>
					</Grid>
					<Grid item sm={5}>
						<BorderLinearProgress
							variant='determinate'
							// value={progress * 100}
						/>
					</Grid>
					<Grid item sm={2}>
						{/* {Math.round(progress * 100)} % */}
					</Grid>
					<Grid item>
						<Grid container alignItems='center' spacing={1}>
							<Grid item>Performance Review Rating</Grid>
							<Grid item>
								<Rating
									name='readonly'
									// value={finalRating && finalRating}
									readOnly
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item sm={12}>
				<div className={classes.root}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						className={classes.tabs}
					>
						{vendorTemp &&
							vendorTemp[0].compliance_template.map((sec, index) => (
								<Tab
									label={sec.section_name}
									icon={
										<CheckCircleIcon
											fontSize='small'
											style={{
												color: 'green',
												display: sec.submitted ? 'inline-block' : 'none',
											}}
										/>
									}
									style={{
										minWidth: '20em',
										display: 'flex',
									}}
									className={classes.tab}
									{...a11yProps(0)}
								/>
							))}
					</Tabs>
					{vendorTemp &&
						vendorTemp[0].compliance_template.map((sec, index) => {
							return (
								<TabPanel value={value} index={index}>
									<MainFormik
										section={sec}
										sectionName={sec.section_name}
										setValue={setValue}
										value={value}
										//isCompleted={isCompleted}
									/>
								</TabPanel>
							);
						})}
				</div>
			</Grid>
			<Grid item sm={12}>
				<Grid container justify='center' style={{ marginTop: '0.8em' }}>
					<Grid item>
						<Button
							variant='contained'
							color='primary'
							// disabled={
							//   (formSubmission && formSubmission.length) ||
							//   (isCompleted && isCompleted)
							//     ? true
							//     : false
							// }
							onClick={handleSubmit}
						>
							Submit Review
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ComplianceForm;
