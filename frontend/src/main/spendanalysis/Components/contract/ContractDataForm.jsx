import { connect } from "react-redux";
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage, useFormik  } from 'formik';
import * as Yup from 'yup';
import { updateData, postData } from '../../../../global/table/table.actions'
let initialState = {
    CONTRACT_EXPIRY_DATE : "",
    DATE_SIGNED : "",
    COMMENCEMENT_DATE : "",
    REVIEW_DATE : "",
    PRICE_REVIEW_DATE : "",
    CREATED_DATE : "",
    MODIFIED_DATE : "",
    CONTRACT_INC_EXPIRY_DATE : "",
    SUPPLIER_NAME : "",
    CONTRACT_NUMBER : "",
    CONTRACT_TITLE : "",
    SUPPLY_TYPE : "",
    STATUS : "",
    OWNER : "",
    CONTRACT_ATTACHMENTS : "",
    OTHER_ATTACHMENTS : "",
    CONTRACT_INSURANCE_REQUIRED : "",
    CONTRACT_RATES : "",
    SUPPLIER_CONTRACT_NAME : "",
    SUPPLIER_CONTRACT_PHONE : "",
    SUPPLIER_CONTRACT_EMAIL : "",
    SITE : "",
    INITIAL_TERM : "",
    ONGOING : "",
    VALUE : "",
    LOCATION_OF_HARD_COPY_CONTRACT_DOCUMENT : "",
    NOTES : "",
    CONTRACT_FORM : "",
    IS_MANAGED_AS_PANEL_CONTRACTOR : "",
    PANEL_RANKING : "",
    CONTRACT_RISK : "",
    CONTRACT_TYPES : "",
    CONTRACT_STATUS : "",
    CONTRACT_MANAGER : "",
    CONTRACT_INITIATOR : "",
    ADMINISTRATOR : "",
    BUSINESS_REPRESENTATIVE : "",
    PURCHASE_TYPE : "",
    CONTRACT_ITEMS : "",
    DIVISIONS : "",
    REGIONS : "",
    CREATED_BY : "",
    MODIFIED_BY : "",
    INSURANCE_TYPE : ""
}
 const validate = values => {
   const errors = {};
    if (!values.CONTRACT_EXPIRY_DATE) {
        errors.CONTRACT_EXPIRY_DATE = 'Required';
    } 
    if (!values.DATE_SIGNED) {
        errors.DATE_SIGNED = 'Required';
    }
    if (!values.COMMENCEMENT_DATE) {
        errors.COMMENCEMENT_DATE = 'Required';
    }
    if (!values.CREATED_DATE){
        errors.CREATED_DATE = 'Required';
    }
    if (!values.MODIFIED_DATE){
        errors.MODIFIED_DATE = 'Required';
        }
    if (!values.SUPPLIER_NAME){
        errors.SUPPLIER_NAME = 'Required';
    }
    if (!values.CONTRACT_NUMBER){
        errors.CONTRACT_NUMBER = 'Required';
    }
    if (!values.SUPPLY_TYPE){
        errors.SUPPLY_TYPE = 'Required';
    }
    if (!values.STATUS){
        errors.STATUS = 'Required';
    }
    if (!values.CONTRACT_STATUS){
        errors.CONTRACT_STATUS = 'Required';
    }
    if (!values.CONTRACT_MANAGER){
        errors.CONTRACT_MANAGER = 'Required';
    }
    if (!values.CONTRACT_ITEMS){
        errors.CONTRACT_ITEMS = 'Required';
    }
    return errors;
 };
    
