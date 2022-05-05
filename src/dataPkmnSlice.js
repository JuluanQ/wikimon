import { createSlice } from "@reduxjs/toolkit";

export const dataPkmnSlice = createSlice({
  name: 'dataPkmn',
  initialState: {
    value: [],
  },
  reducers: {
    setDataPkmn: (state, data) => {
      state.value = data;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDataPkmn } = dataPkmnSlice.actions

export default dataPkmnSlice.reducer