import { createSlice } from "@reduxjs/toolkit";

export const dataPkmnSlice = createSlice({
  name: 'dataPkmn',
  initialState: {
    pkmn: [],
    species: [],
    links: [],
  },
  reducers: {
    setDataPkmn: (state, data) => {
      state.pkmn = data;
    },

    setDataSpecies: (state, data) => {
      state.species = data;
    },

    setLinksPkmn: (state, data) => {
      state.links = data;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDataPkmn, setDataSpecies, setLinksPkmn } = dataPkmnSlice.actions

export default dataPkmnSlice.reducer