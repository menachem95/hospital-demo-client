import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PrintIcon from "@mui/icons-material/Print";
import ProgressCircle from "../../components/ProgressCircle";
import { useSelector } from "react-redux";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import departmentIcon from "../../images/department.png";


const Dashboard = () => {
  const { printers } = useSelector((state) => state.display);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const departments = [];

  for (let printer of printers) {
    if (!departments.includes(printer.department)) {
      departments.push(printer.department);
    }
  }

 

  // if(printers.length === 0){
  //   return <h1>Loading...</h1>
  // }

  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box
        sx={{ width: 1 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        // top="80px"
        top={"5%"}
      >
        <Header
          title={printers.length === 0 ? "...טוען נתונים מהשרת" : "דשבורד מדפסות"}
         
        />
      </Box>

      {/* GRID & CHARTS */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{
          mb: 2,
          // display: "flex",
          flexDirection: "column",
          height: "70vh",
          overflow: "hidden",
          overflowY: "scroll",
         // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
      >
        {printers.length === 0 ? Array.from(Array(8).keys()).map((d) => {
          return (
            <Box
              key={d}
              gridColumn="span 3"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              display="flex"
              flexDirection="column"
              alignContent="center"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="100%" m="0 30px" display="flex"
              flexDirection="column"
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              >
                <Skeleton
                  variant="circular"
                  animation="wave"
                  style={{
                    height: 90,
                    width: 90,
                    //  alignSelf: "flex-end",
                  }}
                />

                <Skeleton
                  animation="wave"
                  variant="text"
                  height="35px"
                  width="100px"
                />

                <Skeleton
                  animation="wave"
                  variant="text"
                  height="25px"
                  width="140px"
                />

                <Skeleton
                  variant="circular"
                  animation="wave"
                  style={{
                    marginTop: 40,
                    height: 20,
                    width: 20,
                  }}
                />
              </Box>
            </Box>
          );
        }):
        // Object.keys(search).map(d => {return <Box  className="link" 
        //       key={d}
        //       gridColumn="span 3"
        //       gridRow="span 2"
        //       backgroundColor={colors.primary[400]}
        //       display="flex"
        //       alignItems="center"
        //       justifyContent="center"
        //       onClick={()=> navigate(`/printers/departments/${d}`)}
            
        //     >
            
        //         <StatBox  width="100%"
        //           display="flex"
        //           justifyContent="center"
        //           title={search[d].address}
        //           // subtitle={`מדפסות מקוונות: ${onlinePrinters.length}/${allPrinters.length}`}
        //           // online={allPrinters.length - onlinePrinters.length === 0}
        //           icon={
        //             <PrintIcon
        //               sx={{
        //                 color: colors.greenAccent[600],
        //                 fontSize: "90px",
        //               }}
        //             />
        //             }/>
        //         </Box>})}
      
       departments
       .sort((a, b) => a.localeCompare(b, 'he', { sensitivity: 'base' }))
       .map((d) => {
          const allPrinters = printers.filter((p) => p.department === d);
          const onlinePrinters = allPrinters.filter((p) => p.online);
          return (
            <Box  className="link" 
              key={d}
              gridColumn="span 3"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={()=> navigate(`/printers/departments/${d}`)}
            
            >
            
                 <StatBox  width="100%"
                  display="flex"
                  justifyContent="center"
                  title={d}
                  subtitle={`מדפסות מקוונות: ${onlinePrinters.length}/${allPrinters.length}`}
                  online={allPrinters.length - onlinePrinters.length === 0}
                  icon={
                    // <PrintIcon
                    //   sx={{
                    //     color: colors.greenAccent[600],
                    //     fontSize: "90px",
                    //   }}
                    // />
                    <img src={departmentIcon} style={{
                          color: colors.greenAccent[600],
                          width: "110px",
                          // filter: "invert(8%) sepia(97%) saturate(7488%) hue-rotate(12deg) brightness(92%) contrast(114%)",
                        }} />
                  }
                />
           
             </Box>
           );
        
      }
        )
        } 

        {/* ROW 2 */}
        </Box>
      </Box>  )
                    }
;

export default Dashboard;
