import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../Header";
import Printer from "../Printer";
import PrintIcon from "@mui/icons-material/Print";
import ComputerIcon from "@mui/icons-material/Computer";
import { Link } from "react-router-dom";
import { useState } from "react";
import PrinterModel from "../modal/PrinterModel";
import { updatePrinterModelState } from "../../store/displayPrintersSlice";
import Dashboard from "../../scenes/dashboardPrinters";

const SearchResult = () => {
  const {
    printers,
    printerModelState,
    searchKey,
  } = useSelector((state) => state.display);
  const { departmentId, deviceId } = useParams();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (searchKey.trim() === "") return <Dashboard />

  

  const keys = ["address", "pag", "printerModel", "department", "description", "room"];

  const filtersPrinters = printers
    // .map(printer => {
    //   return {...printer, _id: ""}
    // })
    .filter((printer) => {
      return keys
      .some((key) => {
        // if (key === "printer.address" || key === "printer.pag") {
          return String(printer[key]).includes(searchKey);
        // }
      });
    });

  return (
    <>
      <Box m="20px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="sticky"
          top="80px"
        >
          <Header
            // title={"תוצאות חיפוש"}
            title={`נמצאו: ${filtersPrinters.length} מדפסות`}
          />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          sx={{
            mb: 2,
            // display: "flex",
            flexDirection: "column",
            height: 700,
            overflow: "hidden",
            overflowY: "scroll",
            // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
          }}
        >
          {filtersPrinters.map((printer) => {
            return (
              <Box
                className="link"
                key={printer._id}
                gridColumn="span 3"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() =>
                  dispatch(updatePrinterModelState({ isOpen: true, printer }))
                }
              >
                {/* <a
                  href={`https:${printer.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                {/* <Link to={`/one-printer/${printer._id}`}> */}
                <Printer
                  printer={printer}
                  // room={printer.room}
                  // address={printer.address}
                  // online={printer.online}
                  // pag={printer.pag}
                  // line={printer.line}
                  // department={printer.department}
                  // description={printer.description}
                  // model={printer.model}
                  // icon={
                  //   <PrintIcon
                  //     sx={{
                  //       color: colors.greenAccent[600],
                  //       fontSize: "90px",
                  //     }}
                  //   />
                  // }
                />
                {/* </Link> */}
                {/* </a> */}
              </Box>
            );
          })}
        </Box>
      </Box>
      {printerModelState.isOpen && <PrinterModel />}
    </>
  );
};

export default SearchResult;
