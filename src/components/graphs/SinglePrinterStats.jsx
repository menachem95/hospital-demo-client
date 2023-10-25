import { Box } from "@mui/material";
import SinglePrinterGraph from "../Test";
import Header from "../Header";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "dayjs/locale/en-gb";

const returnDateString = (v, cb) => {
  const year = v.front.substring(0, 4);
  const month = v.front.substring(5, 7);
  const day = v.front.substring(8, 10);
  const date = `${day}/${month}/${year}`;
  cb({ front: date, db: v.db || "" });
};

const end = new Date().toJSON();
let start = new Date(end);
start.setMonth(start.getMonth() - 1);
const endDB = new Date();
endDB.setHours(23, 59, 59, 999);
const startDB = start;
start.setHours(0, 0, 0, 0);
start = start.toJSON();

const SinglePrinterStats = () => {
  const [logs, setLogs] = useState([]);
  const [startDate, setStartDete] = useState({ front: "", db: "" });
  const [endDate, setEndDete] = useState({ front: "", db: "" });

  useEffect(() => {
    returnDateString({ front: end, db: endDB }, setEndDete);
    returnDateString({ front: start, db: startDB }, setStartDete);
  }, []);

  const fetchLogs = async () => {
    console.log("123")
    if(startDate.db === "" || endDate.db === "") return
    const res = await fetch(
      `http://localhost:8080/logs/onePrinter/65082196ef2033988448587d/${startDate.db}/${endDate.db}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const logs = await res.json();
    // setLogs(logs
    //     // .slice(0, 50)
    //     );
    console.log(logs);
    setLogs(logs);
  };

  // useEffect(() => {
  //   fetchLogs();
  // }, [startDate, endDate]);

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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ whiteSpace: "pre-wrap", fontSize: "25px" }}>
              {`תיעוד פעילות המדפסת
מתאריך ${startDate.front}  
עד תאריך ${endDate.front}
              `}
            </div>
            <button onClick={fetchLogs} />
            <DatePicker
              onAccept={(v) => {
                console.log("v:", v.$d);
                returnDateString({ front: v.format(), db: v.$d }, setStartDete);
              }}
              defaultValue={dayjs(start)}
              label="תאריך התחלה"
              sx={{ width: 150, margin: "5px" }}
            />
            <DatePicker
              maxDate={dayjs(end)}
              onAccept={(v) => {
                returnDateString({ front: v.format(), db: v.$d }, setEndDete);
              }}
              defaultValue={dayjs(end)}
              label="תאריך סיום"
              sx={{ width: 150, margin: "5px" }}
            />
          </div>
        </LocalizationProvider>

        <SinglePrinterGraph logs={logs} />
      </Box>
    </Box>
  );
};

export default SinglePrinterStats;
