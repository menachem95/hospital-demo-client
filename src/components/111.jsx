import { useEffect, useState } from "react";
import "./111.css";
import { Box } from "@mui/material";
import * as React from "react";
import useMousePosition from "../hooks/useMousePosition.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { LineChart } from "@mui/x-charts/LineChart";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
  Brush,
  Area,
  AreaChart,
} from "recharts";

import {
  aggregateDataByWeek,
  aggregateDataByDay,
  aggregateDataByHour,
  aggregateDataByFiveMinutes,
  aggregateData,
} from "./aggregateDates func.js";

import { data1 } from "../data/data1.js";
// export function aggregateDataByWeek(data) {
//   if (!data || data.length === 0) return [];
//   let result = [];

//   // מיון המערך לפי התאריכים
//   data.sort((a, b) => new Date(a.date) - new Date(b.date));

//   // אתחול משתנים לצורך אגרגציה לפי שבועות
//   let currentWeek = null;
//   let weekData = [];

//   for (const item of data) {
//     const itemDate = new Date(item.date);
//     const itemWeek = getWeekNumber(itemDate);
//     // debugger

//     if (currentWeek === null) {
//       currentWeek = itemWeek;
//     }

//     if (itemWeek !== currentWeek) {
//       // חישוב סטטיסטיקות והוספתן לתוצאה
//       const weekAverage = calculateAverage(weekData);
//       const weekServerRunning = calculateServerRunning(weekData);

//       result.push({
//         date: item.date,
//         average: weekAverage,
//         serverRunning: weekServerRunning,
//         first: true,
//       });

//       // אתחול לשבוע הבא
//       currentWeek = itemWeek;
//       weekData = [];
//     }

//     weekData.push(item);
//   }
//   return result;
// }

// export function aggregateDataByDay(data) {
//   if (!data || data.length === 0) return [];
//   let result = [];

//   // מיון המערך לפי התאריכים
//   data.sort((a, b) => new Date(a.date) - new Date(b.date));

//   // אתחול משתנים לצורך אגרגציה לפי ימים
//   let currentDay = null;
//   let dayData = [];

//   for (const item of data) {
//     const itemDay = new Date(item.date).toLocaleDateString();

//     if (currentDay === null) {
//       currentDay = itemDay;
//     }

//     if (itemDay !== currentDay) {
//       // חישוב סטטיסטיקות והוספתן לתוצאה
//       const dayAverage = calculateAverage(dayData);
//       const dayServerRunning = calculateServerRunning(dayData);

//       result.push({
//         date: item.date,
//         average: dayAverage,
//         serverRunning: dayServerRunning,
//         first: true,
//       });

//       // אתחול ליום הבא
//       currentDay = itemDay;
//       dayData = [];
//     }

//     dayData.push(item);
//   }

//   return result;
// }

// export function aggregateDataByHour(data) {
//   let result = [];

//   // סידור המערך לפי התאריכים
//   data.sort((a, b) => new Date(a.date) - new Date(b.date));

//   // קצאת המידע לשעה
//   let currentHour = null;
//   let hourData = [];

//   for (const item of data) {
//     const itemHour = new Date(item.date).getHours();

//     if (currentHour === null) {
//       currentHour = itemHour;
//     }

//     if (itemHour !== currentHour) {
//       // חישוב סטטיסטיקות והוספתן לתוצאה
//       const hourAverage = calculateAverage(hourData);
//       const hourServerRunning = calculateServerRunning(hourData);

//       result.push({
//         date: item.date,
//         average: hourAverage,
//         serverRunning: hourServerRunning,
//         first: true,
//       });

//       // אתחול לשעה הבאה
//       currentHour = itemHour;
//       hourData = [];
//     }

//     hourData.push(item);
//   }
//   return result;
// }

// export function aggregateDataByFiveMinutes(data) {
//   let result = [];

//   // סידור המערך לפי התאריכים
//   data.sort((a, b) => new Date(a.date) - new Date(b.date));

