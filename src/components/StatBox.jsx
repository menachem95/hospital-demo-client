import { Box, Typography, useTheme } from "@mui/material";
import { Skeleton } from "@mui/material";
import { tokens } from "../theme";
import { useSelector } from "react-redux";

const StatBox = ({ title, subtitle, icon, totalPrinters, online }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { printers } = useSelector((state) => state.display);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="center" textAlign="center">
        <Box>
          
            {/* <Skeleton
              variant="circular"
              sx={{
                color: colors.greenAccent[600],
                fontSize: "85px",
                width: "100px",
              }}
            /> */}
          
          {icon}
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
            {/* {<Skeleton variant="text" sx={{ fontSize: 'h3' }} />} */}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt="3px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {/* {<Skeleton variant="text" sx={{ fontSize: '1rem' }} />} */}
          {subtitle}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mt="3px" mb="0" height="50px">
        {/* <Skeleton variant='rectangular' style={{borderRadius: "50%", height: 20, width: 20, alignSelf:"flex-end" }} /> */}
        <div
          style={{
            backgroundColor: online ? "#00FF00" : "red",
            borderRadius: "50%",
            height: 20,
            width: 20,
            alignSelf: "flex-end",
          }}
        />
      </Box>
    </Box>
  );
};

export default StatBox;
