import { Box } from "@mui/material";
import SinglePrinterGraph from "../Test";
import Header from "../Header";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const SinglePrinterStats = () => {
  let data;
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
          flexDirection: "column",
          height: "70vh",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {" "}
          <DatePicker
            onAccept={(v) => {
              console.log(JSON.stringify(v));
            }}
            defaultValue={dayjs("2023-9-20")}
            label="תאריך התחלה"
            sx={{ width: 150, margin: "5px" }}
          />
          <DatePicker
            onAccept={(v) => {
              console.log(JSON.stringify(v));
            }}
            defaultValue={dayjs("2023-9-20")}
            label="תאריך סיום"
            sx={{ width: 150, margin: "5px" }}
          />
        </LocalizationProvider>

        <SinglePrinterGraph data={data} />
      </Box>
    </Box>
  );
};

export default SinglePrinterStats;
