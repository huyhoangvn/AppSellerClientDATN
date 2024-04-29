import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import NavProps from '../../models/props/NavProps';
import {
  faShop,
  faPhone,
  faLocationDot,
  faEnvelope,
  faLock,
  faUser,
  faU,
} from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { appColors } from '../../constants/appColors';
import EditTextComponent from '../../component/EditTextComponent';
import ButtonComponent from '../../component/ButtonComponent';
import authenticationAPI from '../../apis/authApi';
import { getData } from '../../utils/storageUtils';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';


const AddNhanVienBanScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
   const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRepass] = useState('');

  //ImagePath
  const [imgPathGallery, setImagePathGallery] = useState('data:image/png;base64,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');

  //Lấy ảnh từ Gallery
  const getImageFromGallery = ()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if(image){
        setImagePathGallery(image.path)
      }else{
        setImagePathGallery('data:image/png;base64,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')
      }
    });
  }

  const validateInputs = () => {
    if (!name.trim()) {
      return 'Vui lòng nhập họ tên';
    }

    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) {
      return 'Vui lòng nhập số điện thoại hợp lệ (10 số)';
    }
    if (!address.trim()) {
      return 'Vui lòng nhập địa chỉ';
    }
    if (!userName.trim() || !/^\S+@\S+\.\S+$/.test(userName.trim())) {
      return 'Vui lòng nhập địa chỉ email hợp lệ';
    }
    if (!pass.trim()) {
      return 'Vui lòng nhập mật khẩu';
    }
    if (pass.trim() !== rePass.trim()) {
      return 'Mật khẩu nhập lại không khớp với mật khẩu ban đầu';
    }
    return null;
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };



  const handelSave = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setMsg(errorMessage);
      handleShowAlert();
      return;
    }
    const data = await getData();
    const id = data?.idUser;
    const idStore = data?.idStore;
    try {
      setLoading(true);
      const res:any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/nhanvienquanly/them-nhanvien-ban/${id}`,
        {
          idCH: idStore,
          taiKhoan: userName,
          matKhau: pass,
          tenNV: name,
          diaChi: address,
          sdt: phone,
          trangThai: 1
        },
        'post',
      );
      console.log(name);
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
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Đảm bảo bàn phím không che phủ các EditText
  >
    <ScrollView style={styles.container} >
    <View style={styles.main}>
      <TouchableOpacity onPress={getImageFromGallery}>
        <Image style={{width: wp(40),height: hp(20),borderRadius:5}} source={{uri: imgPathGallery,}} />
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>

    <EditTextComponent
            label="text"
            placeholder="Họ và tên"
            value={name}
            iconColor="gray"
            onChangeText={setName}
            icon={faUser}
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

          <EditTextComponent
            label="text"
            placeholder="Email"
            value={userName}
            iconColor="gray"
            onChangeText={setUserName}
            icon={  faEnvelope }
          />

          <EditTextComponent
            label="pass"
            placeholder="Nhập mật khẩu"
            value={pass}
            iconColor="gray"
            onChangeText={setPass}
            icon={faLock}
          />

          <EditTextComponent
            label="pass"
            placeholder="Nhập lại mật khẩu"
            value={rePass}
            iconColor="gray"
            onChangeText={setRepass}
            icon={faLock}
          />
          <ButtonComponent
          type="primary"
          text="Lưu"
          textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          onPress={handelSave}
        />
    </View>
    <AlertComponent
          visible={showAlert}
          message={msg}
          onClose={handleCloseAlert}
        />
     <LoadingComponent visible={loading}/>   
     </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: appColors.white
  },
 
  main: {
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: hp(65),
    justifyContent: 'space-between',
  }
});

export default AddNhanVienBanScreen;

function setData(index: any) {
  throw new Error('Function not implemented.');
}