//   // קצאת המידע ליחידות של חמישה דקות
//   let currentInterval = null;
//   let intervalData = [];

//   for (const item of data) {
//     const itemTime = new Date(item.date);
//     const itemMinutes = itemTime.getMinutes();
//     const currentMinutes = itemMinutes - (itemMinutes % 5);

//     if (currentInterval === null) {
//       currentInterval = currentMinutes;
//     }

//     if (currentMinutes !== currentInterval) {
//       // חישוב סטטיסטיקות והוספתן לתוצאה
//       const intervalAverage = calculateAverage(intervalData);
//       const intervalServerRunning = calculateServerRunning(intervalData);

//       result.push({
//         date: item.date,
//         average: intervalAverage,
//         serverRunning: intervalServerRunning,
//         first: true,
//       });

//       // אתחול ליחידת הזמן הבאה
//       currentInterval = currentMinutes;
//       intervalData = [];
//     }

//     intervalData.push(item);
//   }

//   return result;
// }

const returnTimeString = (timestamp) => {
  const date = new Date(timestamp).toLocaleString("en-GB", { timeZone: "UTC" });
  return {
    day: date.substring(0, 5),
    hour: date.substring(12, 17),
  };
};

function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

const Fill = (props) => {
  debugger;
  console.log("props", props);
  // const {average} = props.payload;
  return "red";
};

const add10milisec = (result) => {
  const newResult = [];
  for (let i = 0; i < result?.length; i++) {
    newResult.push(result[i]);
    let date = result[i].date + 10;
    let obj = { ...result[i + 1], date, first: false };
    // delete obj.average;
    newResult.push(obj);
  }
  return newResult;
};

const CustomizedDot = (props) => {
  const { cx, cy, value, payload } = props;
  const { average, first, serverRunning } = payload;
  // console.log("payload", payload);
  let color = "green";
  if (serverRunning < 75) color = "yellow";
  if (serverRunning < 40) color = "orange";
  if (serverRunning < 10) color = "red";
  // if (first) return
  return (
    <>
      {/* <div style={{borderRadius: "50%", width:10, height:10, backgroundColor: "white",}}>
     {value}
 sdsd
   </div> */}
      <svg
      // x={cx - 10}
      // y={cy - 10}
      // width={20}
      // height={20}
      // fill="red"
      // viewBox="0 0 1024 1024"
      >
        <circle
          //  cx={cx + 4}
          cx={cx}
          cy={cy}
          r="2"
          fill={color}
        />
        {/* <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" /> */}
      </svg>
    </>
  );
};

const RepositoryCoverageTimelineGraphTooltip = (props) => {
  // const classes? = useStyles({});

  if (props.payload && props.payload.length >= 1) {
    const {
      days,
      hours,
      online,
      // time,
      average,
      date,
      dateStinrg,
      serverRunning,
    } = props.payload[0].payload;
    const classes = {};
    let time = new Date(date).toISOString();

    time = `${time.substring(5, 10)}/${time.substring(11, 16)}`;

    return (
      <div
        style={{
          // color: online === 1 ? "green" : "red",
          color: "black",
          backgroundColor: "#DBDFE4",
          borderRadius: "10%",
          padding: "10%",
          width: "140%",
        }}
        className={classes?.box}
        data-testid="coverage-timeline-graph-tooltip"
      >
        <div className={classes?.line}>
          {/* <span className={classes?.label}>date:</span> */}
          <span data-testid="tooltip-line-coverage-percentage">
            {/* {`${days} ${hours}`} */}
            {/* {dateStinrg} */}
            {time}
            {/* {date} */}
          </span>
        </div>
        <div className={classes?.line}>
          {/* <span className={classes?.label}>online</span> */}
          <span data-testid="tooltip-branch-coverage-percentage">
            {/* {online === 1 ? "יש רשת" : "אין רשת"} */}
            {average}
            {"%"}
          </span>
        </div>
        <div>
          <span data-testid="tooltip-branch-coverage-percentage">
            {serverRunning}
            {"אחוזי שרת"}
          </span>{" "}
        </div>
        {/* <div className={classes?.line}>
          <span className={classes?.label}>Run date</span>
          <span data-testid="tooltip-run-date"> */}
        {/* {moment(createdTimestamp).format("MMM Do YYYY h:mm a")} */}
        {/* </span>
        </div> */}
      </div>
    );
  } else {
    return <span data-testid="empty-tooltip" />;
  }
};
//////////////////////////////////////////////////////////////////////////////////////

