import { useEffect, useState } from "react";

import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import NativeSelect from "@mui/material/NativeSelect";

import Header from "../UI/Header";

const ServerSeting = () => {
  const theme = useTheme();
  const [intervalMinutes, setIntervalMinutes] = useState();
  const [msgFromSrv, setMsgFromSrv] = useState("***");

  const colors = tokens(theme.palette.mode);

  const getServerConfiguration = async () => {
    const serverConfing = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/server-confing`,

      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const res = await serverConfing.json();
    console.log(res.intervalMinutes);
    setIntervalMinutes(res.intervalMinutes);
  };

  useEffect(() => {
    getServerConfiguration();
  }, []);
  return (
    <Box m="20px">
      <Box
        sx={{ width: 1 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
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

          flexDirection: "column",
          height: "70vh",
        }}
      >
        <form style={{ width: 500, display: "flex" }}>
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
            onChange={(e) => {
              const selectedValue = e.target.value;
              console.log(selectedValue);
              setIntervalMinutes(selectedValue);
            }}
            sx={{ color: colors.grey[200] }}
            value={intervalMinutes}
          >
            <option value={0.5}>0.5</option>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </NativeSelect>
          <button
            onClick={async (e) => {
              console.log(intervalMinutes);
              e.preventDefault();
              const setServerInterval = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/setinterval`,

                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ intervalMinutes: +intervalMinutes }),
                }
              );
              const res = await setServerInterval.json();
              setMsgFromSrv(res.message);
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
