import { createSlice } from "@reduxjs/toolkit";

export const linksPkmnSlice = createSlice({
    name: 'links',
    initialState: {
        value: [],
    },
    reducers: {
        setLinksPkmn: (state, data) => {
            state.value = data;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLinksPkmn } = linksPkmnSlice.actions

export default linksPkmnSlice.reducer