// function splitAndAverageArray(arr) {
//   // debugger

//   // const arr = arr1.filter(obj => obj.isTheServerRunning)

//   const result = [];

//   const step = Math.ceil(arr.length / 9);
//   const remainder = arr.length % step;

//   for (let i = 0; i < arr.length; i += step) {
//     // const chunk = arr.slice(i, i + step);
//     const chunk = arr.slice(i, i + step + (i + step === arr.length ? remainder : 0));
//     const filterdArr = chunk.filter((obj) => obj.isTheServerRunning);

//     if (chunk.length > 0) {
//       // debugger;
//       console.log("chunk:", chunk);
//       console.log(filterdArr);
//       console.log("filterdArr.length", filterdArr.length);
//       console.log("chunk.length", chunk.length);
//       const totalServer = chunk.length + filterdArr.length;
//       let serverRunning =
//         totalServer === 0
//           ? null
//           : ((filterdArr.length / chunk.length) * 100).toFixed(2);
//       console.log("serverRunning:", serverRunning);
//       let time = chunk[0].date;
//       const trueCount = chunk.filter((obj) => obj.online === true).length;
//       const falseCount = chunk.filter((obj) => obj.online === false).length;
//       const total = trueCount + falseCount;
//       const average = total === 0 ? 0 : ((trueCount / total) * 100).toFixed(2);

//       time = new Date(time).toISOString();
//       const dateStinrg = `${time?.substring(8, 10)}/${time?.substring(
//         5,
//         7
//       )},${time?.substring(11, 16)}`;
//       let date = new Date(time);
//       date = date.getTime();
//       // serverRunning = serverRunning > 0 ? serverRunning : null;
//       result.push({ date, average, dateStinrg, serverRunning });
//       if (i + step === arr.length) {
//         date = arr[arr.length - 1].date;
//         result.push({ date, average, dateStinrg, serverRunning });
//       }
//     }
//   }
//   console.log(result);
//   return result;
// }

// const getAllDates = (arr) => {
//   const arr1 = arr.map((obj) => {
//     let newDate = new Date(obj.date);
//     newDate.setSeconds(0);
//     newDate.setMilliseconds(0);
//     newDate.getTime();
//     return {
//       // date: obj,//: newDate,//.toISOString().substring(0, 16),
//       // online: obj.online ? true : false,
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
//     const next5Minute = lastMinute + 1000 * 60; //*5;

//     const foundItem = arr1.find(
//       (item) =>
//         new Date(item.date).toISOString().substring(0, 16) ===
//         new Date(next5Minute).toISOString().substring(0, 16)
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

//     // if (fromTheLastOneInTheOriginal <= 5 && !isTheServerRunning) {
//     //   isTheServerRunning = true;
//     //   // if (fromTheLastOneInTheOriginal === 5){

//     //   // }
//     // } else{
//     //   fromTheLastOneInTheOriginal = 0
//     // }

//     const obj = {
//       date: next5Minute,
//       isTheServerRunning,
//       online,
//     };
//     newArr.push(obj);

//     lastMinute = obj.date;
//   }

//   console.log("newArr", newArr);
//   return newArr;
// };

const defaultDaysDiff = (logs) => {
  const one = new Date(logs[0].date).getTime();
  const tow = new Date(logs[logs.length - 1].date).getTime();
  const timeDiff = tow - one;
  return Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
};

