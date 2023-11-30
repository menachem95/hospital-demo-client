import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import PrinterInfoItem from "../UI/PrinterInfoItem";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PrintIcon from "@mui/icons-material/Print";
import PlaceIcon from "@mui/icons-material/Place";
import LanIcon from "@mui/icons-material/Lan";

const printerKey = {
  address: "כתובת רשת",
  department: "מחלקה",
  room: "חדר",
  description: "פרטים נוספים",
  printerModel: "דגם",
  line: "נקודה בקיר",
  pag: "PAG מספר",
};

const AddPrinter = ({ socket }) => {
  const [value, setValue] = useState("נתוני מדפסת");

  const [newPrinter, setNewPrinter] = useState({});
  const navigate = useNavigate();

  const findKeyByValue = (obj, value) => {
    for (let key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
    return null;
  };

  const onBlurHandler = (input) => {
    const { name, value } = input;
    const key = findKeyByValue(printerKey, name);

    setNewPrinter({ ...newPrinter, [key]: value });
    console.log(newPrinter);
  };

  return (
    <Box display="grid" margin={"auto"} marginTop={"80px"} width={500}>
      <Box sx={{ width: "100%" }}>
        <Box
          marginBottom="60px"
          sx={{ borderBottom: 0, borderColor: "divider" }}
        >
          <Tabs
            centered
            value={value}
            onChange={(e, value) => setValue(value)}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab
              label="נתוני רשת"
              value="נתוני רשת"
              icon={<LanIcon fontSize="large" />}
              sx={{ width: "33.3%" }}
            />
            <Tab
              label="מיקום"
              value="מיקום"
              icon={<PlaceIcon fontSize="large" />}
              sx={{ width: "33.3%" }}
            />
            <Tab
              label="נתוני מדפסת"
              value="נתוני מדפסת"
              icon={<PrintIcon fontSize="large" />}
              sx={{ width: "33.3%" }}
            />
          </Tabs>

          {value === "נתוני מדפסת" && (
            <Box>
              <Grid xs={6} style={{ textAlign: "end", width: "100%" }}>
                <PrinterInfoItem
                  title={printerKey.printerModel}
                  blur={onBlurHandler}
                />

                <PrinterInfoItem title={printerKey.pag} blur={onBlurHandler} />

                <PrinterInfoItem
                  title={printerKey.description}
                  blur={onBlurHandler}
                />
              </Grid>
              <IconButton
                onClick={() => {
                  setValue("מיקום");
                }}
                style={{ textAlign: "start", marginBottom: "100px" }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
          )}
          {value === "מיקום" && (
            <Box>
              <Grid xs={6} style={{ textAlign: "end", width: "100%" }}>
                <PrinterInfoItem
                  title={printerKey.department}
                  blur={onBlurHandler}
                />

                <PrinterInfoItem title={printerKey.room} blur={onBlurHandler} />
              </Grid>
              <IconButton
                onClick={() => {
                  setValue("נתוני רשת");
                }}
                style={{ textAlign: "start", marginBottom: "100px" }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
          )}
          {value === "נתוני רשת" && (
            <Box>
              <Grid xs={6} style={{ textAlign: "end", width: "100%" }}>
                <PrinterInfoItem
                  title={printerKey.address}
                  blur={onBlurHandler}
                />

                <PrinterInfoItem title={printerKey.line} blur={onBlurHandler} />
              </Grid>
              <IconButton
                onClick={() => {
                  socket.emit("update-printres", "add", newPrinter);
                  navigate(`/printers/departments/${newPrinter.department}`);
                }}
                style={{ textAlign: "start", marginBottom: "100px" }}
              >
                <DoneIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddPrinter;
