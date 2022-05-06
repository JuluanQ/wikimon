import { createSlice } from "@reduxjs/toolkit";

export const dataPkmnSlice = createSlice({
  name: 'dataPkmn',
  initialState: {
    pkmn: [],
    species: [],
  },
  reducers: {
    setDataPkmn: (state, data) => {
      state.pkmn = data;
    },

    setDataSpecies: (state, data) => {
      state.species = data;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDataPkmn, setDataSpecies } = dataPkmnSlice.actions

export default dataPkmnSlice.reducer