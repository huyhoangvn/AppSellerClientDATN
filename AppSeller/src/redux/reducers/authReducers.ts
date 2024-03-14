import { createSlice } from "@reduxjs/toolkit";
import { NhanVien } from "../../models/NhanVien";


const initialState: NhanVien = {
    id: '',
    idCH: '',
    tenNV: '',
    gioiTinh: 0,
    hinhAnh: '',
    diaChi: '',
    sdt: '',
    phanQuyen: 0,
    trangThai: false,
  };




  


const authSlide = createSlice({
    name: "auth",
    initialState:{
        authData: initialState
    },
    reducers:{
        addAuth: (state,action) => {
            state.authData = action.payload;
        },

        setToken: (state,action) => {
            state.authData.token = action.payload;
        },

        deleteToken: (state,action) => {
            state.authData.token = ''

        }
    }
})


export const authReducers = authSlide.reducer

export const {addAuth,setToken,deleteToken} = authSlide.actions;

export const getAuth = (state:any) => state.authReducers.authData

export const getToken = (state: any) => state.authReducers.authData.token;
