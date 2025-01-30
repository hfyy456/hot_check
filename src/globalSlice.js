import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        globalVariable: '初始值'
    },
    reducers: {
        updateGlobalVariable: (state, action) => {
            state.globalVariable = action.payload;
        }
    }
});

export const { updateGlobalVariable } = globalSlice.actions;
export default globalSlice.reducer;