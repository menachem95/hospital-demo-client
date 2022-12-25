import React from 'react';
import { Box, Paper } from '@mui/material';

const Menu = (props) => {
    return (
        <div>
            <Box
                sx={{
                    height: '80vh',
                    textAlign: 'center',
                    bgcolor: 'gray',
                }}
            >
                <Box>
                    <Paper>1</Paper>
                </Box>
                <Box xs={12}>
                    <Paper>2</Paper>
                </Box>
                <Box xs={12}>
                    <Paper>3</Paper>
                </Box>
            </Box>
        </div>
    );
};

export default Menu;
