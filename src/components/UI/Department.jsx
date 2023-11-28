import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { motion } from "framer-motion";

const Department = ({ title, subtitle, icon, online }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="center" textAlign="center">
        <Box>
          {" "}
          {icon}
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt="3px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mt="3px" mb="0" height="50px">
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

export default Department;
