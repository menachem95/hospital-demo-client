import { useSelector } from 'react-redux';

import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const Header = ({ title, subtitle=null }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {time} = useSelector(state => state.display)
    console.log(time)
    return (
        <Box mb="30px" >
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: '0 0 5px 0' }}
            >
                {title}
            </Typography>
         
            <Typography variant="h5" color={colors.greenAccent[400]}>
                {subtitle ? subtitle : time}
            </Typography>

            
        </Box>
    );
};

export default Header;
