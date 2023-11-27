import { Box, Button } from "@mui/material";
import SinglePrinterGraph from "../SinglePrinterGraph";
import Header from "../Header";
import Calendar from "@mui/icons-material/Event";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import StreamingDemo from "../111";
import LinearDeterminate from "../UI/LinearDeterminate";
import "dayjs/locale/en-gb";


 const end = new Date()
 let start = new Date(end);
 start.setMonth(start.getMonth() - 1);


const getAllDates = (arr) => {
  
  if (arr.length === 0) return [];
  const arr1 = arr.map((obj) => {
    let newDate = new Date(obj.date);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    newDate.getTime();
    return {
      ...obj,
      date: newDate,
      isTheServerRunning: true,
    };
  });

  let lastMinute = new Date(arr1[0].date).getTime();

  const newArr = [
    {
      date: lastMinute,
      isTheServerRunning: true,
      online: arr1[0].online,
    },
  ];

  const theLastInOriginalArr = new Date(arr1[arr1.length - 1].date).getTime();
  let fromTheLastOneInTheOriginal = 0;
  while (lastMinute <= theLastInOriginalArr) {
    // console.log("lastMinute:", lastMinute);
    // console.log("theLastInOriginalArr:", theLastInOriginalArr);
    const nextMinute = lastMinute + 1000 * 60; //*5;

    const foundItem = arr1.find(
      (item) =>
        new Date(item.date).toISOString().substring(0, 16) ===
        new Date(nextMinute).toISOString().substring(0, 16)
    );

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
  const [daysDiff, setDaysDiff] = useState();
  // const [datadata, setDatadata] = useState([]);
 const [dateState, setDateState] = useState([start,end])
  const { printerId } = useParams();

  useEffect(()=>{
    console.log("dateState", dateState)
  },[dateState])
  // useEffect(() => {
  //   // returnDateString({ front: end, db: endDB }, setEndDete);
  //   // returnDateString({ front: start, db: startDB }, setStartDete);
  // }, []);

  // useEffect(() => {
  //   const one = new Date(start).getTime();
  //   const tow = new Date(end).getTime();
  //   const timeDiff = tow - one;
  //   const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  //   setDaysDiff(daysDiff);
  // }, []);

  // useEffect(() => {******************************************************************************************************************************************
  //   const one = new Date(startDate.db).getTime();
  //   const tow = new Date(endDate.db).getTime();
  //   const timeDiff = tow - one;
  //   const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  //   setDaysDiff(daysDiff);
  // }, [startDate, endDate]);

  //   const fetchLogs = async () => {
  //     console.log(`http://localhost:8080/logs/onePrinter/${printerId}/${startDate.db}/${endDate.db}`);
  //     console.log("startDate.db",startDate.db);
  //     console.log("endDate.db",endDate.db);
  //     if (startDate.db === "" || endDate.db === "") return;
  //     const res = await fetch(
  //       `http://localhost:8080/logs/onePrinter/${printerId}/${startDate.db}/${endDate.db}`,
  //       {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     const logs = await res.json();
  //     // setLogs(logs
  //     //     // .slice(0, 50)
  //     //     );
  //     console.log(logs);
  //     setLogs(logs);
  //   };
  // // let datadata = []
  //   useEffect(() => {
  //     debugger
  //     let d = logs.map((o) => {
  //       let date = new Date(o.date);
  //       date.getTime();
  //       // debugger
  //       return {
  //         ...o,
  //         date,
  //       };
  //     });
  //   //  let  datadata = getAllDates(logs);
  //   //   console.log("d:", d);
  //   //   console.log("datadata:", datadata);
  //   //   datadata = aggregateDataByHour(datadata);
  //   //   setDatadata(datadata)
  //   setDatadata(aggregateDataByHour(getAllDates(logs)));
  //    }, [logs]);
  const fetchLogs = async () => {
    setIsLoading(true);
    console.log(
      `http://localhost:8080/logs/onePrinter/${printerId}/${dateState[0]}/${dateState[1]}`
    );
   
    const res = await fetch(
      `http://localhost:8080/logs/onePrinter/${printerId}/${dateState[0]}/${dateState[1]}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const logs = await res.json();
    console.log("logs:", logs);

    // let d = logs.map((o) => {
    //   let date = new Date(o.date);
    //   date.getTime();
    //   return {
    //     ...o,
    //     // isTheServerRunning: true,
    //     date,
    //   };
    // });

    // const timeDifference = logs[0].date - logs[logs.length - 1].date;
    // setDaysDiff(timeDifference / (1000 * 60 * 60 * 24))

    let datadata =
     getAllDates(logs);
    // getAllDates(
    // d//.sort((a, b) => new Date(a.date) - new Date(b.date))
    // );
    // let datadata = d
    //  console.log("d:", d);
    console.log("datadata:", datadata);
    console.log(`end at ${new Date().toISOString()}`);
    console.log("intervalFormat", intervalFormat);
    // if (intervalFormat === "minutes") setLogs(add10milisec(datadata));
    // else if (intervalFormat === "houer") setLogs(add10milisec(aggregateDataByHour(datadata)));
    // else if (intervalFormat === "day") setLogs(add10milisec(aggregateDataByDay(datadata)));
    // else if (intervalFormat === "week") setLogs(add10milisec(aggregateDataByWeek(datadata)));

    // datadata =
    // // aggregateDataByDay(datadata);
    //   // aggregateDataByHour(datadata)
    //   aggregateDataByWeek(datadata);
    // console.log("datadata", datadata);
    setLogs(datadata);
    setIsLoading(false);
  };

  // useEffect(() => {

  //   let d = logs.map((o) => {
  //       let date = new Date(o.date);
  //       date.getTime();
  //       return {
  //           ...o,
  //           date,
  //       };
  //   });
  //   let datadata = getAllDates(logs);
  //   console.log("d:", d);
  //   console.log("datadata:", datadata);
  //   datadata = aggregateDataByHour(datadata);
  //   setDatadata(datadata);
  // }, [logs]);
  // useEffect(()=>{
  //   if(logs.length === 0) return
  //   const start = logs[0].date; //.getTime();
  //   const end = logs[logs.length - 1].date; //.getTime();
  //   const timeDiff = end - start;
  //   const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  //   setDaysDiff(timeDiff / (1000 * 60 * 60 * 24))
  // },[logs])

  return (
    
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top="80px"
      >
        <Header title={"מדפסת"} subtitle={" "} />
      
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >הצגת נתונים בתאריכים
              <DateRangePicker
              calendars={1}
                defaultValue={dateState.map(d => dayjs(d))}
                onChange={(newValue) => setDateState(newValue.map(d => d.$d))}
                slots={{ field: SingleInputDateRangeField }}
                slotProps={{
                  shortcuts: {
                    items: shortcutsItems,
                  },
                  textField: { InputProps: { endAdornment: <Calendar /> } },
                }}
              />
              {/* <DateRangePicker slots={{ field: SingleInputDateRangeField }} /> */}
              {/* <StaticDateRangePicker
            defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
            // sx={{
            //   [`.${pickersLayoutClasses.contentWrapper}`]: {
            //     alignItems: 'center',
            //   },
            // }}
          /> */}
              {/* <DesktopDateRangePicker
            defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
          /> */}
              {/* <DatePicker
                maxDate={dayjs(end)}
                onAccept={(v) => {
                  console.log("v:", v.$d);
                  returnDateString(
                    { front: v.format(), db: v.$d },
                    setStartDete
                  );
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
              /> */}
            </div>

            <div>
              {/* <div style={{ whiteSpace: "pre-wrap", fontSize: "25px" }}>
                {` הצגת פעילות המדפסת ברשת
מתאריך ${startDate.front}  
עד תאריך ${endDate.front}
`}
              </div>{" "} */}
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
            {/* <div> */}
            {/* <div
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h4>הגדרת אינטרוול</h4>
              <label>
                ממוצע כל חמש דקות
                <input
                  disabled={daysDiff > 10}
                  type="radio"
                  name="intervalFormat"
                  onChange={(e) => setIntervalFormat(e.target.value)}
                  value={"minutes"}
                />
              </label>
              <label>
                ממוצע של שעה
                <input
                  disabled={daysDiff > 40}
                  defaultValue={daysDiff < 10}
                  type="radio"
                  name="intervalFormat"
                  onChange={(e) => setIntervalFormat(e.target.value)}
                  defaultChecked={true}
                  value={"houer"}
                />
              </label>
              <label>
                ממוצע של יום
                <input
                  disabled={daysDiff < 10}
                  defaultValue={daysDiff > 11 && daysDiff < 40}
                  type="radio"
                  name="intervalFormat"
                  onChange={(e) => setIntervalFormat(e.target.value)}
                  value={"day"}
                />
              </label>
              <label>
                ממוצע של שבוע
                <input
                  disabled={daysDiff < 60}
                  defaultValue={daysDiff > 40}
                  type="radio"
                  name="intervalFormat"
                  onChange={(e) => setIntervalFormat(e.target.value)}
                  value={"week"}
                />
              </label>
            </div> */}
            {/* <div style={{ padding: "10px" }}>
                <h4>Tiks</h4>
                <label>
                  5M
                  <input type="radio" title="hh/mm" value={"houer"} />
                </label>
                <label>
                  1D
                  <input type="radio" title="mm/dd" value={"day"} />
                </label>
              </div>
            </div> */}
          </div>
        </LocalizationProvider>
      {isLoading && 
    //   <Box sx={{ width: '500px' }}>
    //   <LinearProgress />
    // </Box>
      <CircularProgress color="inherit" />
      
      
      }
     
        {/* {logs.length > 0 &&<SinglePrinterGraph logs={logs.sort((a, b) => new Date(a.date) - new Date(b.date) )} />}  */}
        {logs.length > 0 && isLoading === false && (
          <StreamingDemo logs={logs}  />
        )}
          
      </Box>
    </Box>
  );
};

export default SinglePrinterStats;

const shortcutsItems = [
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];
