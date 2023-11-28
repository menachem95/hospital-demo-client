import React,{ useEffect, useState } from "react";

import {Tabs, Tab} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  Brush,
  Area,
  AreaChart,
} from "recharts";

import {
  aggregateDataByWeek,
  aggregateDataByDay,
  aggregateDataByHour,
  aggregateDataByFiveMinutes,
} from "../../func/aggregateDates func.js";



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



const add10milisec = (result) => {
  const newResult = [];
  for (let i = 0; i < result?.length; i++) {
    newResult.push(result[i]);
    let date = result[i].date + 10;
    let obj = { ...result[i + 1], date, first: false };
    newResult.push(obj);
  }
  return newResult;
};

const CustomizedDot = (props) => {
  const { cx, cy, payload } = props;
  const { serverRunning } = payload;
  let color = "green";
  if (serverRunning < 75) color = "yellow";
  if (serverRunning < 40) color = "orange";
  if (serverRunning < 10) color = "red";
  return (
    <>
    
      <svg
      // x={cx - 10}
      // y={cy - 10}
      // width={20}
      // height={20}
      // fill="red"
      // viewBox="0 0 1024 1024"
      >
        <circle
         
          cx={cx}
          cy={cy}
          r="2"
          fill={color}
        />
      </svg>
    </>
  );
};

const RepositoryCoverageTimelineGraphTooltip = (props) => {


  if (props.payload && props.payload.length >= 1) {
    const {
     
      average,
      date,
     
      serverRunning,
    } = props.payload[0].payload;
   
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
        
        data-testid="coverage-timeline-graph-tooltip"
      >
        <div >
          <span data-testid="tooltip-line-coverage-percentage">
           
            {time}
          </span>
        </div>
        <div >
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
        
      </div>
    );
  } else {
    return <span data-testid="empty-tooltip" />;
  }
};




const defaultDaysDiff = (logs) => {
  const one = new Date(logs[0].date).getTime();
  const tow = new Date(logs[logs.length - 1].date).getTime();
  const timeDiff = tow - one;
  return Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
};

const Graph = ({ logs }) => {
  const [state, setState] = useState({
   
    timerId: 0,
   
  });


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


 
  // const gradientOffset = () => {
  //   const dataMax = Math.max(...state.data.map((i) => i.average));
  //   const dataMin = Math.min(...state.data.map((i) => i.average));

  

  return (
    <div
      style={{
        width: "500px",
        height: "250px",
      
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

     
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart
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
            
            fill="rgba(255,255,255,0)"
            // onChange={(e) => updateBrush(e)}
            
            startIndex={0}
            endIndex={10}
            tick={true}
      
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


