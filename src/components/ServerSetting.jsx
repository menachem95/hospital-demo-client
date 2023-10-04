import { Box, useTheme, Typography, Input } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import StatBox from "../components/StatBox";
import PrintIcon from "@mui/icons-material/Print";
import ProgressCircle from "../components/ProgressCircle";
import { useSelector } from "react-redux";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { Select, selectClasses } from "@mui/base/Select";
import { Option, optionClasses } from "@mui/base/Option";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState } from "react";

const ServerSeting = () => {
  const theme = useTheme();
  const [intervalMinutes, setIntervalMinutes] = useState(5);
  const [msgFromSrv, setMsgFromSrv] = useState("***");

  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        sx={{ width: 1 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        // top="80px"
        top={"5%"}
      >
        <Header title="הגדרות שרת" subtitle={""} />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{
          backgroundColor: colors.primary[400],
          mb: 2,
          // display: "flex",
          flexDirection: "column",
          height: "70vh",
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
      >
        <form>
          {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {"בדיקת מדפסות כל"}
        </InputLabel> */}
          <Typography
            marginTop={"10px"}
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.greenAccent[400] }}
          >
            {"הגדרת אינטרוולים"}
          </Typography>
          <Typography
            marginTop={"10px"}
            variant="h7"
            fontWeight="bold"
            sx={{ color: colors.greenAccent[700] }}
          >
            {"הגדר כל כמה זמן השרת יבצע בדיקות רשת למדפסות (מוגדר בדקות)"}
          </Typography>
          <NativeSelect
          onChange={(e) => setIntervalMinutes(e.target.value)}
            sx={{ color: colors.grey[200] }}
            defaultValue={intervalMinutes}
            inputProps={
              {
                // name: 'age',
                // id: 'uncontrolled-native',
              }
            }
          >
            <option value={0.5}>0.5</option>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </NativeSelect>
          <button
            onClick={async (e) => {
             e.preventDefault();
            const setServerInterval =  await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/setinterval`,
                // "http://localhost:8080/add-printer",
                // "https://hospitol-demo-server.onrender.com/add-printer",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({intervalMinutes}),
                }
              );
                const res = await setServerInterval.json();
                setMsgFromSrv(res.message)
            }}
          >
            אישור
          </button>
          <label>{msgFromSrv}</label>
        </form>
      </Box>
    </Box>
  );
};
export default ServerSeting;
