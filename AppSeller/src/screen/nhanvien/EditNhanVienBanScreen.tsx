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
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import {getData} from '../../utils/storageUtils';

const EditNhanVienScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  const {item} = route.params;
  const [name, setName] = useState(item.tenNV);
  const [phone, setPhone] = useState(item.sdt);
  const [address, setAddress] = useState(item.diaChi);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  // Declare the setLoading function using the useState hook
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const hahandelUpdate = async () => {
    setLoading(true);
    try {
      const user = await getData();
      const id = user?.idUser;

      const res = await authenticationAPI.HandleAuthentication(
        `/nhanvien/nhanvienquanly/sua-nhanvien-ban/${id}/${item._id}`,
        {tenNV: name, diaChi: address, sdt: phone},
        'put',
      );

      if (res.success === true) {
        setMsg(res.msg);
        handleShowAlert();
      } else {
        setMsg(res.msg);
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.'); // Set error message
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image
          style={{width: wp(40), height: hp(20), borderRadius: 5}}
          source={{
            uri: item.hinhAnh,
          }}
        />
      </View>
      <View style={styles.footer}>
        <EditTextComponent
          label="text"
          placeholder="Họ và tên"
          value={name}
          iconColor="gray"
          onChangeText={setName}
          icon={faShop}
        />

        <EditTextComponent
          label="text"
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
        <ButtonComponent
          type="primary"
          text="Lưu"
          textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          onPress={hahandelUpdate}
        />
      </View>
      <AlertComponent
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
      />
      <LoadingComponent visible={loading ?? false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: appColors.white,
  },
  main: {
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: hp(40),
    justifyContent: 'space-between',
  },
});

export default EditNhanVienScreen;
