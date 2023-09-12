import { createSlice } from "@reduxjs/toolkit";

const displayPrintersSlice = createSlice({
  name: "display",
  initialState: {
    printers: [],
    computers: [],
   searchKey: "",
    time: "",
    printerModelState: { isOpen: false, printer: {address: ""}, online: null },
  },
  reducers: {
    updatePrinters(state, action) {
      state.printers = action.payload;
    },
    updateComputers(state, action) {
      state.computers = action.payload;
    },
    updateTime(state) {
      state.time = new Date().toLocaleString().split(" ")[1];
    },
    updatePrinterModelState(state, action) {
      console.log(action.payload);
      state.printerModelState = action.payload;
    },
    updatePrinterModelStatePrinter(state, action) {
      state.printerModelState.printer = action.payload;
    },
    
    updatePrinterModelStateOnline(state, action) {
      state.printerModelState.printer.online = action
    },
    updateSearch(state, action) {
      
      state.searchKey = action.payload
    }
  },
});

export const {
  updateTime,
  updatePrinters,
  updateComputers,
  updatePrinterModelState,
  updatePrinterModelStatePrinter,
  updatePrinterModelStateOnline,
  updateSearch
} = displayPrintersSlice.actions;

export default displayPrintersSlice.reducer;
