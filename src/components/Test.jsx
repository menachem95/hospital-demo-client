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
    days: d.date.substring(5, 10),
  };
});

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

const sortedData = data?.sort((a, b) => new Date(a.time) - new Date(b.time));

const changeDates = [{ online: 2 }];

// for (let i = 1; i < sortedData.length; i++) {
//   if (sortedData[i].online !== sortedData[i - 1].online) {
//     changeDates.push({
//       time: `${sortedData[i].time.day} ב${sortedData[i].time.month}, ${sortedData[i].time.hours}:${sortedData[i].time.minutes}`,
//       online: sortedData[i]?.online ? 1 : 0,
//     //   hours
//     });
//   }
// }

const Test = () => {
  // return (
  //   <Box
  //     // style={{ padding: "10px" }}
  //     gap="10px"
  //     style={{
  //       backgroundColor: "red",
  //       mb: 2,
  //       height: "500px",
  //       width: "5000px",
  //       overflow: "auto",
  //       // overflowX: "scroll",
  //       // overflowY: "hidden",
  //       "::-webkit-scrollbar-thumb": {
  //         background: " #888",
  //       },
  //     }}
  //   >
  //     <div
  //       style={{
  //         height: "100%",
  //         width: "100%",
  //         overflowX: "scroll",
  //         backgroundColor: "green",
         
  //       }}
  //     >
  //       <ResponsiveContainer
  //       // width={"100%"}

  //       //  aspect={10} height={400}
  //       // width="100%" height="100%"
  //       >
  //         <LineChart
  //           data={data}
  //           // data={changeDates}
  //         >
  //           <XAxis
  //             xAxisId="0"
  //             //   dataKey="hours"
  //             dataKey={"hours"}
  //             interval={50}
  //             // ticks={500}
  //             // tick={50}

  //             // allowDataOverflow="false"
  //           />
  //           <XAxis
  //             xAxisId="1"
  //             dataKey="days"
  //             interval={50}
  //             // tickCount={300}
  //           />
  //           <Line dot={false} type="step" dataKey="online" />
  //         </LineChart>
  //       </ResponsiveContainer>
  //     </div>
  //   </Box>
  // );
  return (
    <div
      style={{
        // backgroundColor: "red",
        // paddingBlockEnd: "150px",
        
        height: "250px",
        width: "80%", // אני ממליץ לשים את הרוחב כאן
        overflow: "auto",
      }}
    >
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
            <XAxis dataKey="hours" interval={50} />
            <XAxis xAxisId="1" dataKey="days" interval={50} />
            <Line dot={false} type="step" dataKey="online" />
          </LineChart>
        </ResponsiveContainer>
      </div>
     </div>
  );
  
};

export default Test;
