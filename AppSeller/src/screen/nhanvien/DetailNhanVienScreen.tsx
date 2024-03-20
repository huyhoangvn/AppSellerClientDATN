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
import ButtonComponent from '../../component/ButtonComponent';
import EditTextComponent from '../../component/EditTextComponent';
const DetailNhanVienScreen: React.FC<NavProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const hahandelUpdate = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{width: wp(40), height: hp(20), borderRadius: 5}}
          source={{
            uri: 'data:image/png;base64,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',
          }}
        />
      </View>
      <View style={styles.main}>
        <View style = {styles.viewText}>
          <Text>Tên</Text>
          <Text style = {styles.textPrimary}>Nguyễn huy hoàng</Text>
        </View>

        <View style = {styles.viewText}>
          <Text>Giới tính</Text>
          <Text style = {styles.textPrimary}>Nam</Text>

        </View>

        <View style = {styles.viewText}>
          <Text>Email</Text>
          <Text style = {styles.textPrimary}>abc@gmail.com</Text>

        </View>

        <View style = {styles.viewText}>
          <Text>Số điện thoại</Text>
          <Text style = {styles.textPrimary}>1234567890</Text>

        </View>
        
        <View style = {styles.viewText}>
          <Text>Địa chỉ</Text>
          <Text style={[styles.textPrimary, styles.wrapText, styles.addressText]}>
    Nội dung của địa chỉ dài, nếu quá dài sẽ tự động xuống dòng
  </Text>
        </View>

        <View style = {styles.viewText}>
          <Text>Vai trò</Text>
          <Text style = {styles.textPrimary}>Quản lý</Text>

        </View>

        <View style = {styles.viewText}>
          <Text>Trạng thái</Text>
          <Text style = {styles.textPrimary}>Hoạt động</Text>

        </View>
      
        
      </View>
      <View style = {styles.footer}>
      <ButtonComponent
          type="primary"
          text="Sửa nhân viên"
          textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          onPress={hahandelUpdate}
        />
        <ButtonComponent
          type="primary"
          text="Đổi mật khẩu"
          textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          onPress={hahandelUpdate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(84),
    backgroundColor: appColors.white,
    justifyContent: 'space-between',

  },
  header: {
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  main:{
    paddingHorizontal: 10,
    height: hp(45),
    justifyContent: 'space-between',
  },
  footer: {
    height: hp(10),
    justifyContent: 'space-between',
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between'
  },
  textPrimary: {
    color: 'black',
    fontWeight:'bold'
  },
  wrapText:{
    flexWrap: 'wrap'
  },
  addressText: {
    width: '70%', // Chiếm 50% chiều rộng của View cha
    // Các style khác cho văn bản địa chỉ
  },
});

export default DetailNhanVienScreen;
