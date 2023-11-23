import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';
// import MainWindow from './component2/MainWindow';
import SingleDepartment from "./components/Displays/SingleDepartment";
import ErrorServer from "./components/ErrorServer";
import SearchResult from "./components/Displays/SearchResult";
import OnlineStatusChart from "./components/Stats2";

import { io } from "socket.io-client";
import ServerSeting from "./components/ServerSetting";

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
import Test from "./components/SinglePrinterGraph";
import { ColorModeContext, useMode } from "./theme";
import Stats from "./components/Stats";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import DashboardPrinters from "./scenes/dashboardPrinters";
import DashboardComputers from "./scenes/dashboardComputers";
import AddPrinterForm from "./scenes/addPrinterForm";
import SinglePrinterStats from "./components/graphs/SinglePrinterStats";
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
import AddPrinter from "./components/Action/AddPrinter";
import Test2 from "./components/Test2/Test2";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("REACT_APP_BACKEND_URL:", REACT_APP_BACKEND_URL);
const socket = io.connect(REACT_APP_BACKEND_URL);

let error;

function App() {
  const [theme, colorMode] = useMode();
  const { printers } = useSelector((state) => state.display);
  const dispatch = useDispatch();

  socket.on("update-printres", (event, newPrinter) => {
    console.log("event: " + event);
    let newPrinters = [...printers];

    if (event === "update") {
      newPrinters = newPrinters.map((printer) => {
        if (printer._id === newPrinter._id) {
          return newPrinter;
        }
        return printer;
      });
    } else if (event === "add") {
      // if (newPrinters.some((printer) => printer._id === newPrinter._id)) {
      //   newPrinters = printers.map((printer) =>
      //     printer._id === newPrinter._id ? newPrinter : printer
      //   );
      // } else {
      newPrinters.push(newPrinter);
      // }
    } else if (event === "delete") {
      newPrinters = newPrinters.filter(
        (printer) => printer._id !== newPrinter._id
      );
    }

    dispatch(updatePrinters(newPrinters));
  });

  useEffect(() => {
    socket.on("send-printers", (printers, time) => {
      dispatch(updatePrinters(printers));
      dispatch(updateTime(time));
    });

    socket.emit("refresh", (printers, time) => {
      dispatch(updatePrinters(printers));
      dispatch(updateTime(time));
    });

    // socket.on("update-printres", (newPrinter, event) => {
    //   console.log("event: " + event);
    //   let newPrinters = [...printers];
    //   console.log("newPrinters: ", newPrinters);
    //   if (event === "update") {
    //     newPrinters = printers.map((printer) =>
    //       printer._id === newPrinter._id ? newPrinter : printer

    //       );
    //        debugger;
    //   } else if (event === "delete") {
    //   } else if (event === "add") {
    //   }
    //   console.log("newPrinters: ", newPrinters);
    //   dispatch(updatePrinters(newPrinters));
    // });

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
    // return () => {
    //   // socket.disconnect();
    //   // socket.off("")
    // };
  }, []);

  // useEffect(() => {
  // socket.on("update-printres", (newPrinter, event) => {
  //   console.log("event: " + event);
  //   let newPrinters = [...printers];
  //   console.log("newPrinters: ", newPrinters);
  //   if (event === "update") {
  //     newPrinters = printers.map((printer) =>
  //       printer._id === newPrinter._id ? newPrinter : printer

  //       );
  //        debugger;
  //   } else if (event === "delete") {
  //   } else if (event === "add") {
  //   }
  //   console.log("newPrinters: ", newPrinters);
  //   dispatch(updatePrinters(newPrinters));
  // });
  // }, [])

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
                  />{" "}

                  <Route path="/test" element={<Test />} />
                  {/* <Route path="/stats" element={<Stats />} /> */}
                  <Route path="/stats2" element={<OnlineStatusChart />} />
                  <Route path="/test2" element={<Test2 />} />
                  <Route path="/server-setting" element={<ServerSeting />} />
                  <Route path="/printer-history/:printerId" element={<SinglePrinterStats />} />
                  <Route
                    path="/search"
                    element={<SearchResult socket={socket} />}
                  />
                  <Route
                    path="/favoritePrinters"
                    element={<SearchResult favorite={true} socket={socket} />}
                  />
                  <Route
                    path="/printers"
                    element={<DashboardPrinters className="test" />}
                  />
                  {/* <Route path="/computers" element={<DashboardComputers />} /> */}
                  <Route
                    path="/:deviceId/departments/:departmentId"
                    element={<SingleDepartment socket={socket} />}
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
                    element={<AddPrinter socket={socket} />}
                    // element={<AddPrinterForm />}
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
