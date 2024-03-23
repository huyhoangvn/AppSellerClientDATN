import { configureStore } from "@reduxjs/toolkit";
import { authReducers, storeReducers } from "./reducers/authReducers";
import { createLogger } from 'redux-logger';
const logger = createLogger();

const store = configureStore({
    reducer: {
        authReducers,
        storeReducers
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;



// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { authReducers } from "./reducers/authReducers";
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     // whitelist: ['auth']
// };

// const rootReducer = combineReducers( {
//     auth: authReducers
// },)

// const persistedReducer = persistReducer (persistConfig, rootReducer)

// export const store = configureStore({
//     reducer: persistedReducer
// })

// export const persistor = persistStore(store)