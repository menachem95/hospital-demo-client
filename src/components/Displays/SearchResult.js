import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { updatePrinterModelState } from "../../store/displayPrintersSlice";

import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../UI/Header";
import Printer from "../UI/Printer";
import PrinterModel from "../modal/PrinterModel";
import PrntersDashboard from "./PrintersDashboard";

const SearchResult = ({favorite=false, socket}) => {
    const { printers, printerModelState, searchKey } = useSelector(
    (state) => state.display
  );
  const { departmentId, deviceId } = useParams();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (searchKey.trim() === "" && !favorite) return <PrntersDashboard />;

  let filtersPrinters;

  const keys = [
    "address",
    "pag",
    "printerModel",
    "department",
    "description",
    "room",
  ];
  
  if (favorite) {
    
    filtersPrinters = printers.filter(printer => printer.isFavorite)
    
    console.log("filtersPrinters:", filtersPrinters)
    
  } else {
    filtersPrinters = printers.filter((printer) => {
    return keys.some((key) => {
      return String(printer[key]).includes(searchKey);
    });
  });
  }

  

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
          <Header title={`נמצאו: ${filtersPrinters.length} מדפסות`} />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          sx={{
            mb: 2,
            flexDirection: "column",
            height: "70vh",            overflow: "hidden",
            overflowY: "scroll",
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
                <Printer printer={printer} />
              </Box>
            );
          })}
        </Box>
      </Box>
      {printerModelState.isOpen && <PrinterModel socket={socket} />}
    </>
  );
};

export default SearchResult;
