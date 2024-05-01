import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavigationContainer, NavigationProp, DefaultTheme} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import SplashScreen from './src/screen/SplashScreen';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterUserScreen from './src/screen/register/RegisteUserScreen';
import RegisterStoreScreen from './src/screen/register/RegisterStoreScreen';
import DetailCuaHangScreen from './src/screen/cuahang/DetailCuaHangScreen';
import EditCuaHangScreen from './src/screen/cuahang/EditCuaHangScreen';
import AddNhanVienBanScreen from './src/screen/nhanvien/AddNhanVienBanScreen';
import DetailNhanVienScreen from './src/screen/nhanvien/DetailNhanVienScreen';
import EditNhanVienBanScreen from './src/screen/nhanvien/EditNhanVienBanScreen';
import DetailMonScreen from './src/screen/mon/DetailMonScreen';
import AddMonScreen from './src/screen/mon/AddMonScreen';
import DetailHoaDonScreen from './src/screen/hoadon/DetailHoaDonScreen';
import HeaderRightComponent from './src/component/options-menu/HeaderRightComponent';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import EditMonScreen from './src/screen/mon/EditMonScreen';
import ListNhanVienScreen from './src/screen/nhanvien/ListNhanVienScreen';
import UpdatePasswordScreen from './src/screen/nhanvien/UpdatePasswordScreen';
import EvaluateScreen from './src/screen/danhGia/EvaluateScreen';
import EditHoaDonScreen from './src/screen/hoadon/EditHoaDonScreen';
import DetailDatMonScreen from './src/screen/hoadon/DetailDatMonScreen';
import { appColors } from './src/constants/appColors';
import TermsServiceScreen from './src/screen/TermsServiceScreen';

const Stack = createStackNavigator();

interface AppProps {}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff', // Set your desired background color here
  },
};

const App: React.FC<AppProps> = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <MenuProvider>
          <NavigationContainer
            theme={navTheme}
          >
            <Stack.Navigator

              initialRouteName="SplashScreen"

              screenOptions={{headerTitleAlign: 'left'}}>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              {/* Đăng nhập và đăng ký */}
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RegisterUserScreen"
                component={RegisterUserScreen}
                options={{headerShown: true, headerTitle: ""}}
              />
              <Stack.Screen
                name="RegisterStoreScreen"
                component={RegisterStoreScreen}
                options={{headerShown: true, headerTitle: ""}}
              />
               <Stack.Screen
                name="TermsServiceScreen"
                component={TermsServiceScreen}
                options={{headerShown: true, title: ''}}
                // options={{title: 'Đăng ký'}}
              />
              {/* Trang chủ với nav bar */}
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({navigation}) => ({
                  title: 'Food Center',
                  headerRight: () => (
                    <HeaderRightComponent navigation={navigation} />
                  ),
                })}
              />
              {/* Trang cửa hàng */}
              <Stack.Screen
                name="DetailCuaHangScreen"
                component={DetailCuaHangScreen}
                options={{title: 'Chi tiết cửa hàng'}}
              />
              <Stack.Screen
                name="EditCuaHangScreen"
                component={EditCuaHangScreen}
                options={{title: 'Sửa thông tin cửa hàng'}}
              />

              {/* Trang quản lý nhân viên */}
              <Stack.Screen
                name="AddNhanVienBanScreen"
                component={AddNhanVienBanScreen}
                options={{title: 'Thêm nhân viên'}}
              />
              <Stack.Screen
                name="ListNhanVienScreen"
                component={ListNhanVienScreen}
                options={{title: 'Danh sách nhân viên'}}
              />
              <Stack.Screen
                name="DetailNhanVienScreen"
                component={DetailNhanVienScreen}
                options={{title: 'Thông tin nhân viên'}}
              />
              <Stack.Screen
                name="EditNhanVienBanScreen"
                component={EditNhanVienBanScreen}
                options={{title: 'Sửa nhân viên'}}
              />
              <Stack.Screen
                name="UpdatePasswordScreen"
                component={UpdatePasswordScreen}
                options={{title: 'Đổi mật khẩu'}}
              />
              {/* Trang quản lý món */}
              <Stack.Screen
                name="DetailMonScreen"
                component={DetailMonScreen}
                options={{title: 'Chi tiết món'}}
              />
              <Stack.Screen
                name="AddMonScreen"
                component={AddMonScreen}
                options={{title: 'Thêm món'}}
              />
              <Stack.Screen name="EditMonScreen" component={EditMonScreen}  options={{ title: 'Sửa thông tin món'}}/>

              {/* Trang quản lý hóa đơn */}
              <Stack.Screen
                name="DetailHoaDonScreen"
                component={DetailHoaDonScreen}
                options={{title: 'Chi tiết hóa đơn'}}
              />
              <Stack.Screen
                name="DetailDatMonScreen"
                component={DetailDatMonScreen}
                options={{title: 'Chi tiết đặt món'}}
              />
              <Stack.Screen
                name="EditHoaDonScreen"
                component={EditHoaDonScreen}
                options={{title: 'Sửa hóa đơn'}}
              />

                {/* Trang quản lý đánh giá */}
                <Stack.Screen
                name="EvaluateScreen"
                component={EvaluateScreen}
                options={{title: 'Đánh giá '}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff"
  },
  touchableOpacity: {
    marginLeft: 15,
    marginRight: 15,
  },
});

export default App;
