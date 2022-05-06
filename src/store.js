import { Iterable } from 'immutable'

import { configureStore } from '@reduxjs/toolkit'
import dataPkmnSliceReducer from './dataPkmnSlice.js'
import linksPkmnSliceReducer from './linksPkmnSlice.js'

import {
    createSerializableStateInvariantMiddleware,
    isPlain,
} from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        dataPkmn: dataPkmnSliceReducer,
        linksPkmn: linksPkmnSliceReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})