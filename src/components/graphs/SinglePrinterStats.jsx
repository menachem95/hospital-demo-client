import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Box } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import CircularProgress from "@mui/material/CircularProgress";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Calendar from "@mui/icons-material/Event";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import Header from "../UI/Header";
import Graph from "./SinglePrinterGraph";
import SinglePrinterGraph from "./SinglePrinterGraph1";

import { returnTimeString } from "../../func/func_for_graph";

const today = dayjs();

//***************************************************************************************************** */
// const getAllDates = (arr) => {
//   if (arr.length === 0) return [];
//   const arr1 = arr.map((obj) => {
//     let newDate = new Date(obj.date);
//     newDate.setSeconds(0);
//     newDate.setMilliseconds(0);
//     newDate.getTime();
//     return {
//       ...obj,
//       date: newDate,
//       isTheServerRunning: true,
//     };
//   });

//   let lastMinute = new Date(arr1[0].date).getTime();

//   const newArr = [
//     {
//       date: lastMinute,
//       isTheServerRunning: true,
//       online: arr1[0].online,
//     },
//   ];

//   const theLastInOriginalArr = new Date(arr1[arr1.length - 1].date).getTime();
//   let fromTheLastOneInTheOriginal = 0;
//   while (lastMinute <= theLastInOriginalArr) {
//     // console.log("lastMinute:", lastMinute);
//     // console.log("theLastInOriginalArr:", theLastInOriginalArr);
//     const nextMinute = lastMinute + 1000 * 60; //*5;

//     const foundItem = arr1.find(
//       (item) =>
//         new Date(item.date).toISOString().substring(0, 16) ===
//         new Date(nextMinute).toISOString().substring(0, 16)
//     );

//     let isTheServerRunning = foundItem ? true : false;
//     const online = foundItem ? foundItem.online : null;
//     fromTheLastOneInTheOriginal++;
//     if (isTheServerRunning) {
//       fromTheLastOneInTheOriginal = 0;
//     }
//     if (!isTheServerRunning && fromTheLastOneInTheOriginal < 5) {
//       isTheServerRunning = true;
//     }
//     const obj = {
//       date: nextMinute,
//       isTheServerRunning,
//       online,
//     };
//     newArr.push(obj);

//     lastMinute = obj.date;
//   }

//   console.log("newArr", newArr);
//   return newArr;
// };

//***************************************************************************************************** */

const getAllDates = (arr) => {
  if (arr.length === 0) return [];

  const dateIndex = {};
  arr.forEach((obj) => {
    let newDate = new Date(obj.date);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    const dateKey = newDate.toISOString().substring(0, 16);
    dateIndex[dateKey] = {
      isTheServerRunning: true,
      online: obj.online,
    };
  });

  const newArr = [];
  let lastMinute = new Date(arr[0].date).getTime();
  let fromTheLastOneInTheOriginal = 0;

  while (lastMinute <= new Date(arr[arr.length - 1].date).getTime()) {
    const nextMinute = lastMinute + 1000 * 60;
    const dateKey = new Date(nextMinute).toISOString().substring(0, 16);

    const foundItem = dateIndex[dateKey];

    let isTheServerRunning = foundItem ? true : false;
    const online = foundItem ? foundItem.online : null;

    fromTheLastOneInTheOriginal++;
    if (isTheServerRunning) {
      fromTheLastOneInTheOriginal = 0;
    }
    if (!isTheServerRunning && fromTheLastOneInTheOriginal < 5) {
      isTheServerRunning = true;
    }

    const obj = {
      date: nextMinute,
      isTheServerRunning,
      online,
    };
    newArr.push(obj);

    lastMinute = obj.date;
  }

  console.log("newArr", newArr);
  return newArr;
};

const SinglePrinterStats = () => {
  const [logs, setLogs] = useState([]);
  const [intervalFormat, setIntervalFormat] = useState("day");
  const [isLoading, setIsLoading] = useState(false);
  const [dateState, setDateState] = useState([
    today.subtract(30, "day"),
    today,
  ]);
  const { printerId } = useParams();

  useEffect(() => {
    console.log("dateState", dateState);
  }, [dateState]);

  const queryParams = new URLSearchParams();
  queryParams.append("start", dateState[0].startOf("day"));
  queryParams.append("end", dateState[1].endOf("day"));

  const fetchLogs = async () => {
    setIsLoading(true);
    console.log(
      `http://localhost:8080/logs/onePrinter/${printerId}/${queryParams}`
    );

    const res = await fetch(
      `http://localhost:8080/logs/onePrinter/${printerId}/${dateState[0].startOf(
        "day"
      )}/${dateState[1].endOf("day")}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const logs = await res.json();
    console.log("logs:", logs[logs.length - 1]);

    let datadata = getAllDates(logs);

    console.log("datadata:", datadata);
    console.log(`end at ${new Date().toISOString()}`);
    console.log("intervalFormat", intervalFormat);

    setLogs(datadata);
    setIsLoading(false);
  };

  let subtitle = " ";
  if (logs.length > 0) {
    let start = returnTimeString(logs[0].date).day;
    let end = returnTimeString(logs[logs.length - 1].date).day;
    subtitle = `${start} - ${end}`;
  }

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top="80px"
      >
        <Header
          title={"היסטוריית מדפסת"}
          subtitle={subtitle}
          // subtitle={`${dateState[0].format('DD/MM/YY')} - ${dateState[1].format('DD/MM/YY')}`}
        />
        {/* {logs.length > 0 && <div>{new Date(logs[0].date)}</div>} */}
      </Box>
      <Box
        display="grid"
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              הצגת נתונים בתאריכים
              <DateRangePicker
                format="DD/MM/YYYY"
                calendars={1}
                defaultValue={dateState.map((d) => dayjs(d))}
                onChange={(newValue) =>
                  setDateState(
                    newValue //.map((d) =>  newDated.$d)
                  )
                }
                slots={{ field: SingleInputDateRangeField }}
                slotProps={{
                  field: { shouldRespectLeadingZeros: true },
                  shortcuts: {
                    items: shortcutsItems,
                  },
                  textField: { InputProps: { endAdornment: <Calendar /> } },
                }}
              />
              <button
                style={{
                  width: "100px",
                  color: "black",
                  height: "25px",
                }}
                onClick={fetchLogs}
              >
                הצג
              </button>
            </div>
          </div>
        </LocalizationProvider>
        {/* <SinglePrinterGraph data={logs} /> */}
        {isLoading && (
          //   <Box sx={{ width: '500px', height: "500px" }}>
          //   <LinearProgress />
          // </Box>
          <CircularProgress color="inherit" />
        )}

        {logs.length > 0 && isLoading === false && <Graph logs={logs} />}
      </Box>
    </Box>
  );
};

export default SinglePrinterStats;

const shortcutsItems = [
  {
    label: "This Week",
    getValue: () => {
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Last 30 Days",
    getValue: () => {
      return [today.subtract(30, "day"), today];
    },
  },
  {
    label: "Last 45 Days",
    getValue: () => {
      return [today.subtract(45, "day"), today];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      return [today.startOf("month"), today.endOf("month")];
    },
  },

  { label: "Reset", getValue: () => [null, null] },
];
