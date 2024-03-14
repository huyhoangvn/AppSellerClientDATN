import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./reducers/authReducers";

const store = configureStore({
    reducer: {
        authReducers
    },
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