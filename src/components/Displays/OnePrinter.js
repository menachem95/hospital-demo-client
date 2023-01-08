import * as React from "react";

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
import { tokens } from "../../theme";
import img from "./images/320.png";
import { display } from "@mui/system";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

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

const OnePrinter = () => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const printerInfo = {
    address: "כתובת",
    room: "חדר",
    line: "מספר פורט בקיר",
    pag: "PAG",
    description: "תיאור",
    department: "מחלקה",
    printerModel: "דגם",
  };

  const printer = {
    address: "L-45w356",
    department: "חדרי לידה",
    room: "2",
    description: "בכניסה לחדר מצד ימין",
    printerModel: "epson 320",
    line: "L45w356",
    pag: "p-ag4588",
  };

  const address = "L-45w356";
  const room = "2";
  const department = "חדרי לידה";
  const description = "בכניסה לחדר מצד ימין";
  const printerModel = "epson 320";
  const line = "L45w356";
  const pag = "p-ag4588";
  const printerImage = "./images/epson-ml-320.jpg";

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box
          sx={{ flexGrow: 1 }}
          textAlign="end"
          style={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Grid container spacing={2} margin="0px">
            <Grid xs={12} textAlign="center">
              <Grid container spacing={2}>
                <div xs={3}
                  style={{
                    backgroundColor: true ? "#00FF00" : "red",
                    borderRadius: "50%",
                    height: 30,
                    width: 30,
                    alignSelf: "flex-end",
                    display: "inline-block",
                    margin: 40,
                    marginBottom:0,
                  }}
                ></div><Grid xs={5}> <Typography
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
              </Typography></Grid>
                
              </Grid>
            </Grid>
            <Grid xs={8}>
              
                {" "}
                <img src={img} height="150px" style={{ display: "flex" }} />
              
            </Grid>
            <Grid xs={4}>
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
            <Grid xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid xs={4}>
              <Item>xs=4</Item>
            </Grid>

            <Grid xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Box>
        {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          פרטי מדפסת
        </BootstrapDialogTitle> */}
        {/* <DialogContent>
        
        </DialogContent> */}
        {/* <Box
        
          style={{
            
            backgroundColor: colors.primary[400],
            //   paddingTop: "40px"
          }}
          sx={{
            display: 'flex',
            flexDirection: "row",
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
          // gridAutoRows="140px"
          // gap="20px"
        > */}

        {/* <div>
          {Object.keys(printer).map((p) => {
            return (
              <Box width={"250px"} bgcolor="green" border={"solid 1px red"} textAlign="end"
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.greenAccent[300] }}
                >
                  {":" + printerInfo[p]}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ color: colors.grey[100] }}
                >
                  {printer[p]}
                </Typography>
              </Box>
              
            );
          })}
          </div> */}

        {/* <Typography 
            display="flex"

              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.greenAccent[300] }}
            >
              {":דגם"}
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
              {printerModel}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.greenAccent[300] }}
            >
              {":מחלקה"}
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
            {department}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.greenAccent[300] }}
            >
              {":חדר"}
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
            {room}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.greenAccent[300] }}
            >
              {":כתובת"}
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
            {address}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.greenAccent[300] }}
            >
              {":מספר נקודה בקיר"}
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
            {line}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.greenAccent[300] }}
            >
              {":PAG מספר"}
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
            {pag}
            </Typography><Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.greenAccent[300] }}
            >
              {":תיאור"}
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
            {description}
            </Typography> */}
        {/* </DialogContent> */}
        {/* </Box> */}
      </BootstrapDialog>
    </>
  );
};

export default OnePrinter;
