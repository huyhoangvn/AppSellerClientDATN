import { createSlice } from "@reduxjs/toolkit";
import { NhanVien } from "../../models/NhanVien";
import { CuaHang } from "../../models/CuaHang";

const initialState: NhanVien = {
    _id: '',
    idCH: '',
    tenNV: '',
    gioiTinh: 0,
    hinhAnh: '',
    diaChi: '',
    sdt: '',
    phanQuyen: 0,
    trangThai: false,
};

const initialStateStore: CuaHang = {
    _id:'',
    tenCH:'',
    email:'',
    sdt: '',
    diaChi: '',
    thoiGianMo: '',
    thoiGianDong: '',
    hinhAnh: '',
    trangThai:true, 
};

const authSlide = createSlice({
    name: "auth",
    initialState: {
        authData:initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload; // Update authData field in state
        },
        setToken: (state, action) => {
            state.authData.token = action.payload; // Update token field in authData
        },
        deleteToken: (state) => {
            state.authData.token = ''; // Reset token field in authData
        }
    },
});

const storeSlide = createSlice({
    name: "store",
    initialState: initialStateStore,
    reducers: {
        dataStore: (state, action) => {
            return { ...state, ...action.payload }; // Merge the payload into the state
        },
        deleteData: (state) => {
            return initialStateStore; // Reset the entire state to initial state
        }
    },
});




export const authReducers = authSlide.reducer;
export const storeReducers = storeSlide.reducer;

export const { addAuth, setToken, deleteToken } = authSlide.actions;
export const getAuth = (state: any) => state.authReducers; // Access entire auth state
export const getToken = (state: any) => state.authReducers.authData.token; // Access token field in authData

export const { dataStore, deleteData } = storeSlide.actions;
export const getDataStore = (state: any) => state.storeReducers; // Access entire store state


