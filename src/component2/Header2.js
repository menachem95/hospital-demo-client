import { Box } from '@mui/material';
import Header from '../components/Header/Header';

export default function Header2() {
    return (
        <Box
            sx={{
                height: '12vh',
                textAlign: 'center',
                bgcolor: 'green',
            }}
        >
            <Header />
        </Box>
    );
}
