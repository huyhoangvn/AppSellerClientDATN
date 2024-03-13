import React, {useState} from 'react';
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
// import authenticationAPI from '../apis/authApi';

const {height, width} = Dimensions.get('window');

const LoginScreen: React.FC<NavProps> = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
 
  const handleUserNameChange = (text: string) => {
      setUserName(text)
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };



  const handleLogin = async () => {
    try {
        const res = await authenticationAPI.HandleAuthentication(
          '/nhanvien/auth',
          {taiKhoan:userName, matKhau:password},
          'post'
        )
        // const token = res.headers.authorization;
        // console.log(token)
          if(res.index != null){
            navigation.navigate('HomeScreen')
          }else{
            Alert.alert('Thông báo', res.msg);

          }
    }catch(err){
      console.log(err);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     console.log('Login')
  //     const res = await authenticationAPI.HandleAuthentication(
  //       '/nhanvien/auth',
  //       { taiKhoan: userName, matKhau: password },
  //       'post'
  //     );
  //     console.log(res);
  //     if (res.index != null) {
  //       navigation.navigate('HomeScreen');
  //     }else{
  //       res.index.msg
  //     }
  //   } catch (err:any) {
  //     console.log(err);
  //     const errorObject = JSON.parse(err.message);
  //     const errorMessage = errorObject.error.msg;
  //     Alert.alert('Thông báo', errorMessage);
  //   }
  // };
  

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.header}>
            <Logo/>
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
              <BouncyCheckbox
                size={20}
                fillColor={appColors.primary}
                unfillColor="#FFFFFF"
                text="Nhớ mật khẩu"
                // iconStyle={{ borderColor: "red" }}
                innerIconStyle={{borderWidth: 1.5}}
                textStyle={{
                  textDecorationLine: 'none',
                  color: appColors.primary,
                  fontSize: 14,
                  marginLeft: -10,
                  fontWeight: 'bold',
                }}
                // isChecked={true}
                onPress={(isChecked: boolean) => {
                  setChecked(isChecked);
                }}
                style={{paddingLeft: 15}}
              />
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
                textStyles = {{color: 'black', fontWeight: 'bold'}}
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
                textStyles = {{color: appColors.white, fontWeight: 'bold'}}
              />
            </View>
            
            <View style = {styles.signOut}>
              <TextComponent text='Bạn chưa có tài khoản?  ' styles = {{color: '#C2BEBE', fontSize: 18}}/>
              <ButtonComponent
               type='link' text='Đăng ký'
               textStyles = {{ fontSize: 18, textDecorationLine: 'underline', fontWeight: 'bold'}}
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
  },

  footer: {
    height: hp(30),
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  signOut: {
    flexDirection: 'row',
    justifyContent: 'center'

  }
});

export default LoginScreen;
