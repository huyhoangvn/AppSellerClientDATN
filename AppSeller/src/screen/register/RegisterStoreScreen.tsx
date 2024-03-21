import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import NavProps from '../../models/props/NavProps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditTextComponent from '../../component/EditTextComponent';
import {faShop,faPhone,faLocationDot,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import TextComponent from '../../component/TextComponent';
import ButtonComponent from '../../component/ButtonComponent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { appColors } from '../../constants/appColors';
import { saveData } from '../../utils/storageUtils';
import AlertComponent from '../../component/AlertComponent';
import { useDispatch } from 'react-redux';
import { dataStore } from '../../redux/reducers/authReducers';

const RegisterStoreScreen: React.FC<NavProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [mail, setMail] = useState('');
  const [isChecked, setChecked] = useState<boolean>();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const validateInputs = () => {
    if (!name.trim()) {
      return 'Vui lòng nhập tên cửa hàng';
    }
  
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) {
      return 'Vui lòng nhập số điện thoại hợp lệ';
    }
  
    if (!address.trim()) {
      return 'Vui lòng nhập địa chỉ';
    }
  
    if (!mail.trim() || !/^\S+@\S+\.\S+$/.test(mail.trim())) {
      return 'Vui lòng nhập địa chỉ email hợp lệ';
    }

    return null;
  };
  
  const handeleContinue = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setMsg(errorMessage);
      handleShowAlert();
      return;
    }
    await dispatch(dataStore({tenCH: name, sdt: phone, diaChi: address, email: mail}));
    // await saveData({ nameStore: name, phoneStore: phone, addressStore: address, mailStore: mail });
    navigation.navigate('RegisterUserScreen');
  };
  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Đảm bảo bàn phím không che phủ các EditText
  >
    <ScrollView style={styles.container} >
      <View style={styles.header}>
        <TextComponent text='Đăng Ký' size={20} styles = {{fontWeight: 'bold',textAlign: 'center'}}/>
        <TextComponent text='Nhập thông tin cửa hàng' size={14} styles = {{fontWeight: 'bold',textAlign: 'center'}}/>
      </View>
      <View style={styles.main}>
        <EditTextComponent
          label="text"
          placeholder="Tên cửa hàng"
          value={name}
          iconColor="gray"
          onChangeText={setName}
          icon={faShop}
        />

        <EditTextComponent
          label="number"
          placeholder="Số điện thoại"
          value={phone}
          iconColor="gray"
          onChangeText={setPhone}
          icon={faPhone}
        />

        <EditTextComponent
          label="text"
          placeholder="Địa chỉ"
          value={address}
          iconColor="gray"
          onChangeText={setAddress}
          icon={faLocationDot}
        />

        <EditTextComponent
          label="text"
          placeholder="email"
          value={mail}
          iconColor="gray"
          onChangeText={setMail}
          icon={faEnvelope}
        />
            <ButtonComponent
              type="primary"
              text="Bước tiếp theo"
              textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
              onPress={handeleContinue}
            />
        </View>
      <View style={styles.footer}>
        <View style={styles.signOut}>
          <TextComponent
            text="Đã có tài khoản "
            styles={{color: 'black', fontSize: 18}}
          />
          <ButtonComponent
            type="link"
            text="Đăng nhập"
            textStyles={{
              fontSize: 18,
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}
            onPress={() =>{navigation.navigate('LoginScreen')}}
          />
        </View>
        <AlertComponent
          visible={showAlert}
          message={msg}
          onClose={handleCloseAlert}
        />
      </View>
      <AlertComponent
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
      />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: 'white',
    
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    height: hp(70),
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  },

  footer: {
    height: hp(15),
  },
  signOut: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default RegisterStoreScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

