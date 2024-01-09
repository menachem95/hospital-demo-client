import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { io } from "socket.io-client";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { updatePrinters, updateTime } from "./store/displayPrintersSlice";

import Topbar from "./components/bars/Topbar";
import Sidebar from "./components/bars/Sidebar";
import DashboardPrinters from "./components/Displays/PrintersDashboard";
import SinglePrinterStats from "./components/graphs/SinglePrinterStats";
import AddPrinter from "./components/Action/AddPrinter";
import ServerSeting from "./components/Action/ServerSetting";
import SingleDepartment from "./components/Displays/SingleDepartment";
import ErrorServer from "./components/Displays/ErrorServer";
import SearchResult from "./components/Displays/SearchResult";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// console.log("REACT_APP_BACKEND_URL:", REACT_APP_BACKEND_URL);
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
      newPrinters.push(newPrinter);
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
  }, []);

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
                  {/* <Route path="/test" element={<Test />} /> */}
                  {/* <Route path="/server-setting" element={<ServerSeting />} /> */}
                  <Route
                    path="/printer-history/:printerId"
                    element={<SinglePrinterStats />}
                  />
                  <Route
                    path="/search"
                    element={<SearchResult socket={socket} />}
                  />
                  <Route
                    path="/favoritePrinters"
                    element={<SearchResult favorite={true} socket={socket} />}
                  />
                  <Route path="/printers" element={<DashboardPrinters />} />
                  <Route
                    path="/printers/departments/:departmentId"
                    element={<SingleDepartment socket={socket} />}
                  >
                    {/* <Route
                  
                    path="/:deviceId/departments/:departmentId/one-printer"
                    element={<OnePrinter />}
                  /> */}
                  </Route>
                  <Route
                    path="/admin/add-printer"
                    element={<AddPrinter socket={socket} />}
                  />
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
}

export default App;
