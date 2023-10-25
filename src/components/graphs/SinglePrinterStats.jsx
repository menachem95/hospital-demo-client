import { Box } from "@mui/material";
import SinglePrinterGraph from "../Test";
import Header from "../Header";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { date } from "yup";

const returnDateString = (v, cb) => {
  const year = v.substring(0, 4);
  const month = v.substring(5, 7);
  const day = v.substring(8, 10);
  const date = `${day}/${month}/${year}`;
  cb(date);
};

const start = new Date().toJSON();
  let end = new Date(start);
    end.setMonth(end.getMonth() - 1);
    end = end.toJSON();

const SinglePrinterStats = () => {
  const [startDate, setStartDete] = useState("");
  const [endDate, setEndDete] = useState("");
  
  useEffect(() => {
    
    
    returnDateString(start, setStartDete);
    returnDateString(end, setEndDete);
  }, []);
  let data;
  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top="80px"
      >
        <Header title={"מדפסת"} />
      </Box>
      <Box
        display="grid"
        // gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{
          mb: 2,
          flexDirection: "row",
          height: "70vh",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ whiteSpace: "pre-wrap", fontSize: "25px" }}>
              {`תיעוד פעילות המדפסת
מתאריך ${endDate}  
עד תאריך ${startDate}
              `}
            </div>
            <DatePicker
           
              inputFormat="yyyy-MM"
              onAccept={(v) => {
                returnDateString(v.format(), setStartDete);
              }}
              defaultValue={dayjs(end)}
              label="תאריך התחלה"
              sx={{ width: 150, margin: "5px" }}
            />
            <DatePicker
             maxDate={dayjs(start)}
              onAccept={(v) => {
                returnDateString(v.format(), setEndDete);
              }}
              defaultValue={dayjs(start)}
              label="תאריך סיום"
              sx={{ width: 150, margin: "5px" }}
            />
          </div>
        </LocalizationProvider>

        <SinglePrinterGraph data={data} />
      </Box>
    </Box>
  );
};

export default SinglePrinterStats;
