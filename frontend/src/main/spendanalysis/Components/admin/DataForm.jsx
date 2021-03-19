import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
    Box,
    Grid,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment
} from '@material-ui/core'
import {
    Done
} from '@material-ui/icons';
import DropDownSelect from '../../../../global/dropDownSelect'
import {
    updateRolesList
} from '../../../../global/utils/utils.actions'
import axios from 'axios'
import {
    updateData,
    postData
} from '../../../../global/table/table.actions'
import {
    verifyUser
} from './Acions'
function FormPopUp(props) {
    const { actionType, formData: formDataEdit, formState, formCloseEvent, updateDataFunction, apiLink, table } = props
    const tableStates = useSelector(state => state.tableStates)
    const { allRolesList } = useSelector(state=>state.utilsData)
    const { perPage, currentPage, query } = tableStates

    const initialState = {
        Email: "",
        RoleReference: "",
        RoleValidity: ""
    }
    const [popupFormData, setPopupFormData] = useState(initialState)
    const [isEmailVerfied, setEmailVerification]= useState(false)
    const [roleName, setRoleName]= useState('')
    const [pk, setPk ]= useState('')
    const dispatch = useDispatch()
    let updateApidata = {
        pk: pk,
        project: "1",
        payload: JSON.stringify(popupFormData)
    }
    let fetchApiData = {
        query: JSON.stringify(query),
        currentPage: currentPage,
        perPage: perPage,
        project: "1",
    }
    const handleSave = () => {
        dispatch(updateData(
            apiLink, updateApidata, fetchApiData
        ));
        formCloseEvent()
    }
    const setVerification= (resData)=>{
        setEmailVerification(true)
        // setPopupFormData({ ...popupFormData, [`pk`]:  resData[0].pk})
        setPk(resData[0].pk)
    }
    const verifyEmail =(e)=>{
        setPopupFormData({ ...popupFormData, [`Email`]: e.target.value })
        dispatch(verifyUser({
            email: e.target.value
        }, setVerification))
    }
    useEffect(() => {
        if (actionType == "Edit") {
            let updatedData = {}
            Object.keys(initialState).map((element) => {
                updatedData[element] = formDataEdit.fields[element]
            })
            setEmailVerification(true)
            setPopupFormData(updatedData)
        }
        dispatch(updateRolesList())
    }, [])
    const textFieldId = 'outlined-basic'
    const textFieldVarient = 'outlined'
    return (
        <>
            <Dialog
                open={formState}
                onClose={formCloseEvent}
                aria-labelledby="form-dialog-title"
                fullWidth={false}
                maxWidth='lg'
            >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h6" component="h2" align="center" gutterBottom>
                        <Box >{actionType} {table}
                        </Box>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box m={3}>
                        <DropDownSelect
                            dataList={allRolesList}
                            label="Role"
                            DataType="WithPkAndFieldName"
                            fieldName ="Permissions"
                            selectedValue={roleName}
                            onChangeEvent={(e) => {
                                setPopupFormData({...popupFormData, [`RoleReference`]:e.target.options[e.target.selectedIndex].getAttribute("pk")})
                                setRoleName(e.target.value)
                            }
                            }
                        />
                    </Box>
                    <Box m={3}>
                        <TextField
                            required
                            id={textFieldId}
                            variant={textFieldVarient}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment>
                                    { isEmailVerfied &&
                                        <IconButton>
                                        <Done color="primary"/>
                                        </IconButton>
                                    }
                                  </InputAdornment>
                                )
                              }}
                            style ={{width:"100%"}}
                            label="Email"
                            multiline
                            value={popupFormData["Email"]}
                            onChange={(e) => verifyEmail(e)}
                        />
                    </Box>
                    <Box m={3} mt ={4}>
                        <TextField
                            id="outlined-basic"
                            required
                            variant="outlined"
                            style={{ width: "100%" }}
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Validity"
                            value={popupFormData["RoleValidity"]}
                            onChange={(e) => setPopupFormData({ ...popupFormData, [`RoleValidity`]: e.target.value })}
                        />
                    </Box>
                </DialogContent>
                <Grid container justify="center">
                    <DialogActions position="centre">
                        {   isEmailVerfied && popupFormData.RoleReference && popupFormData.RoleValidity &&
                            <Button onClick={() => handleSave()} variant="contained" color="primary">
                                {actionType == "Edit" ? "Update" : "Save"}
                            </Button>
                        }
                        
                        <Button onClick={formCloseEvent} variant={textFieldVarient} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </>
    )
}

export default FormPopUp;
