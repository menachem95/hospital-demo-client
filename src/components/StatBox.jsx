import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';

const StatBox = ({ title, subtitle, icon, totalPrinters, online }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="center" textAlign="center">
                <Box>
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
            <Box display="flex" justifyContent="center" mt="3px" >
                <Typography
               
                    variant="h5"
                    sx={{ color: colors.greenAccent[500] }}
                >
                    {subtitle}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt="3px" >
                <Typography
                    
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[600] }}
                >
                    {totalPrinters}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center"  mt="3px" mb="0" height="50px">
                <div
                    
                    // variant="h5"
                    // fontStyle="italic"
                    style={{ backgroundColor: online ? "#00FF00" : "red", borderRadius: "50%", height: 20, width: 20, alignSelf:"flex-end" }}
                >
                    {/* {`${online}`} */}
                </div>
            </Box>
        </Box>
    );
};

export default StatBox;
