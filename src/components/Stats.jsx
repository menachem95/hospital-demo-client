import { useEffect, useState } from "react";
import { Box } from "@mui/material";


const DisplayChangeDates = ({ changeDates }) => {
    
    if (!changeDates || changeDates.length === 0) {
        return <div>No change dates to display.</div>;
      }
    return (
      <div style={{width: "100%"}}>
        <h2>Change Dates:</h2>
        <ul>
          {changeDates.map((item, index) => (
            <li key={index}>
              Date: {item.time}, Value: {item.online.toString()}
            </li>
          ))}
        </ul>
      </div>
    );
  };

const Stats = () => {
  const [logs, setLogs] = useState([]);
  const fetchLogs = async () => {
    const res = await fetch(
      "http://localhost:8080/logs/onePrinter/65082196ef2033988448587d",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const logs = await res.json();
    setLogs(logs
        // .slice(0, 50)
        );
    console.log(logs.slice(0, 10));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const sortedData = logs?.sort((a, b) => new Date(a.time) - new Date(b.time));

  const displayChangeDates = () => {
    const changeDates = [];
  
    for (let i = 1; i < sortedData.length; i++) {
        
      if (sortedData[i].online !== sortedData[i - 1].online) {
        changeDates.push({
          time: `${sortedData[i].time.day} ב${sortedData[i].time.month}, ${sortedData[i].time.hours}:${sortedData[i].time.minutes}`,
          online: sortedData[i]?.online
        });
      }
    }
  
    return changeDates;
  };

  

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
      sx={{
        mb: 2,
        flexDirection: "column",
        height: "70vh",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
        <DisplayChangeDates changeDates={displayChangeDates()} />
      {/* {logs?.map((log) => {
        return (
          <label key={log.date}>
            <h1>{log.address}</h1>
            <h2>{log.online.toString()}</h2>
            <h3>{`${log.time.day} ב${log.time.month}`}</h3>
            <h3>{`${log.time.hours}:${log.time.minutes}`}</h3>
          </label>
        );
      })} */}
    </Box>
  );
};

export default Stats;
