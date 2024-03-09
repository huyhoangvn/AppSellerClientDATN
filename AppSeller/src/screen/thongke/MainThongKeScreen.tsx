
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyBillAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ThongKeMonScreen from './ThongKeMonScreen';
import ThongKeDoanhThuScreen from './ThongKeDoanhThuScreen';

const Tab = createMaterialTopTabNavigator();

const MainThongKeScreen = () => {

  const renderTabScreenOptions = (label: string, icon?: IconProp) => ({
    tabBarIcon: icon ? ({ focused, color }: { focused: boolean; color: string }) => (
       <FontAwesomeIcon icon={icon} size={focused ? 24 : 20} color={color} />
    ) : undefined,
    tabBarLabel: label,
  });

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="ThongKeDoanhThuScreen" 
        component={ThongKeDoanhThuScreen} 
        options={renderTabScreenOptions('Doanh thu', faMoneyBillAlt)}
      />
      <Tab.Screen 
        name="ThongKeMonScreen" 
        component={ThongKeMonScreen} 
        options={renderTabScreenOptions('Món Ăn', faUtensils)}
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MainThongKeScreen;