import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Header from './Header2';
import Menu from './Menu';
import Body from './Body';
import Footer from './Footer';

const MainWindow = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={2}>
                    <Menu />
                </Grid>
                <Grid item xs={10}>
                    <Body />
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MainWindow;