function FormPopUp(props) {
    const formik = useFormik({
        initialValues: initialState,
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    const { actionType, formData, formState, formCloseEvent, updateDataFunction, apiLink, table } = props
    const tableStates = useSelector(state => state.tableStates)
    const { perPage, currentPage, query } = tableStates

    
    const [popupFormData, setPopupFormData] = useState(initialState)
    const credentials = apiLink
    const dispatch = useDispatch()
    let updateApidata = {
        pk: formData.pk,
        payload: JSON.stringify(popupFormData),
    }
    let postDataApi = {
        payload: JSON.stringify(popupFormData),
        project: "1",
    }
    let fetchApiData = {
        query: JSON.stringify(query),
        currentPage: currentPage,
        perPage: perPage,
        project: "1"
    }
    const handleSave = () => {
        if (actionType == "Edit") {
            dispatch(updateData(
                apiLink, updateApidata, fetchApiData
            ));
        }
        else {
            dispatch(postData(
                apiLink, postDataApi, fetchApiData
            ));
        }
        formCloseEvent()
    }
    useEffect(() => {
        if (actionType == "Edit") {
            let updatedData = {}
            Object.keys(initialState).map((element) => {
                updatedData[element] = formData.fields[element]
            })
            initialState = updatedData
            setPopupFormData(updatedData)
        }
    }, [])
    const textFieldId = 'outlined-basic'
    const textFieldVarient = 'outlined'
    return (

        <>
            <div>
                <Dialog open={formState} onClose={formCloseEvent} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            <Box >{actionType} {table}
                            </Box>
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues = { initialState }
                            validationSchema = { Yup.object({
                                // CONTRACT_EXPIRY_DATE: Yup.string()
                                //     .required('Required'),
                                // DATE_SIGNED: Yup.string()
                                //     .required('Required'),
                                // COMMENCEMENT_DATE: Yup.string()
                                //     .required('Required'),
                                // CREATED_DATE: Yup.string()
                                //     .required('Required'),
                                // MODIFIED_DATE: Yup.string()
                                //     .required('Required'),
                                SUPPLIER_NAME: Yup.string()
                                    .required('  *Required'),
                                CONTRACT_NUMBER: Yup.string()
                                    .required('  *Required'),
                                SUPPLY_TYPE: Yup.string()
                                    .required('  *Required'),
                                STATUS: Yup.string()
                                    .required('  *Required'),
                                CONTRACT_STATUS: Yup.string()
                                    .required('  *Required'),
                                CONTRACT_MANAGER: Yup.string()
                                    .required('  *Required'),
                                CONTRACT_ITEMS: Yup.string()
                                    .required('  *Required')
                            })}
                            onSubmit={(values) => {
                                debugger
                                alert(JSON.stringify(values, null, 2))
                            }}
                        >   
                            <Form>
                                <div>
                                    <label htmlFor="SUPPLIER_NAME">SUPPLIER_NAME</label>
                                    <Field name="SUPPLIER_NAME" type="text" />
                                    <ErrorMessage component = 'div' name="SUPPLIER_NAME" />
                                </div>
                                <div>
                                    <label htmlFor="CONTRACT_NUMBER">CONTRACT_NUMBER</label>
                                    <Field name="CONTRACT_NUMBER" type="text" />
                                    <ErrorMessage  component = 'div' name="CONTRACT_NUMBER" />
                                </div>
                                <div>
                                    <label htmlFor="SUPPLY_TYPE">SUPPLY_TYPE</label>
                                    <Field name="SUPPLY_TYPE" type="text" />
                                    <ErrorMessage  component = 'div' name="SUPPLY_TYPE" />
                                </div>
                                <div>
                                    <label htmlFor="STATUS">STATUS</label>
                                    <Field name="STATUS" type="text" />
                                    <ErrorMessage  component = 'div' name="STATUS" />
                                </div>
                                <div>
                                    <label htmlFor="CONTRACT_STATUS">CONTRACT_STATUS</label>
                                    <Field name="CONTRACT_STATUS" type="text" />
                                    <ErrorMessage  component = 'div' name="CONTRACT_STATUS" />
                                </div>
                                <div>
                                    <label htmlFor="CONTRACT_MANAGER">CONTRACT_MANAGER</label>
                                    <Field name="CONTRACT_MANAGER" type="text" />
                                    <ErrorMessage  component = 'div' name="CONTRACT_MANAGER" />
                                </div>
                                <div>
                                    <label htmlFor="CONTRACT_ITEMS">CONTRACT_ITEMS</label>
                                    <Field name="CONTRACT_ITEMS" type="text" />
                                    <ErrorMessage  component = 'div' name="CONTRACT_ITEMS" />
                                </div>
                                <Grid container justify="center" position="centre">
                                    <Box m = {1}>
                                        <Button type="submit"  variant="contained" color="primary">
                                            {actionType == "Edit" ? "Update" : "Save"}
                                        </Button>
                                    </Box>
                                    <Box m = {1}>
                                        <Button onClick={formCloseEvent} variant={textFieldVarient} color="primary">
                                            Cancel
                                        </Button>
                                    </Box>
                                </Grid>
                            </Form>
                        </Formik>
                    </DialogContent>
                    {/* <Grid container justify="center" position="centre">
                        <DialogActions position="centre">
                            
                        </DialogActions>
                    </Grid> */}
                </Dialog>
            </div>
        </>
    )
}

export default FormPopUp;

