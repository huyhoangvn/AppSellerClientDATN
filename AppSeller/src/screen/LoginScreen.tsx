import React, {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Image,
  Pressable,
  Switch,
} from 'react-native';
import NavProps from '../models/props/NavProps';

import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditTextComponent from '../component/EditTextComponent';
import ButtonComponent from '../component/ButtonComponent';
import {appColors} from '../constants/appColors';
import {Text} from 'react-native-svg';
import {text} from '@fortawesome/fontawesome-svg-core';
import TextComponent from '../component/TextComponent';
import AppPath from '../component/appPath';
import {Facebook, Google, Logo} from '../assest/svgs';
import authenticationAPI from '../apis/authApi';
import NhanVienApi from '../api/NhanVienApi';
import {useDispatch} from 'react-redux';
// import { addAuth, addToken } from '../redux/reducers/authReducers';
import {deleteData, getData, saveData} from '../utils/storageUtils';
import {deleteToken, setToken} from '../redux/reducers/authReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import authenticationAPI from '../apis/authApi';

const {height, width} = Dimensions.get('window');

const LoginScreen: React.FC<NavProps> = ({navigation}) => {
var status: boolean | null | undefined;
const dispatch = useDispatch();
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [isRemember, setIsRemember] = useState<boolean>();
const [rememberedChecked, setRememberedChecked] = useState<boolean>(true);

// console.log()
console.log("aaaa", isRemember);



  const handleUserNameChange = (text: string) => {
    setUserName(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };



  const rememBer = async () => {

    if (isRemember == true) {
      await saveData({ taiKhoan: userName, matKhau: password, isChecked: true});
    } else{
      await deleteData('taiKhoan');
      await deleteData('matKhau');
      await saveData({isChecked: false})
    }
  };

  const getRemembered = async () => {
  try {
    const storedData = await getData();
    console.log(storedData);
    const storedUserName = storedData?.taiKhoan || '';
    const storedPassword = storedData?.matKhau || ''; 
    const storedChecked = storedData?.isChecked || false; // Sử dụng false nếu giá trị storedData?.isChecked là null hoặc undefined

    setUserName(storedUserName);
    setPassword(storedPassword);
  
    // Cập nhật trạng thái của checkbox
    if (storedChecked === true) {
      setUserName(storedUserName);
      setPassword(storedPassword);
      setIsRemember(storedChecked)
    } else {
      setUserName('');
      setPassword('');
    }
  } catch (error) {
    console.error('Error retrieving remember me state:', error);
  }
};
 
  const handleLogin = async () => {
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/nhanvien/auth',
        {taiKhoan: userName, matKhau: password},
        'post',
      );
      console.log(res);
      if (res.success === true) {
        console.log(res.index)
        navigation.navigate('HomeScreen');
        const storedData = await getData();
        const token = storedData?.token;
        dispatch(setToken(token));
        rememBer()
      } else {
        Alert.alert('Thông báo', res.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRemembered();
    // setRememberedChecked(true);
  },[]);


  // const handelCheked = async (status:boolean) =>{
  //   rememBer()
  // }
  
  

  // const handleGet = async () => {
  //   try {
  //     const res = await authenticationAPI.HandleAuthentication(
  //       '/nhanvien/nhanvienquanly',
  //       'get',
  //     );

  //     console.log(res.data);
  //     // dispatch(addAuth(res.index));
  //     // navigation.navigate('HomeScreen')
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const rmToken = () => {
  //   dispatch(deleteToken(undefined));
  // };

  
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.header}>
            <Logo />
          </View>
          <View style={styles.main}>
            <EditTextComponent
              label="userName"
              placeholder="Nhập tài khoản"
              value={userName}
              iconColor="gray"
              onChangeText={handleUserNameChange}
              icon={faUser}
            />

            <EditTextComponent
              label="pass"
              placeholder="Nhập mật khẩu"
              value={password}
              iconColor="gray"
              onChangeText={handlePasswordChange}
              icon={faLock}
            />
            <View style={styles.viewButton}>
              <View style = {{flexDirection: 'row'}}>
              <Switch
              style = {{paddingLeft:10}}
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => {setIsRemember(!isRemember)}}
            />
            <TextComponent
                styles = {{alignSelf: 'center', paddingLeft: 10, color: appColors.primary,fontSize: 14, fontWeight:'bold' }}
                text="Nhớ mật khẩu"
              />
              </View>
          
            {/* <BouncyCheckbox
                size={20}
                fillColor={appColors.primary}
                unfillColor="#FFFFFF"
                text="Nhớ mật khẩu"
                innerIconStyle={{ borderWidth: 1.5 }}
                textStyle={{
                  textDecorationLine: 'none',
                  color: appColors.primary,
                  fontSize: 14,
                  marginLeft: -10,
                  fontWeight: 'bold',
                }}
                isChecked={isChecked}
                onPress={(isChecked: boolean) => {
                  setChecked(isChecked);
                 
                         rememBer();
                    // rememBer();
                }}
                // onPress={handelCheked}
                style={{ paddingLeft: 15 }}
              /> */}
              <ButtonComponent
                type="link"
                text="Quên mật khẩu ?"
                onPress={() => navigation.navigate('SignUpScreen')}
                textStyles={{fontWeight: 'bold'}} // Cập nhật style ở đây
              />
            </View>
            <ButtonComponent
              type="primary"
              text="Đăng nhập"
              textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
              onPress={handleLogin}
            />
          </View>
          <View style={styles.footer}>
            <AppPath />
            <View>
              <ButtonComponent
                type="primary"
                // onPress={handleLoginWithGoogle}
                color={appColors.white}
                textColor={appColors.text}
                text="Login with Google"
                iconFlex="left"
                icon={<Google />}
                styles={{borderWidth: 1}}
                textStyles={{color: 'black', fontWeight: 'bold'}}
                // onPress={}
              />

              <ButtonComponent
                type="primary"
                color={appColors.white}
                textColor={appColors.text}
                text="Login with Facebook"
                // textFont={fontFamilies.regular}
                iconFlex="left"
                icon={<Facebook />}
                styles={{backgroundColor: '#4285F4'}}
                textStyles={{color: appColors.white, fontWeight: 'bold'}}
              />
            </View>

            <View style={styles.signOut}>
              <TextComponent
                text="Bạn chưa có tài khoản?  "
                styles={{color: '#C2BEBE', fontSize: 18}}
              />
              <ButtonComponent
                type="link"
                text="Đăng ký"
                textStyles={{
                  fontSize: 18,
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    height: hp(100),
  },
  header: {
    height: hp(25),
    padding: 20,
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  main: {
    height: hp(30),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  viewButton: {
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 5,
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footer: {
    height: hp(30),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  signOut: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
