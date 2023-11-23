import { Box, Button } from "@mui/material";
import SinglePrinterGraph from "../SinglePrinterGraph";
import Header from "../Header";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import StreamingDemo from "../111";
import "dayjs/locale/en-gb";

const add10milisec = (result) => {
  const newResult = [];
  for (let i = 0; i < result.length; i++) {
    newResult.push(result[i]);
    let date = result[i].date + 10;
    let obj = { ...result[i + 1], date, first: false };
    // delete obj.average;
    newResult.push(obj);
  }
  console.log("newResult", newResult);

  return newResult;
};

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

function calculateAverage(data) {
  const trueCount = data.filter((obj) => obj.online === true).length;
  const falseCount = data.filter((obj) => obj.online === false).length;
  const total = trueCount + falseCount;

  return total === 0 ? 0 : ((trueCount / total) * 100).toFixed(2);
}

function calculateServerRunning(data) {
  const totalServer = data.length;
  const filterdArr = data.filter((obj) => obj.isTheServerRunning);

  return totalServer === 0
    ? null
    : Number(((filterdArr.length / totalServer) * 100).toFixed(2));
}

function aggregateDataByHour(data) {
  if (!data || data.length === 0) return [];
  let result = [];

  // סידור המערך לפי התאריכים
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // קצאת המידע לשעה
  let currentHour = null;
  let hourData = [];

  for (const item of data) {
    const itemHour = new Date(item.date).getHours();

    if (currentHour === null) {
      currentHour = itemHour;
    }

    if (itemHour !== currentHour) {
      // חישוב סטטיסטיקות והוספתן לתוצאה
      const hourAverage = calculateAverage(hourData);
      const hourServerRunning = calculateServerRunning(hourData);

      result.push({
        date: item.date,
        average: hourAverage,
        serverRunning: hourServerRunning,
        first: true,
      });

      // אתחול לשעה הבאה
      currentHour = itemHour;
      hourData = [];
    }

    hourData.push(item);
  }

  // טיפול בשעה האחרונה
  // if (hourData.length > 0) {
  //   const hourAverage = calculateAverage(hourData);
  //   const hourServerRunning = calculateServerRunning(hourData);

  //   result.push({
  //     date: data[data.length - 1].date,
  //     average: hourAverage,
  //     serverRunning: hourServerRunning,
  //   });
  // }
  const newResult = [];
  for (let i = 0; i < result.length; i++) {
    newResult.push(result[i]);
    let date = result[i].date + 10;
    let obj = { ...result[i + 1], date, first: false };
    // delete obj.average;
    newResult.push(obj);
  }
  console.log("newResult", newResult);
  console.log("result", result);
  // return result;
 return newResult;
}

function aggregateDataByDay(data) {
  if (!data || data.length === 0) return [];
  let result = [];

  // מיון המערך לפי התאריכים
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // אתחול משתנים לצורך אגרגציה לפי ימים
  let currentDay = null;
  let dayData = [];

  for (const item of data) {
    const itemDay = new Date(item.date).toLocaleDateString();

    if (currentDay === null) {
      currentDay = itemDay;
    }

    if (itemDay !== currentDay) {
      // חישוב סטטיסטיקות והוספתן לתוצאה
      const dayAverage = calculateAverage(dayData);
      const dayServerRunning = calculateServerRunning(dayData);

      result.push({
        date: item.date,
        average: dayAverage,
        serverRunning: dayServerRunning,
        first: true,
      });

      // אתחול ליום הבא
      currentDay = itemDay;
      dayData = [];
    }

    dayData.push(item);
  }
  console.log("result day", result);

  // const newResult = [];
  // for (let i = 0; i < result.length; i++) {
  //   newResult.push(result[i]);
  //   let date = result[i].date + 10;
  //   let obj = { ...result[i + 1], date, first: false };
  //   // delete obj.average;
  //   newResult.push(obj);
  // }
  // console.log("newResult", newResult);

  // return newResult;
  return result;
}

