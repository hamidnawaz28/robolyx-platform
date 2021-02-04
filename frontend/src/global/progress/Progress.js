import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    LinearProgress,
    Box
} from '@material-ui/core';

const  Progess = ()=> {
  const progressStatus = useSelector(state => state.updateProgressStatus)
  const { status } = progressStatus
  debugger;
  return (
    <div>
      <Dialog
        open={status}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen = {false}
        maxWidth = 'lg'
      >
        <Box style={{width:"200px"}} pb={2} pt ={2} ml={2} mr={2}>
            <LinearProgress/>
        </Box>
      </Dialog>
    </div>
  );
}
export default Progess 