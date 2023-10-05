import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { motion } from "framer-motion";
import PrintIcon from "@mui/icons-material/Print";

const Printer = ({ printer }) =>
  // {room, address, icon, totalPrinters, online }
  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { room, address, icon, totalPrinters, online, department } = printer;
    return (
      <Box width="100%" m="0 30px">
        {/* {online && <a href={`https:${address}`} target="_blank" rel="noopener noreferrer"></a>} */}
        <Box display="flex" justifyContent="center" textAlign="center">
          <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[300] }}
          >
            {/* {`מחלקת ${department}` } */}
            {department}
          </Typography>
            <PrintIcon
              sx={{
                color: colors.greenAccent[600],
                fontSize: "90px",
              }}
            />

            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
              {/* {`חדר ${room}` } */}
              {room}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt="3px">
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {address}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt="3px">
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: colors.greenAccent[600] }}
          >
            {totalPrinters}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt="3px"
          mb="0"
          height="50px"
        >
          <motion.div
            key={online}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
              },
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
            //   >
            //     <div

            // variant="h5"
            // fontStyle="italic"
            style={{
              backgroundColor: online ? "#00FF00" : "red",
              borderRadius: "50%",
              height: 20,
              width: 20,
              alignSelf: "flex-end",
            }}
          >
            {/* {`${online}`} */}
            {/* </div> */}
          </motion.div>
        </Box>{" "}
        {/* <Box display="flex" justifyContent="center" textAlign="center"> */}
        
        {/* </Box> */}
      </Box>
    );
  };

export default Printer;
