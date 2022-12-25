import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PrintIcon from "@mui/icons-material/Print";
import ComputerIcon from"@mui/icons-material/Computer"
import ProgressCircle from "../../components/ProgressCircle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { computers } = useSelector((state) => state.display);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const departments = [];

  for (let computer of computers) {
    if (!departments.includes(computer.department)) {
      departments.push(computer.department);
    }
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box  sx={{ width: 1 }} display="flex" justifyContent="space-between" alignItems="center" position="sticky" top="80px">
        <Header
          title="Computers Dashboard"
          subtitle="Welcome to your dashboard"
        />
      </Box>

      {/* GRID & CHARTS */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {departments.map((d) => {
          const allComputers = computers.filter((c) => c.department === d);
          const onlineComputers = allComputers.filter((c) => c.online);
          return (
            <Box
              key={d}
              gridColumn="span 3"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Link to={`departments/${d}`}>
                <StatBox
                  display="flex"
                  justifyContent="center"
                  title={d}
                  subtitle={`מחשבים מקוונים: ${onlineComputers.length}/${allComputers.length}`}
                  online={allComputers.length - onlineComputers.length === 0}
                  icon={
                    <ComputerIcon
                      sx={{
                        color: colors.greenAccent[600],
                        fontSize: "90px",
                      }}
                    />
                  }
                />
              </Link>
            </Box>
          );
        })}
      
        
        
      </Box>
      {/* ROW 3 */}
    </Box>
  );
};

export default Dashboard;
