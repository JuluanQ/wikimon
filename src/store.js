import { Iterable } from 'immutable'

import { configureStore } from '@reduxjs/toolkit'
import dataPkmnSliceReducer from './dataPkmnSlice.js'

import {
    createSerializableStateInvariantMiddleware,
    isPlain,
} from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        dataPkmn: dataPkmnSliceReducer,
    },
})