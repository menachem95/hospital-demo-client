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
import SaveIcon from "@mui/icons-material/Save";
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const PrinterModel = ({socket}) => {
  const [editMode, setEditMode] = useState(false);
  const { printerModelState, printers } = useSelector((state) => state.display);
  const dispatch = useDispatch();
  const [editedPrinter, setEditedPrinter] = useState(printerModelState.printer);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    _id,
    address,
    department,
    room,
    description,
    printerModel,
    line,
    pag,
    online,
  } = printerModelState.printer;

  let img;
  try {
    img = require(`./images/${printerModel}.png`);
  } catch {
    img = require(`./images/generic printer.png`);
  }

  const findKeyByValue = (obj, value) => {
    for (let key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
    return null;
  };

  const handleClose = () => {
    dispatch(updatePrinterModelState({ isOpen: false }));
  };

  const onBlurHandler = (input) => {
    const { name, value } = input;
    const key = findKeyByValue(printerKey, name);
    // console.log("input:", input);
    // console.log("key:", key);
    setEditedPrinter({ ...editedPrinter, [key]: value });
  };

  const onSubmit = async (value) => {
    // console.log("editedPrinter:", editedPrinter);
    // await fetch(
    //   `${process.env.REACT_APP_BACKEND_URL}/edit-printer`,
    //   // "http://localhost:8080/edit-printer",
    //   // "https://hospitol-demo-server.onrender.com/edit-printer",
    //   {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(editedPrinter),
    //   }
    // );
    // const newPrinters = [...printers];
    // for (let i = 0; i < newPrinters.length; i++) {
    //   if (newPrinters[i]._id === editedPrinter._id) {
    //     newPrinters[i] = { ...editedPrinter };
    //     console.log("newPrinters[i]:", newPrinters[i]);
    //     break;
    //   }
    // }
    // dispatch(updatePrinters(newPrinters));
    console.log("editedPrinter:", editedPrinter);
    socket.emit("update-printres",editedPrinter, "update")
    dispatch(updatePrinterModelState({ isOpen: false }));
    // dispatch(updatePrinterModelStatePrinter(editedPrinter));
  };

  const deletePrinter = async (_id) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/delete-printer/${_id}`,

      {
        method: "DELETE",
      }
    );

    alert("המדפסת הוסרה בהצלחה");
    dispatch(updatePrinters(printers.filter((p) => p._id !== _id)));
  };

  const editPrinter = async (value) => {
    if (editMode) {
      if (window.confirm("האם ברצונך לשמור את השינויים?")) {
        onSubmit(value);
        alert("השינויים נשמרו");
      }
    }
    setEditMode(!editMode);
  };

  useEffect(() => {
    dispatch(
      updatePrinterModelState({
        isOpen: true,
        printer: {
          ...printerModelState.printer,
          online: printers.filter(
            (p) => p._id === printerModelState.printer._id
          )[0].online,
        },
      })
    );
  }, [printers]);

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  //   onSubmit: async (value) => {
  //     const newPrinter = {
  //       ...value,
  //       // department: departmentValue,
  //       // printerModel: printerModelValue,
  //     };
  //     console.log("newPrinter", newPrinter);

  //     await fetch(
  //       // "http://localhost:8080/add-printer",
  //       "https://hospitol-demo-server.onrender.com/add-printer",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(newPrinter),
  //       }
  //     );

  //     alert("המדפסת נוספה בהצלחה");
  //   },
  // });

  return (
    <form>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={printerModelState.isOpen}
      >
        <Box
          textAlign="end"
          style={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Grid container spacing={2} margin="0px">
            <Grid xs={4} sx={{ display: "flex", alignSelf: "center" }}>
              <IconButton
                title="הסרה"
                onClick={() => {
                  deletePrinter(_id);

                  handleClose();
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                title={!editMode ? "עריכה" : "שמירה"}
                type="submit"
                onClick={() => {
                  editPrinter();
                }}
              >
                {!editMode ? <EditIcon /> : <SaveIcon />}
              </IconButton>
              <IconButton title="מעבר לדפדפן" disabled={!online}>
                <a
                  href={`https://${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OpenInBrowserIcon />
                </a>
              </IconButton>

              {/* {online && (
                <a
                  href={`https://${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Item
                    className="link"
                    style={{
                      color: colors.greenAccent[300],
                      backgroundColor: colors.primary[600],
                      width: "100%",
                    }}
                  >
                    מעבר למדפסת
                  </Item>
                </a>
               )}  */}
            </Grid>
            <Grid
              xs={4}
              sx={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <motion.div
                key={online}
                initial={{ opacity: 1, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  default: {
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                  },
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <Item
                  style={{
                    backgroundColor: online ? "#00FF00" : "red",
                    borderRadius: "50%",
                    height: 30,
                    width: 30,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                />
              </motion.div>
            </Grid>
            <Grid xs={4}>
              <Typography
                marginTop={"10px"}
                variant="h5"
                fontWeight="bold"
                sx={{ color: colors.greenAccent[300], marginTop: "0px" }}
              >
                {":סטטוס מדפסת"}
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                {online ? "יש רשת" : "אין רשת"}
              </Typography>
            </Grid>
            <Grid xs={12} sx={{ paddingTop: "0px" }}>
              <div
                style={{
                  backgroundColor: "gray",
                  height: "2px",
                  width: "100%",
                }}
              />
            </Grid>

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
                    {" "}
                    <img
                      alt={printerModel}
                      src={img}
                      width="130vh"
                      style={{ marginTop: "20px" }}
                    />
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
                      subTitle={
                        description.trim() !== ""
                          ? description
                          : "לא נרשמו פרטים נוספים"
                      }
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
        </Box>
      </BootstrapDialog>
    </form>
  );
};

export default PrinterModel;
