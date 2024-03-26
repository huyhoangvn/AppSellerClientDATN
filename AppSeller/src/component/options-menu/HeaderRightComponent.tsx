import React from 'react';
import NavProps from '../../models/props/NavProps';
import { createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const HeaderRightComponent: React.FC<NavProps> = ({ navigation ,idCH}: any) =>  {
    
    const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);
    const handleGearClick = () => {
        setShowOptionsMenu(true);
    };

    const handleOptionClick = (screenName: string) => {
        setShowOptionsMenu(false); // Close the menu when an option is clicked
        navigation.navigate(screenName,{idCH});//truyền id vào màn hình định hướng
    };

    const logout = () => {
        setShowOptionsMenu(false); // Close the menu when an option is clicked
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
    };
    
    return (
    <View style={styles.container}>
        <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handleGearClick}
        >
        <FontAwesomeIcon icon={faEllipsisH} size={24} color={'gray'} />
        </TouchableOpacity>

        <Menu opened={showOptionsMenu} onBackdropPress={() => setShowOptionsMenu(false)}>
        <MenuTrigger />
        <MenuOptions>
            <MenuOption onSelect={() => handleOptionClick("DetailCuaHangScreen")}><Text>Thông tin cửa hàng</Text></MenuOption>
            <MenuOption onSelect={() => handleOptionClick("DetailNhanVienScreen")}><Text>Thông tin cá nhân</Text></MenuOption>
            <MenuOption onSelect={() => logout()}><Text>Đăng xuất</Text></MenuOption>
        </MenuOptions>
        </Menu>
    </View>
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

export default HeaderRightComponent;