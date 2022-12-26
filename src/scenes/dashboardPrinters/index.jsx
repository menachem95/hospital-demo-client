import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PrintIcon from "@mui/icons-material/Print";
import ProgressCircle from "../../components/ProgressCircle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { printers } = useSelector((state) => state.display);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const departments = [];

  for (let printer of printers) {
    if (!departments.includes(printer.department)) {
      departments.push(printer.department);
    }
  }

  if(printers.length === 0){
    return <h1>Loading...</h1>
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box  sx={{ width: 1 }} display="flex" justifyContent="space-between" alignItems="center" position="sticky" top="80px">
        <Header
          title="Printers Dashboard"
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
          const allPrinters = printers.filter((p) => p.department === d);
          const onlinePrinters = allPrinters.filter((p) => p.online);
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
                  subtitle={`מדפסות מקוונות: ${onlinePrinters.length}/${allPrinters.length}`}
                  online={allPrinters.length - onlinePrinters.length === 0}
                  icon={
                    <PrintIcon
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
       

        {/* ROW 2 */}
        <Box
          gridColumn="span 10"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography>
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* ROW 3 */}
    </Box>
  );
};

export default Dashboard;