function aggregateDataByWeek(data) {
  if (!data || data.length === 0) return [];
  let result = [];

  // מיון המערך לפי התאריכים
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // אתחול משתנים לצורך אגרגציה לפי שבועות
  let currentWeek = null;
  let weekData = [];

  for (const item of data) {
    const itemDate = new Date(item.date);
    const itemWeek = getWeekNumber(itemDate);
    // debugger

    if (currentWeek === null) {
      currentWeek = itemWeek;
    }

    if (itemWeek !== currentWeek) {
      // חישוב סטטיסטיקות והוספתן לתוצאה
      const weekAverage = calculateAverage(weekData);
      const weekServerRunning = calculateServerRunning(weekData);

      result.push({
        date: item.date,
        average: weekAverage,
        serverRunning: weekServerRunning,
        first: true,
      });

      // אתחול לשבוע הבא
      currentWeek = itemWeek;
      weekData = [];
    }

    weekData.push(item);
  }

  // const newResult = [];
  // for (let i = 0; i < result.length; i++) {
  //   newResult.push(result[i]);
  //   let date = result[i].date + 10;
  //   let obj = { ...result[i + 1], date, first: false };
  //   // delete obj.average;
  //   newResult.push(obj);
  // }
  // console.log("newResult", newResult);

  // return newResult;

  return result;
}

// פונקציה לקבלת מספר השבוע בשנה
function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

// Example usage:
// const dataByWeek = aggregateDataByWeek(yourDataArray);
// console.log(dataByWeek);

// שימוש דוגמא:
// const dataByDay = aggregateDataByDay(מערך_הנתונים_שלך);
// console.log(dataByDay);

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
  const [daysDiff, setDaysDiff] = useState();
  // const [datadata, setDatadata] = useState([]);
  const [startDate, setStartDete] = useState({ front: "", db: "" });
  const [endDate, setEndDete] = useState({ front: "", db: "" });
  const { printerId } = useParams();
  useEffect(() => {
    returnDateString({ front: end, db: endDB }, setEndDete);
    returnDateString({ front: start, db: startDB }, setStartDete);
  }, []);

  // useEffect(() => {
  //   const one = new Date(start).getTime();
  //   const tow = new Date(end).getTime();
  //   const timeDiff = tow - one;
  //   const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  //   setDaysDiff(daysDiff);
  // }, []);

  useEffect(() => {
    const one = new Date(startDate.db).getTime();
    const tow = new Date(endDate.db).getTime();
    const timeDiff = tow - one;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    setDaysDiff(daysDiff);
  }, [startDate, endDate]);
 

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
    console.log(
      `http://localhost:8080/logs/onePrinter/${printerId}/${startDate.db}/${endDate.db}`
    );
    console.log(`start at ${new Date().toISOString()}`)
    console.log("startDate.db", startDate.db);
    console.log("endDate.db", endDate.db);
    if (startDate.db === "" || endDate.db === "") return;
    const res = await fetch(
      `http://localhost:8080/logs/onePrinter/${printerId}/${startDate.db}/${endDate.db}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const logs = await res.json();
    console.log("logs:", logs)
   
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

    let datadata = getAllDates(logs)
    // getAllDates(
      // d//.sort((a, b) => new Date(a.date) - new Date(b.date))
    // );
    // let datadata = d
    //  console.log("d:", d);
     console.log("datadata:", datadata);
    console.log(`end at ${new Date().toISOString()}`)
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <DatePicker
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
              />
            </div>

            <div>
              <div style={{ whiteSpace: "pre-wrap", fontSize: "25px" }}>
                {` הצגת פעילות המדפסת ברשת
מתאריך ${startDate.front}  
עד תאריך ${endDate.front}
`}
              </div>{" "}
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
            <div
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
                disabled={daysDiff < 10 }
                  defaultValue={ daysDiff > 11 && daysDiff < 40}
                 
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
                defaultValue={ daysDiff > 40}
                 
                  type="radio"
                  name="intervalFormat"
                  onChange={(e) => setIntervalFormat(e.target.value)}
                  value={"week"}
                />
              </label>
            </div>
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

        {/* {logs.length > 0 &&<SinglePrinterGraph logs={logs.sort((a, b) => new Date(a.date) - new Date(b.date) )} />}  */}
        {logs.length > 0 && (
          <StreamingDemo logs={logs} intervalFormat={intervalFormat} />
        )}
      </Box>
    </Box>
  );
};

export default SinglePrinterStats;
