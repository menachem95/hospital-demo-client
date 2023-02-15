import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Printer from "../Printer";
import PrintIcon from "@mui/icons-material/Print";
import ComputerIcon from "@mui/icons-material/Computer";
import { Link } from "react-router-dom";
import { useState } from "react";
import PrinterModel from "../modal/PrinterModel";
import { updatePrinterModelState } from "../../store/displayPrintersSlice";

const SingleDepartment = () => {
  const { printers, computers, printerModelState } = useSelector(
    (state) => state.display
  );
  const { departmentId, deviceId } = useParams();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let department = printers.filter(
    (printer) => printer.department === departmentId
  ); //[]

  // if (deviceId === "printers"){
  //   department = printers.filter(
  //   (printer) => printer.department === departmentId
  // );
  // } else if (deviceId === "computers"){
  //   department = computers.filter(
  //     (computer) => computer.department === departmentId
  //   );
  // }

  const onlineDevices = department.filter((device) => device.online).length;

  //   if (deviceId === "computers"){
  //     return (
  //       <Box m="20px">
  //         <Box
  //           display="flex"
  //           justifyContent="space-between"
  //           alignItems="center"
  //           position="sticky"
  //           top="80px"
  //         >
  //           <Header
  //             title={departmentId}
  //             subtitle={`מחשבים מקוונים: ${onlineDevices}/${department.length}`}
  //           />
  //         </Box>
  //         <Box
  //           display="grid"
  //           gridTemplateColumns="repeat(12, 1fr)"
  //           gridAutoRows="140px"
  //           gap="20px"
  //         >
  //           {department.map((printer) => {
  //             return (
  //               <Box
  //                 key={printer.pag}
  //                 gridColumn="span 3"
  //                 gridRow="span 2"
  //                 backgroundColor={colors.primary[400]}
  //                 display="flex"
  //                 alignItems="center"
  //                 justifyContent="center"
  //               ><Printer
  //               room={printer.room}
  //               address={printer.address}
  //               online={printer.online}
  //               pag={printer.pag}
  //               line={printer.line}
  //               department={printer.department}
  //               description={printer.description}
  //               model={printer.model}
  //               icon={
  //                 <ComputerIcon
  //                   sx={{
  //                     color: colors.greenAccent[600],
  //                     fontSize: "90px",
  //                   }}
  //                 />
  //               }
  //             />

  //       </Box>
  //     );
  //   })}
  // </Box>
  // </Box>
  //  ) }

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
                {/* <a
                  href={`https:${printer.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                {/* <Link to={`/one-printer/${printer._id}`}> */}
                <Printer
                  room={printer.room}
                  address={printer.address}
                  online={printer.online}
                  pag={printer.pag}
                  line={printer.line}
                  department={printer.department}
                  description={printer.description}
                  model={printer.model}
                  icon={
                    <PrintIcon
                      sx={{
                        color: colors.greenAccent[600],
                        fontSize: "90px",
                      }}
                    />
                  }
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

export default SingleDepartment;