const Graph = ({ logs }) => {
  const [state, setState] = useState({
    startIndex: 0,
    endIndex: 25,
    timerId: 0,
    left: 0,
    right: 0,
    typeOfTime: "day",
    data: [],
  });
  const [data, setData] = useState([]);

  const [intervalFormat, setIntervalFormat] = useState(null);
  const daysDiff = defaultDaysDiff(logs);
  console.log("logs in 1111:", logs);

  console.log("daysDiff", daysDiff);
  console.log("intervalFormat", intervalFormat);
  useEffect(() => {
    setIntervalFormat(getIntervalFormat());
  }, [daysDiff]);

  const updateBrush = (pos) => {
    if (state.timerId !== 0) {
      clearTimeout(state.timerId);
    }
    const timerId = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        startIndex: pos.startIndex,
        endIndex: pos.endIndex,
      }));
    }, 500);
    setState((prevState) => ({ ...prevState, timerId }));
  };

  function getIntervalFormat() {
    if (daysDiff > 60) return "week";
    if (daysDiff > 7 && daysDiff < 60) return "day";
    if (daysDiff < 30) return "hour";
    if (daysDiff <= 1) return "minutes";
  }

  const test = () => {
    let data = [];
    if (intervalFormat === "minutes") data = aggregateDataByFiveMinutes(logs);
    else if (intervalFormat === "hour") data = aggregateDataByHour(logs);
    else if (intervalFormat === "day") data = aggregateDataByDay(logs);
    else if (intervalFormat === "week") data = aggregateDataByWeek(logs);
    return add10milisec(data.map((o) =>{
      return {...o, date: new Date(o.date).getTime()}
    }));
  };

  // useEffect(() => {
  //   const newData = test(); // קריאה לפונקציה החיצונית
  //   setData(newData);
  // }, [intervalFormat]);

  // const test = () => {
  //   const data = aggregateData(logs, getIntervalFormat());
  //   return add10milisec(data);
  // };

  const tabs = [
    { value: "minutes", disabled: daysDiff > 3 },
    { value: "hour", disabled: daysDiff > 30 },
    { value: "day", disabled: daysDiff < 7 },
    { value: "week", disabled: daysDiff < 60 },
  ];

  // const times = logs.map(obj => obj.time);

  // // יצירת רשימת אינטרוולים שווים
  // const timeIntervals = Array.from({ length: 11 }, (_, index) => Math.floor(Math.min(...times) + (index / 10) * (Math.max(...times) - Math.min(...times))));

  // const gradientOffset = () => {
  //   const dataMax = Math.max(...state.data.map((i) => i.average));
  //   const dataMin = Math.min(...state.data.map((i) => i.average));

  //   if (dataMax <= 0) {
  //     return 0;
  //   } else if (dataMin >= 0) {
  //     return 1;
  //   } else {
  //     return dataMax / (dataMax - dataMin);
  //   }
  // };

  // const off = gradientOffset();
  // if (intervalFormat === null) return

  return (
    <div
      style={{
        width: "500px",
        height: "250px",
        // overflow: "auto",

        //  overflow: "auto",
        // overflowY: false,
      }}
    >
      {daysDiff}
      <div
        style={{
          marginLeft: "10px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <h4>הגדרת אינטרוול</h4>
        <Tabs
          indicatorColor="secondary"
          textColor="secondary"
          value={intervalFormat}
          onChange={(e, newValue) => setIntervalFormat(newValue)}
          sx={{
            "& button": { color: "white" },
          }}
        >
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.value}
                disabled={tab.disabled}
                defaultChecked={intervalFormat === tab.value}
              />
            );
          })}
        </Tabs>
      </div>

      {/* {intervalFormat !== null && ( */}
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart
          // width={1200}
          height={300}
          // data={data}
          data={test()}
          margin={{ top: 30, right: 30, left: 20 }}
          dataKey="average"
        >
          <XAxis
            dataKey="date"
            scale="time"
            type="number"
            minTickGap={10}
            // padding={{ left: state.left, right: state.right }}
            domain={["dataMin", "dataMax"]}
            tickFormatter={(timestamp) => {
              const date = returnTimeString(timestamp);

              let time;
              if (intervalFormat === "minutes" || intervalFormat === "hour")
                time = date.hour;
              else if (intervalFormat === "day" || intervalFormat === "week")
                time = date.day;

              return time;
            }}
            // tickCount={2570}
          />
          <YAxis type="number" domain={[0, 100]} />
          <Line
            // isAnimationActive={false}
            dot={<CustomizedDot />}
            type="step"
            dataKey="average"
          />

          {/* <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs> */}
          <Tooltip content={<RepositoryCoverageTimelineGraphTooltip />} />

          <Brush
            dataKey="date"
            height={80}
            // style={{ overflow: "auto",}}
            // width="850px"
            // travellerWidth={15}
            // stroke="#95d884"
            fill="rgba(255,255,255,0)"
            // onChange={(e) => updateBrush(e)}
            // startIndex={state.startIndex}
            startIndex={0}
            // endIndex={state.endIndex}
            endIndex={10}
            // padding={{ left: state.left, right: state.right }}
            tick={true}
            // travellerOffset={10} // קבע את האופסט לתמונה הזזה
            // travellerComp={(props) => {
            //   const { x, width, ...restProps } = props;
            //   return (
            //     <rect x={x} width={width} fill="#666" {...restProps} />
            //   );
            // }}
            // travelling={true}  // הפעל את אפשרות הגלילה
            tickFormatter={(timestamp) => {
              const date = returnTimeString(timestamp);
              let time;
              if (intervalFormat === "hour" || intervalFormat === "minutes") time = `${date.day},${date.hour}`;
              else if (intervalFormat === "day" || intervalFormat === "week") time = date.day;

              return time;
            }}
          >
            <AreaChart
              // data={data}
              data={test()}
            >
              <Area type="number" dataKey="average" isAnimationActive={false} />
              <XAxis
                // minTickGap={30}
                height={30}
                dataKey="date"
                tickFormatter={(timestamp) => {
                  const date = new Date(timestamp);
                  let time = returnTimeString(timestamp).day;

                  if (intervalFormat === "week") time = getWeekNumber(date);

                  //  }

                  return time;
                }}
              />
            </AreaChart>
          </Brush>
        </LineChart>
      </ResponsiveContainer>
      {/* )} */}
    </div>
  );
};
export default React.memo(Graph);

