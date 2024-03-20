import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import NavProps from '../../models/props/NavProps';
import {
  faShop,
  faPhone,
  faLocationDot,
  faEnvelope,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColors} from '../../constants/appColors';
import EditTextComponent from '../../component/EditTextComponent';
import ButtonComponent from '../../component/ButtonComponent';
const UpdatePasswordScreen: React.FC<NavProps> = ({navigation}) => {
  const [oldPass, setOldPass] = useState('');
  const [userName, setUserName] = useState('');
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');

  const handelSave = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <EditTextComponent
          label="text"
          placeholder="Email"
          value={userName}
          iconColor="gray"
          onChangeText={setUserName}
          icon={faUser}
        />

        <EditTextComponent
          label="text"
          placeholder="Mật khẩu cũ"
          value={oldPass}
          iconColor="gray"
          onChangeText={setOldPass}
          icon={faLock}
        />

        <EditTextComponent
          label="pass"
          placeholder="Nhập mật khẩu mới"
          value={newPass}
          iconColor="gray"
          onChangeText={setNewPass}
          icon={faLock}
        />

        <EditTextComponent
          label="pass"
          placeholder="Nhập lại mật khẩu mới"
          value={reNewPass}
          iconColor="gray"
          onChangeText={setReNewPass}
          icon={faLock}
        />
        <ButtonComponent
          type="primary"
          text="Lưu"
          textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          onPress={handelSave}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: appColors.white,
  },

  main: {
    height: hp(50),
    justifyContent: 'space-between',
  },
});

export default UpdatePasswordScreen;
