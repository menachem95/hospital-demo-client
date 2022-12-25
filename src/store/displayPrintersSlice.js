import { createSlice } from '@reduxjs/toolkit';

const displayPrintersSlice = createSlice({
    name: 'display',
    initialState: {
        printers: [],
        computers: [],
        time: '',
       
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
    },
});

export const {
    updateTime,
    updatePrinters,
    updateComputers
} = displayPrintersSlice.actions;

export default displayPrintersSlice.reducer;
