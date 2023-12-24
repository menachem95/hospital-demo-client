import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";


import { updatePrinterModelState } from "../../store/displayPrintersSlice";

import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../UI/Header";
import Printer from "../UI/Printer";
import PrinterModel from "../modal/PrinterModel";

const SingleDepartment = ({ socket }) => {
  const { printers, printerModelState } = useSelector((state) => state.display);
  const { departmentId, deviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let department = printers.filter(
    (printer) => printer.department === departmentId
  );

  if (department.length === 0) {
    navigate("/");
  }

  const onlineDevices = department.filter((device) => device.online).length;

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
            title={departmentId}
            subtitle={`מדפסות מקוונות: ${onlineDevices}/${department.length}`}
          />
        </Box>
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
          {department.map((printer) => {
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

export default SingleDepartment;
