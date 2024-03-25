import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faChartLine, faUtensils, faReceipt, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { TransitionPresets, TransitionSpecs } from '@react-navigation/stack';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {appColors} from './../constants/appColors';

import MainCuaHangScreen from "./cuahang/MainCuaHangScreen"
import MainThongKeScreen from "./thongke/MainThongKeScreen"
import ListMonScreen from "./mon/ListMonScreen"
import MainHoaDonScreen from "./hoadon/MainHoaDonScreen"
import ListNhanVienScreen from "./nhanvien/ListNhanVienScreen"
import NavProps from '../models/props/NavProps';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen: React.FC<NavProps> = ({ navigation,route } : any) =>  {
  const idCH = route.params?.idCH; // Lấy idCH từ tham số định tuyến

  const renderTabScreenOptions = (label: string, icon: IconProp) : any => ({
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <FontAwesomeIcon icon={icon} size={size} color={color} />
    ),
    tabBarLabel: label,
    headerShown: false, // Hide the header title
  });

  const ScreenWrapper = (Component: React.ComponentType<any>) => {
    return ({ route }: any) => {
      const { idCH } = route.params ?? {};
      return (
        <View style={{ flex: 1, paddingBottom: 0 }}>
          <Component {...route.params} />
        </View>
      );
    };
  };

  return (
    <Tab.Navigator
      theme={{ colors: { secondaryContainer: "#E3EED8" }}}
      initialRouteName='MainCuaHangScreen'
      shifting={true}
      activeColor= {appColors.primary}
      inactiveColor="#92C165"
      barStyle={{ 
        backgroundColor: '#CFE7B9', 
        height: 72,
        elevation: 8
      }}
      >
      <Tab.Screen 
        name="MainCuaHangScreen" 
        initialParams={{ idCH }} 
        component={MainCuaHangScreen} 
        options={renderTabScreenOptions('Cửa hàng', faHome)}
      />
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
        name="MainHoaDonScreen" 
        component={MainHoaDonScreen} 
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