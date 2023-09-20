import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';
// import MainWindow from './component2/MainWindow';
import SingleDepartment from "./components/Displays/SingleDepartment";
import ErrorServer from "./components/ErrorServer";
import SearchResult from "./components/Displays/SearchResult";

import { io } from "socket.io-client";

// import DisplayPrinters from './component/Displays/DisplayPrinters';
// import Header from './component/Header/Header';
// import AddPrinterForm from './component/AddPrinterForm';
import {
  updatePrinters,
  updateComputers,
  updateTime,
} from "./store/displayPrintersSlice";
// import DisplayDepartments from './component/Displays/DisplayDepartments';
// import EnteringPassword from './component/Admin/EnteringPassword';

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import DashboardPrinters from "./scenes/dashboardPrinters";
import DashboardComputers from "./scenes/dashboardComputers";
import AddPrinterForm from "./scenes/addPrinterForm";
// import OnePrinter from "./components/Displays/OnePrinter";
// import Invoices from './scenes/invoices';
// import Team from './scenes/team';
// import Contacts from './scenes/contacts';
// import Bar from './scenes/bar';
// import Pie from './scenes/pie';
// import FAQ from './scenes/faq';
// import Line from './scenes/line';
// import Form from './scenes/form';
// import Geography from './scenes/geography';
import AddUserForm from "./scenes/form";
import DeleteDevice from "./scenes/DeledeDevice";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("REACT_APP_BACKEND_URL:", REACT_APP_BACKEND_URL);
const socket = io.connect(REACT_APP_BACKEND_URL);

let error;

function App() {
  const [theme, colorMode] = useMode();
  const { printers } = useSelector((state) => state.display);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("send-printers", (printers, time) => {
      dispatch(updatePrinters(printers));
      dispatch(updateTime(time));
    });

    socket.emit("refresh", (printers, time) => {
      dispatch(updatePrinters(printers));
      dispatch(updateTime(time));
    });

    socket.on("update-printres", (printer, event) => {
      console.log("1 printer:", printer)
      console.log("event: " + event);
      let newPrinters = [...printers];
      if (event === "update") {
        newPrinters.map(p => {
          if (p._id === printer._id) {
            console.log("2 printer:", p)
            return printer;
          }
        })
        newPrinters.map(p => {
          if (p._id === printer._id) {
            console.log("3 printer:", p)
          }
        })
      } else if (event === "delete") {
      } else if (event === "add") {
      }
      
      dispatch(updatePrinters(newPrinters))
    });


    // let responseData = printers;
    // const fetchPrinters = async () => {
    //   try {

    //     const response = await fetch(

    //     `${process.env.REACT_APP_BACKEND_URL}/fetch-printers`,
    //     // "https://hospitol-demo-server.onrender.com/fetch-printers",
    //     //  "http://localhost:8080/fetch-printers",
    //     {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );

    //   responseData = await response.json();
    //   } catch (err) {
    //     console.log(err)
    //     error = err
    //   }

    // const res = await fetch(
    //   // "https://hospitol-demo-server.onrender.com/ping"
    //   "http://localhost:8080/ping",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(
    //       responseData.map((printer) => ({
    //         address: printer.address,
    //         department: printer.department,
    //         type: printer.type,
    //       }))
    //     ),
    //   }
    // );
    // const receivedPrinters = await res.json();

    // const newPrinters = responseData
    //   // .filter(device => device.type === "printer")
    //   .map((printer) => {
    //     return {
    //       ...printer,
    //       online: receivedPrinters.find((p) => p.address === printer.address)
    //         .online,
    //     };
    //   });
    // const newComputers = responseData
    //   .filter((device) => device.type === "computer")
    //   .map((computer) => {
    //     return {
    //       ...computer,
    //       online: receivedPrinters.find((c) => c.address === computer.address)
    //         .online,
    //     };
    //   });

    // dispatch(updatePrinters(printers));
    // dispatch(updateComputers(newComputers));
    // dispatch(updateTime());
    // };
    // let timer = setTimeout(function f() {
    //   console.log("sending printers");

    //   fetchPrinters();
    //   timer = setTimeout(f, 45000);
    // }, 1000);
    // return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ overflow: "hidden" }}>
            <Sidebar />
            <main className="content">
              <Topbar socket={socket} />
              {!error ? (
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/printers" replace />}
                  />
                  <Route path="/search" element={<SearchResult />} />
                  <Route path="/printers" element={<DashboardPrinters />} />
                  {/* <Route path="/computers" element={<DashboardComputers />} /> */}
                  <Route
                    path="/:deviceId/departments/:departmentId"
                    element={<SingleDepartment socket={socket}/>}
                  >
                    {/* <Route
                  
                    path="/:deviceId/departments/:departmentId/one-printer"
                    element={<OnePrinter />}
                  /> */}
                  </Route>

                  {/* <Route path="/deshboadPrinters" element={<DashboardPrinters />} /> */}
                  {/* <Route path="/deshboadComputers" element={<DashboardComputers />} /> */}

                  <Route
                    path="/admin/add-printer"
                    element={<AddPrinterForm />}
                  />
                  <Route
                    path="/admin/delete-printer"
                    element={<DeleteDevice />}
                  />

                  {/* <Route path="/team" element={<Team />} />
                                <Route
                                    path="/invoices"
                                    element={<Invoices />}
                                />
                                <Route
                                    path="/contacts"
                                    element={<Contacts />}
                                />
                                <Route path="/bar" element={<Bar />} />
                                <Route path="/pie" element={<Pie />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/line" element={<Line />} />
                                <Route path="/form" element={<Form />} /> */}
                  {/* <Route
                                    path="/geography"
                                    element={<Geography />} */}
                </Routes>
              ) : (
                <ErrorServer />
              )}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );

  // return (
  //   <Fragment>
  //     <Header />
  //     <Routes>
  //       <Route
  //         path="/"
  //         exac
  //         element={
  //           <Fragment>
  //             {printers.length === 0 && <><span>Loading printers</span>  <CircularProgress /></>}
  //             {printers.length !== 0 && <DisplayDepartments />}
  //           </Fragment>
  //         }
  //       />
  //       {/* {addPrinterModal && <AddPrinterForm />} */}

  //       <Route path="/admin" exact element={<EnteringPassword />} />

  //       <Route
  //         path="/departments/:departmentId"
  //         element={<DisplayPrinters getByTheLink={true} />}
  //       ></Route>
  //     </Routes>
  //   </Fragment>
  // );
}

export default App;
