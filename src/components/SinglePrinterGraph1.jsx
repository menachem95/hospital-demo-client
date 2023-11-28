import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import * as React from "react";
import useMousePosition from "../hooks/useMousePosition.js";
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

import { data1 } from "../data/data1.js";

const Fill = (props) => {
  debugger;
  console.log("props", props);
  // const {average} = props.payload;
  return "red";
};

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

// const intervalByLength = (number) => {
//   const len = roundToNearestThousand(number);
//   if (number < 500) return 12;
//   if (len === 1000) return 18;
//   else if (len === 2000) return 20;
//   else if (len === 3000) return 30;
//   else if (len === 4000) return 40;
//   // else if (len < 5000) return 60;
//   // else if (len < 7000) return 80;
//   // else if (len < 9000) return 80;
//   else if (len < 10000) return 60;
// };

//////////////////////////////////////////////////////////////////////////////////////

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
    const time = new Date(date).toISOString().substring(11, 16);
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
function aggregateDataByHour(data) {
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
  return newResult;
}
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

const getAllDates = (arr) => {
  const arr1 = arr.map((obj) => {
    let newDate = new Date(obj.date);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    newDate.getTime();
    return {
      // date: obj,//: newDate,//.toISOString().substring(0, 16),
      // online: obj.online ? true : false,
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
    const next5Minute = lastMinute + 1000 * 60; //*5;

    const foundItem = arr1.find(
      (item) =>
        new Date(item.date).toISOString().substring(0, 16) ===
        new Date(next5Minute).toISOString().substring(0, 16)
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

    // if (fromTheLastOneInTheOriginal <= 5 && !isTheServerRunning) {
    //   isTheServerRunning = true;
    //   // if (fromTheLastOneInTheOriginal === 5){

    //   // }
    // } else{
    //   fromTheLastOneInTheOriginal = 0
    // }

    const obj = {
      date: next5Minute,
      isTheServerRunning,
      online,
    };
    newArr.push(obj);

    lastMinute = obj.date;
  }

  console.log("newArr", newArr);
  return newArr;
};

// function getAllDates (arr1) {
//   // debugger
//   const dateStrings = arr1.map((obj) => {
//     let newDate = new Date(obj.date);
//     newDate.setMinutes(
//       newDate.getMinutes() - newDate.getTimezoneOffset()
//     );
//     newDate.getDate()

//     return {
//       date:  newDate,//newDate.toISOString().substring(0, 16),
//       online: obj.online ? true : false,
//       isTheServerRunning: true,
//     };
//   });
// console.log("dateStrings[0].date:", dateStrings[0]?.date)
//   let lastMinuteString = dateStrings[0]?.date;

//   const newArr = [
//     {
//       date: dateStrings[0]?.date,
//       isTheServerRunning: true,
//       online: dateStrings[0]?.online,
//     },
//   ];

//   console.log("lastMinuteString", lastMinuteString);
//   let lastNumber = new Date(dateStrings[dateStrings.length - 1]?.date)

//   lastNumber.setMinutes(
//     lastNumber.getMinutes() - lastNumber.getTimezoneOffset()
//   );
//   lastNumber = lastNumber?.toISOString()?.substring(0, 16)
//   console.log("lastNumber",lastNumber)
// debugger
//   while (lastMinuteString !== lastNumber) {
//     // debugger
//     const lastMinuteTime = new Date(lastMinuteString);

//     lastMinuteTime.setMinutes(lastMinuteTime.getMinutes() + 1);
//     lastMinuteTime.setMinutes(
//       lastMinuteTime.getMinutes() - lastMinuteTime.getTimezoneOffset()
//     );
//     console.log("lastMinuteTime.toISOString().substring(0, 16):", lastMinuteTime.toISOString().substring(0, 16));
//     const foundItem = dateStrings.find(
//       (item) => item.date === lastMinuteTime.toISOString().substring(0, 16)
//     );

//     let isTheServerRunning = foundItem ? true : null;

//     const newArrFilterd = dateStrings.filter((obj) => obj.isTheServerRunning);
//     let lastSeen = newArrFilterd[newArrFilterd.length - 1].date;

//     let newTimeTest = new Date(lastSeen);

//     newTimeTest.setMinutes(newTimeTest.getMinutes() + 1);
//     newTimeTest.setMinutes(
//       newTimeTest.getMinutes() - newTimeTest.getTimezoneOffset()
//     );

//     // console.log("test1:", newTimeTest);
//     // console.log("test2:", lastMinuteTime);

//     const timeDifferenceInSeconds = Math.abs(
//       (newTimeTest - lastMinuteTime) / 1000
//     );
//     // console.log("timeDifferenceInSeconds:", timeDifferenceInSeconds);
//     // console.log("timeDifferenceInSeconds:", timeDifferenceInSeconds < 1000);
//     // if (timeDifferenceInSeconds < 1000) {
//     //   isTheServerRunning = true;
//     // }

//     // if (one > tow.toISOString()) {
//     //   isTheServerRunning = true;
//     // }

//     const obj = {
//       date: lastMinuteTime.toISOString().substring(0, 16),
//       isTheServerRunning,
//       online: foundItem ? foundItem.online : false,
//     };
//     newArr.push(obj);

//     // Update lastMinuteString for the next iteration
//     lastMinuteString = obj.date;
//   }

//   return newArr;
// };

const SinglePrinterGraph = ({ logs }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  // const mousePosition = useMousePosition();
  // let data = logs.map((d) => {
  //   return {
  //     online: d.online ? 1 : 0,
  //     hours: d.date.substring(11, 16),
  //     days: `${d.date.substring(8, 10)}/${d.date.substring(5, 7)}`,
  //   };
  // });

  // const handleMouseMove = (e) => {
  //   const mouseX = e.nativeEvent.clientX;
  //   const componentWidth = 200;
  //   // e.target.offsetWidth;
  //   const contentWidth = 200;
  //   // e.target.firstChild.offsetWidth ;

  //   const scrollableWidth = contentWidth - componentWidth;

  //   if (mouseX > window.innerWidth - 20) {
  //     // הזז ימינה אם העכבר בסמוך לצד הימני של החלון
  //     if (scrollPosition < scrollableWidth) {
  //       setScrollPosition(scrollPosition + 10);
  //     }
  //   } else if (mouseX < 20) {
  //     // הזז שמאלה אם העכבר בסמוך לצד השמאלי של החלון
  //     if (scrollPosition > 0) {
  //       setScrollPosition(scrollPosition - 10);
  //     }
  //   }
  // };

  // const getArray = async () => {
  //   let dates = await logs.map((obj) => {
  //     return { date: obj.date, _id: obj._id };
  //   });
  //   let values = logs.map((obj) => {
  //     return { online: obj.online ? 1 : 0, _id: obj._id };
  //   });

  //   const startDate = new Date(dates[0].date);

  //   // תאריך הסיום
  //   const endDate = new Date(dates[dates.length - 1].date);

  //   // מספר המילי-שניות ביום
  //   const millisecondsPerDay = 24 * 60 * 60 * 1000;

  //   // חשב את הפרש הזמן במילי-שניות בין התאריכים
  //   const timeDiff = endDate - startDate;

  //   // חשב את הפרש הזמן בדקות
  //   const minutesDiff = timeDiff / (1000 * 60);

  //   // חלק את הפרש הזמן במספר המילי-שניות ביום כדי לקבל את מספר הימים
  //   // const daysDiff = Math.floor(timeDiff / millisecondsPerDay);
  //   const daysDiff = Math.floor(minutesDiff / (60 * 24));

  //   console.log(`יש ${daysDiff} ימים בין התאריכים.`);
  // };

  // getArray();

  // let d = logs.map((o) => {
  //   let date = new Date(o.date);
  //   date.getTime();
  //   // debugger
  //   return {
  //     ...o,
  //     date,
  //   };
  // });
  // let datadata = getAllDates(logs);
  // console.log("d:", d);
  // console.log("datadata:", datadata);
  // datadata = aggregateDataByHour(datadata);
  

  return (
    <>
      {/* <div
      style={{
        // backgroundColor: "red",
        // paddingBlockEnd: "150px",

        height: "250px",
        width: "80%", // אני ממליץ לשים את הרוחב כאן
        overflow: "auto",
      }}
    >
      {data.length}
      <div
        style={{
          height: "200px",
          width: "5000px", // כאן אתה מגדיר את הרוחב שאתה רוצה
          // overflow: "auto",
          // overflowX: "scroll", // זה מאפשר לגלול בציר X
          // backgroundColor: "green",
        }}
      >
        <ResponsiveContainer width="100%">
          <LineChart data={data}>
            <XAxis dataKey="hours" interval={intervalByLength(data.length)} />
            <XAxis xAxisId="1" dataKey="days" interval={intervalByLength(data.length) * 1.5} />
            <Line dot={false} type="step" dataKey="online" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    ************************************************* */}
      {"הגבלה של  500 פיקסלים"}
      <div
        style={{
          height: "200px",
          width: "500px",
          display: "inline",
        }}
      >
        <ResponsiveContainer>
          <AreaChart data={logs}>
            {/* <CartesianGrid
             
            
             vertical={false}
             /> */}
            <XAxis
              dataKey="date"
              // interval={0}
              angle={-90}
              height={50}
              tickMargin={20}
              // tickFormatter={(timestamp) => {
              //   const time = new Date(timestamp).toISOString();
              //   return `${time.substring(8, 10)}/${time.substring(
              //     5,
              //     7
              //   )}-${time.substring(11, 16)}`;
              // }}
              tickFormatter={(timestamp) => {
                const time = new Date(timestamp)
                  .toISOString()
                  .substring(5, 10);
                return time;
              }}
              scale="time"
              type="number"
              domain={["dataMin", "dataMax"]}
              //  padding={{left: "5%", right: "10px"}}
              padding={{ left: 10, right: 10 }}

              // tick="31"
              // tickCount="31"
              // ticks="30"
              //tabIndex={1} dataKey="hours"
            />
            {/* <XAxis xAxisId="1" dataKey="days" /> */}
            <YAxis type="number" domain={[0, 100]} />

            <Area
              dot={<CustomizedDot />}
              type="step"
              dataKey="average"
              stroke="rgb(80, 39, 245)"
              // fill={Fill()}
              // fill="red"
              fill="rgba(223, 13, 13,0)"
              // dataKey="online"
            />
            {/* <Area
              type="step"
              stroke="#d8a18495"
              fill="#d8a18463"
              dot={false}
              dataKey="serverRunning"
           
            /> */}
<Brush />
            <Tooltip content={<RepositoryCoverageTimelineGraphTooltip />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          height: "200px",
          width: "500px",
          marginTop: "50px",
        }}
      >
        <ResponsiveContainer>
          <LineChart data={logs}>
            {/* <CartesianGrid
             
            
             vertical={false}
             /> */}
            <XAxis
              dataKey="date"
              // interval={0}
              angle={-90}
              height={50}
              tickMargin={20}
              // tickFormatter={(timestamp) => {
              //   const time = new Date(timestamp).toISOString();
              //   return `${time.substring(8, 10)}/${time.substring(
              //     5,
              //     7
              //   )}-${time.substring(11, 16)}`;
              // }}
              tickFormatter={(timestamp) => {
                const time = new Date(timestamp)
                  .toISOString()
                  .substring(11, 16);
                return time;
              }}
              scale="time"
              type="number"
              domain={["dataMin", "dataMax"]}
              //  padding={{left: "5%", right: "10px"}}
              padding={{ left: 10, right: 10 }}

              // tick="31"
              // tickCount="31"

              //tabIndex={1} dataKey="hours"
            />
            {/* <XAxis xAxisId="1" dataKey="days" /> */}
            <YAxis type="number" domain={[0, 100]} />

            <Line
              dot={false}
              type="step"
              dataKey="average"
              stroke="rgb(80, 39, 245)"
              fill="rgba(80, 39, 245, 0.544)"
              // dataKey="online"
            />
            <Line
              type="step"
              stroke="#d8a18495"
              fill="#d8a18463"
              dot={false}
              dataKey="serverRunning"
            />

            <Tooltip content={<RepositoryCoverageTimelineGraphTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* <div
        style={{
          marginTop: "100px",
          // backgroundColor: "red",
          // paddingBlockEnd: "150px",

          height: "250px",
          width: "95%", // אני ממליץ לשים את הרוחב כאן
          overflow: "auto",
        }}
        // onMouseMove={handleMouseMove}
      >
        {data.length} {"ללא הגבלה"}
        <div
          style={{
            height: "200px",
            minWidth: "100%",
            width: `${
              intervalByLength(data.length) * intervalByLength(data.length)
            }%`, // כאן אתה מגדיר את הרוחב שאתה רוצה
            // transform: `translateX(-${JSON.stringify(mousePosition.x + 10) }px)`,
            // overflow: "auto",
            // overflowX: "scroll", // זה מאפשר לגלול בציר X
            // backgroundColor: "green",
          }}
        >
          <ResponsiveContainer width="100%">
            <LineChart data={data}>
              <XAxis
                // tickSize={1}
                tabIndex={1}
                dataKey="hours"
                // interval={1}
                interval={intervalByLength(data.length)}
              />
              <XAxis
                // tickSize={1}
                xAxisId="1"
                dataKey="days"
                interval={intervalByLength(data.length) * 1.5}
              />
              <Line dot={false} type="step" dataKey="online" />
              <Tooltip
                content={<RepositoryCoverageTimelineGraphTooltip />}

                //  payload={[{ name: '05-01', value: 12, unit: 'kg' }]}

                //  labelStyle={{ color: "green" }} itemStyle={{ color: "cyan" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      {/* </div> */}
      
    </>
  );
};



export default SinglePrinterGraph;
