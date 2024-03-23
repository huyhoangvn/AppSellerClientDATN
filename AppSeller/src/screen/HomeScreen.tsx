import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faChartLine, faUtensils, faReceipt, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import MainCuaHangScreen from "./cuahang/MainCuaHangScreen"
import MainThongKeScreen from "./thongke/MainThongKeScreen"
import ListMonScreen from "./mon/ListMonScreen"
import ListHoaDonScreen from "./hoadon/ListHoaDonScreen"
import ListNhanVienScreen from "./nhanvien/ListNhanVienScreen"
import NavProps from '../models/props/NavProps';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC<NavProps> = ({ navigation,route }:any) =>  {
  const idCH = route.params?.idCH; // Lấy idCH từ tham số định tuyến

  const renderTabScreenOptions = (label: string, icon: IconProp) => ({
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <FontAwesomeIcon icon={icon} size={size} color={color} />
    ),
    tabBarLabel: label,
    tabBarActiveTintColor: '#39230F',
    tabBarInactiveTintColor: '#644932',
    headerShown: false // Hide the header title
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFECBC',
          paddingTop: 3,
          paddingBottom: 3,
          elevation: 8
        },}} initialRouteName='MainCuaHangScreen'>
      <Tab.Screen 
        name="MainThongKeScreen" 
        initialParams={{ idCH }} 
        component={MainThongKeScreen} 
        options={renderTabScreenOptions('Thống kê', faChartLine)}
      />
      <Tab.Screen 
        name="ListMonScreen" 
        component={ListMonScreen} 
        options={renderTabScreenOptions('Món ăn', faUtensils)}
      />
      <Tab.Screen 
        name="MainCuaHangScreen" 
        initialParams={{ idCH }} 
        component={MainCuaHangScreen} 
        options={renderTabScreenOptions('Cửa hàng', faHome)}
      />
      <Tab.Screen 
        name="ListHoaDonScreen" 
        component={ListHoaDonScreen} 
        options={renderTabScreenOptions('Hóa đơn', faReceipt)}
      />
      <Tab.Screen 
        name="ListNhanVienScreen" 
        component={ListNhanVienScreen} 
        options={renderTabScreenOptions('Nhân viên', faUsers)}
      />
    </Tab.Navigator>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    marginLeft: 15,
    marginRight: 15,
  }
});

export default HomeScreen;