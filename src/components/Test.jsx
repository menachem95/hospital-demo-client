import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import * as React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

import { data1 } from "../data/data1.js";


let data = data1.map((d) => {
  return {
    online: d.online ? 1 : 0,
    hours: d.date.substring(11, 16),
    days: `${d.date.substring(8, 10)}/${d.date.substring(5, 7)}`,
  };
});

let data2 = [...data, ...data, ...data, ...data, ...data, ...data];

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

const intervalByLength = (len) => {
  if (len < 2000) return 20;
  else if (len < 4000) return 40;
  // else if (len < 5000) return 60;
  // else if (len < 7000) return 80;
  // else if (len < 9000) return 80;
  else if (len < 10000) return 60;
};

//////////////////////////////////////////////////////////////////////////////////////
const RepositoryCoverageTimelineGraphTooltip = (props) => {
  // const classes? = useStyles({});

  if (props.payload && props.payload.length >= 1) {
    const {
      days,
      hours,
      online,
    } = props.payload[0].payload;
const classes={}
    return (
      <div
      style={{color: online === 1 ? "green" : "red", backgroundColor: "#DBDFE4", borderRadius: "10%", padding: "10%"}}
        className={classes?.box}
        data-testid="coverage-timeline-graph-tooltip"
      >
        <div className={classes?.line}>
          {/* <span className={classes?.label}>date:</span> */}
          <span data-testid="tooltip-line-coverage-percentage">
            {`${days} ${hours}`}
          </span>
        </div>
        <div className={classes?.line}>
          {/* <span className={classes?.label}>online</span> */}
          <span data-testid="tooltip-branch-coverage-percentage">
           {online === 1 ? "יש רשת":"אין רשת"}
          </span>
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

const SinglePrinterGraph = () => {
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
    <div
      style={{
        // backgroundColor: "red",
        // paddingBlockEnd: "150px",

        height: "250px",
        width: "80%", // אני ממליץ לשים את הרוחב כאן
        overflow: "auto",
      }}
    >
      {data2.length}
      <div
        style={{
          height: "200px",
          width: "16000px", // כאן אתה מגדיר את הרוחב שאתה רוצה
          // overflow: "auto",
          // overflowX: "scroll", // זה מאפשר לגלול בציר X
          // backgroundColor: "green",
        }}
      >
        <ResponsiveContainer width="100%">
          <LineChart
           data={data2}
           >
            <XAxis dataKey="hours" interval=
            {intervalByLength(data2.length)} 
            />
            <XAxis 
            
            xAxisId="1" 
            dataKey="days" interval={intervalByLength(data2.length) * 1.5} />
            <Line
            
             dot={false}
              type="step" dataKey="online" />
              <Tooltip
              content={<RepositoryCoverageTimelineGraphTooltip />}
             
              //  payload={[{ name: '05-01', value: 12, unit: 'kg' }]} 
             
              //  labelStyle={{ color: "green" }} itemStyle={{ color: "cyan" }} 
               />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </>
  );
};

export default SinglePrinterGraph;
