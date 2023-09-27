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
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
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
import { Tab, Tabs } from "@mui/material";
// import Tabs from "@mui/material";
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
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import PrintIcon from "@mui/icons-material/Print";
import PlaceIcon from "@mui/icons-material/Place";
import LanIcon from "@mui/icons-material/Lan";

const Icons = () => {
  return (
    <Box>
      <PrintIcon />
      <PlaceIcon />
      <LanIcon />
    </Box>
  );
};

const printerKey = {
  address: "כתובת רשת",
  department: "מחלקה",
  room: "חדר",
  description: "פרטים נוספים",
  printerModel: "דגם",
  line: "נקודה בקיר",
  pag: "PAG מספר",
};

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

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

const AddPrinterA = ({ socket }) => {
  const { printerModelState, printers } = useSelector((state) => state.display);
  const dispatch = useDispatch();
  const [editedPrinter, setEditedPrinter] = useState(printerModelState.printer);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { address, department, room, description, printerModel, line, pag } =
    printerModelState.printer;

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
    socket.emit("update-printres", editedPrinter, "add");
  };

  return (
    <form>
      <IconButton
        onClick={() => {
          onSaveHandler();
        }}
      >
        <SaveIcon />
      </IconButton>

      {/* {/* <Grid container margin="0px"> */}
      <Grid xs={6.7}>
        {/* <Item> */}
        <Icons />
        {/* </Item> */}
        {/* <Item
          style={{
            backgroundColor: colors.primary[400],
            width: "100%",
            textAlign: "end",
          }}
        > */}
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
          <Grid xs={6}></Grid>
          <Grid xs={6}>
            <PrinterInfoItem
              // title={":דגם"}
              title={printerKey.printerModel}
              subTitle={printerModel}
              blur={onBlurHandler}
            />

            <PrinterInfoItem
              // title={":PAG מספר"}
              title={printerKey.pag}
              subTitle={pag}
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

              blur={onBlurHandler}
            />
          </Grid>
        </Grid>{" "}
        {/* </Item> */}
        {/* <Item> */}
        <IconButton onKlick={() => {}}>
          <ArrowBackIosNewIcon />
        </IconButton>
        {/* </Item> */}
      </Grid>
      {/* <Item
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
                   
                    blur={onBlurHandler}
                  />

                  <PrinterInfoItem
                    // title={":נקודה בקיר"}
                    title={printerKey.line}
                    subTitle={line}
                   
                    blur={onBlurHandler}
                  />
                </Grid>
                
              </Item>
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
                   
                    blur={onBlurHandler}
                  />

                  <PrinterInfoItem
                    // title={":חדר"}
                    title={printerKey.room}
                    subTitle={room}
                   
                    blur={onBlurHandler}
                  />
                </Grid>
              </Item> */}
      {/* </Grid> */}

      {/* <Grid xs={0.1}>
              <div
                style={{
                  backgroundColor: "gray",
                  height: "50vh",
                  width: "3px",
                  // margin: "0 10%",
                }}
              />
            </Grid> */}
      {/* <Grid xs={4.9}>
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
                   
                    blur={onBlurHandler}
                  />

                  <PrinterInfoItem
                    // title={":נקודה בקיר"}
                    title={printerKey.line}
                    subTitle={line}
                   
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
            </Grid> */}
      {/* <Grid xs={4.9}>
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
                   
                    blur={onBlurHandler}
                  />

                  <PrinterInfoItem
                    // title={":חדר"}
                    title={printerKey.room}
                    subTitle={room}
                   
                    blur={onBlurHandler}
                  />
                </Grid>
              </Item>
            {/* </Grid> */}
      {/* </Grid>  */}
      {/* <CheckIcon />
          <ClearIcon /> */}
    </form>
  );
};

// export default AddPrinterA;

const AddPrinter = ({socket}) => {
  const [value, setValue] = useState("נתוני מדפסת");

  const [newPrinter, setNewPrinter] = useState({});
  const navigate = useNavigate();

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

    setNewPrinter({ ...newPrinter, [key]: value });
    console.log(newPrinter);
  };

  return (
    <Box display="grid" margin={"auto"} marginTop={"80px"} width={500}>
      <Box sx={{ width: "100%" }}>
        {/* <Box mb="30px"  textAlign="center" >
        <Typography
            variant="h2"
            // color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: '0 0 5px 0' }}
        >
            {`הוספת מכשיר`}
        </Typography>
        <Typography variant="h5"
        //  color={colors.greenAccent[400]}
         >
            {`בחר איזה מכשיר ברצונך להוסיף`}
        </Typography>
        
    </Box> */}
        <Box
          // backgroundColor={colors.primary[400]}
          marginBottom="60px"
          sx={{ borderBottom: 0, borderColor: "divider" }}
        >
          <Tabs
            centered
            value={value}
            onChange={(e, value) => setValue(value)}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab
              label="נתוני רשת"
              value="נתוני רשת"
              icon={<LanIcon fontSize="large" />}
              sx={{ width: "33.3%" }}
            />
            <Tab
              label="מיקום"
              value="מיקום"
              icon={<PlaceIcon fontSize="large" />}
              sx={{ width: "33.3%" }}
            />
            <Tab
              label="נתוני מדפסת"
              value="נתוני מדפסת"
              icon={<PrintIcon fontSize="large" />}
              sx={{ width: "33.3%" }}
            />
          </Tabs>
          {/* {value === "printer" && <AddPrinterForm />}
        {value === "computer" &&<h1>...הטופס בעבודות תחזוקה</h1>} */}
          {value === "נתוני מדפסת" && (
            <Box>
              <Grid xs={6} style={{ textAlign: "end", width: "100%" }}>
                <PrinterInfoItem
                  title={printerKey.printerModel}
                  blur={onBlurHandler}
                />

                <PrinterInfoItem title={printerKey.pag} blur={onBlurHandler} />

                <PrinterInfoItem
                  title={printerKey.description}
                  blur={onBlurHandler}
                />
              </Grid>
              <IconButton
                onClick={() => {
                  setValue("מיקום");
                }}
                style={{ textAlign: "start", marginBottom: "100px" }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
          )}
          {value === "מיקום" && (
            <Box>
              <Grid xs={6} style={{ textAlign: "end", width: "100%" }}>
                <PrinterInfoItem
                  title={printerKey.department}
                  blur={onBlurHandler}
                />

                <PrinterInfoItem title={printerKey.room} blur={onBlurHandler} />
              </Grid>
              <IconButton
                onClick={() => {
                  setValue("נתוני רשת");
                }}
                style={{ textAlign: "start", marginBottom: "100px" }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
          )}
           {value === "נתוני רשת" && (
            <Box>
              <Grid xs={6} style={{ textAlign: "end", width: "100%" }}>
                <PrinterInfoItem
                  title={printerKey.address}
                  blur={onBlurHandler}
                />

                <PrinterInfoItem title={printerKey.line} blur={onBlurHandler} />
              </Grid>
              <IconButton
                onClick={() => {
                  socket.emit("update-printres", "add", newPrinter);
                  navigate(`/printers/departments/${newPrinter.department}`)
                }}
                style={{ textAlign: "start", marginBottom: "100px" }}
              >
                <DoneIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddPrinter;