//////////////////////////////////////////////////////////////////////////////////////

// let data = data1.map((d) => {
//   return {
//     online: d.online ? 1 : 0,
//     hours: d.date.substring(11, 16),
//     days: `${d.date.substring(8, 10)}/${d.date.substring(5, 7)}`,
//   };
// });

// let data2 = [...data, ...data, ...data, ...data, ...data, ...data];

// data = data.map(d => {
//   return {online: d.online, time: d.time.substring(11, 16)}
// })

// data = data.map((d) => {
//   return {
//     ...d,
//     ...d.time,
//     hours: `${d.time.hours}:${d.time.minutes}`,
//     online: d.online ? 1 : 0,
//   };
// });

// const sortedData = data?.sort((a, b) => new Date(a.time) - new Date(b.time));

// const changeDates = [{ online: 2 }];

// for (let i = 1; i < sortedData.length; i++) {
//   if (sortedData[i].online !== sortedData[i - 1].online) {
//     changeDates.push({
//       time: `${sortedData[i].time.day} ב${sortedData[i].time.month}, ${sortedData[i].time.hours}:${sortedData[i].time.minutes}`,
//       online: sortedData[i]?.online ? 1 : 0,
//     //   hours
//     });
//   }
// }

// const roundToNearestThousand = (number) => {
//   const remainder = number % 1000;
//   if (remainder < 500) {
//     return number - remainder; // עגל לתחתית אלפיים הקרובה יותר
//   } else {
//     return number + (1000 - remainder); // עגל לתקרה אלפיים הקרובה יותר
//   }
// };

//////////////////////////////////////////////////////////////////////////////////////
