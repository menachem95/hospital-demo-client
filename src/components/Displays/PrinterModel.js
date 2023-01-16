import * as React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

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

const PrinterModel = () => {
  const { printerModelState, printers } = useSelector((state) => state.display);
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let img;
  try {
    img = require(`./images/${printerModel}.png`);
  } catch {
    img = require(`./images/generic printer.png`);
  }

  const {
    address,
    department,
    room,
    description,
    printerModel,
    line,
    pag,
    online,
  } = printerModelState.printer;

  const handleClose = () => {
    dispatch(updatePrinterModelState({ isOpen: false }));
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

  return (
    <>
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
                      sx={{ color: colors.greenAccent[300] }}
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
                    {" "}
                    <Typography
                      marginTop={"10px"}
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: colors.greenAccent[300] }}
                    >
                      {":דגם"}
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{ color: colors.grey[100] }}
                    >
                      {printerModel}
                    </Typography>
                    <Typography
                      marginTop={"10px"}
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: colors.greenAccent[300] }}
                    >
                      {":PAG מספר"}
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{ color: colors.grey[100] }}
                    >
                      {pag}
                    </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography
                      marginTop={"10px"}
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: colors.greenAccent[300] }}
                    >
                      {":פרטים נוספים"}
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{ color: colors.grey[100] }}
                    >
                      {description.trim() !== ""
                        ? description
                        : "לא נרשמו פרטים נוספים"}
                    </Typography>
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
                    sx={{ color: colors.greenAccent[300] }}
                  >
                    {":נתוני רשת"}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    marginTop={"10px"}
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.greenAccent[300] }}
                  >
                    {":כתובת רשת"}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                  >
                    {address}
                  </Typography>
                  <Typography
                    marginTop={"10px"}
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.greenAccent[300] }}
                  >
                    {":נקודה בקיר"}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                  >
                    {line}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  {" "}
                  <Typography
                    marginTop={"15px"}
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.greenAccent[300] }}
                  >
                    {":מיקום"}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography
                    marginTop={"10px"}
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.greenAccent[300] }}
                  >
                    {":מחלקה"}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                  >
                    {department}
                  </Typography>
                  <Typography
                    marginTop={"10px"}
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.greenAccent[300] }}
                  >
                    {":חדר"}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                  >
                    {room}
                  </Typography>
                </Grid>
              </Item>
            </Grid>
          </Grid>
          {/* <div
                  xs={3}
                  style={{
                    backgroundColor: true ? "#00FF00" : "red",
                    borderRadius: "50%",
                    height: 30,
                    width: 30,
                    alignSelf: "flex-end",
                    display: "inline-block",
                    margin: 40,
                    marginBottom: 0,
                  }}
                ></div> */}

          {/* <Grid xs={4}>
              <img
                alt={printerModel}
                src={require(`./images/${printerModel}.png`)}
                max-height="250px"
                width="200px"
                style={{ display: "flex" }}
              />
            </Grid>
            <Grid xs={4}>
              <Typography
                marginTop={"10px"}
                variant="h5"
                fontWeight="bold"
                sx={{ color: colors.greenAccent[300] }}
              >
                {":כתובת רשת"}
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                {address}
              </Typography>
              <Typography
                marginTop={"10px"}
                variant="h5"
                fontWeight="bold"
                sx={{ color: colors.greenAccent[300] }}
              >
                {":מספר נקודה בקיר"}
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                {line}
              </Typography>
              <Typography
                marginTop={"10px"}
                variant="h5"
                fontWeight="bold"
                sx={{ color: colors.greenAccent[300] }}
              >
                {":PAG מספר"}
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                {pag}
              </Typography>
            </Grid> */}

          {/* <Grid xs={8}>
              <Item>xs=8</Item>
            </Grid> */}
          {/* </Grid> */}
        </Box>
      </BootstrapDialog>
    </>
  );
};

export default PrinterModel;
