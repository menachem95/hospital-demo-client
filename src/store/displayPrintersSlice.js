import { createSlice } from "@reduxjs/toolkit";

const displayPrintersSlice = createSlice({
  name: "display",
  initialState: {
    printers: [],
    computers: [],
    search: [ {
      "printerModel": "320",
      "type": "printer",
      "address": "1.2.3.6",
      "room": "1",
      "department": "הנהלה",
      "description": "1",
  
      "line": "123",
      "pag": "1"
    },
    {
      "printerModel": "320",
      "type": "printer",
      "address": "8.8.8.8",
      "room": "1",
      "department": "הנהלה",
      "description": "1",
  
      "line": "123",
      "pag": "1"
    }],
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
    updatePrinterModelStateOnline(state, action) {
      state.printerModelState.printer.online = action
    },
    updateSearch(state, action) {
      
      const result = state.printers.filter(p => p.department.includes(action.payload))
        console.log(result)
        state.search = result
      

    //  const resulet = state.printers.filter(p => action.payload === p.address || 
    //     action.payload === p.pag ||
    //     action.payload === p.department)
    //   state.search = resulet;
    }
  },
});

export const {
  updateTime,
  updatePrinters,
  updateComputers,
  updatePrinterModelState,
  updatePrinterModelStateOnline,
  updateSearch
} = displayPrintersSlice.actions;

export default displayPrintersSlice.reducer;
