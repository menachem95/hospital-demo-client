import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Input } from "@mui/material";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import PrinterInfoItem from "../UI/PrinterInfoItem";
import {
  updatePrinters,
  updatePrinterModelStatePrinter,
} from "../../store/displayPrintersSlice";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, useTheme } from "@mui/material";
import PrintDisabledIcon from "@mui/icons-material/PrintDisabled";
import Divider from "@mui/material/Divider";
import { tokens } from "../../theme";
// import img from "./images/minolta.jpg";
// import imga from "./images/5750.png";
import { display } from "@mui/system";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePrinterModelState,
  updatePrinterModelStateOnline,
} from "../../store/displayPrintersSlice";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import SaveIcon from '@mui/icons-material/Save';


const printerKey = {
  address: "כתובת רשת",
  department: "מחלקה",
  room: "חדר",
  description: "פרטים נוספים",
  printerModel: "דגם",
  line: "נקודה בקיר",
  pag: "PAG מספר",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



// function BootstrapDialogTitle(props) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

const AddPrinter = ({socket}) => {
  
  const { printerModelState, printers } = useSelector((state) => state.display);
  const dispatch = useDispatch();
  const [editedPrinter, setEditedPrinter] = useState(printerModelState.printer);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const editMode = true

  const {
    _id,
    address,
    department,
    room,
    description,
    printerModel,
    line,
    pag,
  } = printerModelState.printer;

  

  const findKeyByValue = (obj, value) => {
    for (let key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
    return null;
  };


  const onBlurHandler = (input) => {
    const { name, value } = input;
    const key = findKeyByValue(printerKey, name);
    // console.log("input:", input);
    // console.log("key:", key);
    setEditedPrinter({ ...editedPrinter, [key]: value });
  };



const onSaveHandler = (input) => {
  socket.emit("update-printres",editedPrinter, "add")
}  

 

 

  

  return (
    <form>
      <IconButton onClick={() => {
        onSaveHandler()
      }}>
        <SaveIcon />
      </IconButton>
      
     
      
          <Grid container margin="0px">
            <Grid xs={6.7}>
              <Item
                style={{
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  textAlign: "end",
                }}
              >
                <Grid container spacing={2} margin="0px">
                  <Grid xs={12}>
                    {" "}
                    <Typography
                      marginTop={"10px"}
                      variant="h3"
                      fontWeight="bold"
                      sx={{
                        textDecoration: "underline",
                        color: colors.greenAccent[300],
                      }}
                    >
                      {":פרטי המדפסת"}
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                   
                  </Grid>
                  <Grid xs={6}>
                    <PrinterInfoItem
                      // title={":דגם"}
                      title={printerKey.printerModel}
                      subTitle={printerModel}
                      editMode={editMode}
                      blur={onBlurHandler}
                    />

                    <PrinterInfoItem
                      // title={":PAG מספר"}
                      title={printerKey.pag}
                      subTitle={pag}
                      editMode={editMode}
                      blur={onBlurHandler}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <PrinterInfoItem
                      // title={":פרטים נוספים"}
                      title={printerKey.description}
                      // subTitle={
                      //   description.trim() !== ""
                      //     ? description
                      //     : "לא נרשמו פרטים נוספים"
                      // }
                      editMode={editMode}
                      blur={onBlurHandler}
                    />
                  </Grid>
                </Grid>
              </Item>
            </Grid>

            <Grid xs={0.1}>
              <div
                style={{
                  backgroundColor: "gray",
                  height: "50vh",
                  width: "3px",
                  // margin: "0 10%",
                }}
              />
            </Grid>
            <Grid xs={4.9}>
              <Item
                style={{
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  textAlign: "end",
                }}
              >
                <Grid xs={12}>
                  {" "}
                  <Typography
                    marginTop={"15px"}
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      textDecoration: "underline",
                      color: colors.greenAccent[300],
                    }}
                  >
                    {":נתוני רשת"}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <PrinterInfoItem
                    // title={":כתובת רשת"}
                    title={printerKey.address}
                    subTitle={address}
                    editMode={editMode}
                    blur={onBlurHandler}
                  />

                  <PrinterInfoItem
                    // title={":נקודה בקיר"}
                    title={printerKey.line}
                    subTitle={line}
                    editMode={editMode}
                    blur={onBlurHandler}
                  />
                </Grid>
                
              </Item>
            </Grid>
            <Grid xs={0.1}>
              <div
                style={{
                  backgroundColor: "gray",
                  height: "50vh",
                  width: "3px",
                  // margin: "0 10%",
                }}
              />
            </Grid>
            <Grid xs={4.9}>
              <Item
                style={{
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  textAlign: "end",
                }}
              >
               
                  
                <Grid xs={12}>
                  {" "}
                  <Typography
                    marginTop={"15px"}
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      textDecoration: "underline",
                      color: colors.greenAccent[300],
                    }}
                  >
                    {":מיקום"}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <PrinterInfoItem
                    // title={":מחלקה"}
                    title={printerKey.department}
                    subTitle={department}
                    editMode={editMode}
                    blur={onBlurHandler}
                  />

                  <PrinterInfoItem
                    // title={":חדר"}
                    title={printerKey.room}
                    subTitle={room}
                    editMode={editMode}
                    blur={onBlurHandler}
                  />
                </Grid>
              </Item>
            </Grid>
          </Grid>
          {/* <CheckIcon />
          <ClearIcon /> */}
       
    
    </form>
  );
};

export default AddPrinter;
