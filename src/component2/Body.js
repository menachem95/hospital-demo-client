import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DisplayDepartments from '../components/Displays/DisplayDepartments';
import DisplayPrinters from '../components/Displays/DisplayPrinters';
//import AddPrinterForm from "./component/AddPrinterForm";
import EnteringPassword from '../components/Admin/EnteringPassword';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Body = () => {
    const printers = useSelector((state) => state.Display.printers);
    return (
        <Box
            sx={{
                height: '80vh',
                textAlign: 'center',
                bgcolor: 'purple',
            }}
        >
            <Routes>
                <Route
                    path="/"
                    exac
                    element={
                        <>
                            {printers.length === 0 && (
                                <>
                                    <span>Loading printers</span>{' '}
                                    <CircularProgress />
                                </>
                            )}
                            {printers.length !== 0 && <DisplayDepartments />}
                        </>
                    }
                />
                {/* {addPrinterModal && <AddPrinterForm />} */}

                <Route path="/admin" exact element={<EnteringPassword />} />

                <Route
                    path="/departments/:departmentId"
                    element={<DisplayPrinters getByTheLink={true} />}
                ></Route>
            </Routes>
        </Box>
    );
};

export default Body;
