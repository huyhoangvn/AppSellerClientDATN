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
const DetailNhanVienScreen: React.FC<NavProps> = ({navigation,route} : any) => {
  const {item , position} = route.params;

  const hahandelUpdate = () => {
    navigation.navigate('EditNhanVienBanScreen', {item});
  };
  const hahandelUpdatePass = () => {
    navigation.navigate('UpdatePasswordScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{width: wp(40), height: hp(20), borderRadius: 5}}
          source={{
            uri: item.hinhAnh,
          }}
        />
      </View>
      <View style={styles.main}>
        <View style = {styles.viewText}>
          <Text>Tên</Text>
          <Text style = {styles.textPrimary}>{item.tenNV}</Text>
        </View>

        <View style = {styles.viewText}>
          <Text>Giới tính</Text>
          <Text style = {styles.textPrimary}>{item.gioiTinh == 2 ? 'nam' : 'nữ'}</Text>

        </View>

        <View style = {styles.viewText}>
          <Text>Email</Text>
          <Text style = {styles.textPrimary}>{item.taiKhoan}</Text>

        </View>

        <View style = {styles.viewText}>
          <Text>Số điện thoại</Text>
          <Text style = {styles.textPrimary}>{item.sdt}</Text>

        </View>
        
        <View style = {styles.viewText}>
          <Text>Địa chỉ</Text>
          <Text style={[styles.textPrimary, styles.wrapText, styles.addressText]}>
          {item.diaChi}
  </Text>
        </View>

        <View style = {styles.viewText}>
          <Text>Vai trò</Text>
          <Text style = {styles.textPrimary}>{item.phanQuyen === 0 ? 'Quản lý' : 'Nhân viên'}</Text>

        </View>

        <View style = {styles.viewText}>
          <Text>Trạng thái</Text>
          <Text style = {styles.textPrimary}>{item.trangThai === true ? 'Hoạt động' : 'Không hoạt động'}</Text>

        </View>
      
        
      </View>
      <View style = {styles.footer}>
        {position === 0 ? (  <ButtonComponent
          type="primary"
          text="Sửa nhân viên"
          textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          onPress={hahandelUpdate}
        />) : null}
    
        <ButtonComponent
          type="primary"
          text="Đổi mật khẩu"
          textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          onPress={hahandelUpdatePass}
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
    flexWrap: 'wrap',
    textAlign: 'right'
  },
  addressText: {
    width: '70%', // Chiếm 50% chiều rộng của View cha
    // Các style khác cho văn bản địa chỉ
  },
});

export default DetailNhanVienScreen;
