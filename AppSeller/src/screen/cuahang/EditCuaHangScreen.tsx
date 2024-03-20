import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform,Image,TouchableOpacity} from 'react-native';
import NavProps from '../../models/props/NavProps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditTextComponent from '../../component/EditTextComponent';
import {faShop,faPhone,faLocationDot,faEnvelope, faLock, faLockOpen, faNoteSticky, faNotesMedical} from '@fortawesome/free-solid-svg-icons';
import TextComponent from '../../component/TextComponent';
import ButtonComponent from '../../component/ButtonComponent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { appColors } from '../../constants/appColors';
import { saveData } from '../../utils/storageUtils';
import AlertComponent from '../../component/AlertComponent';
import { useDispatch } from 'react-redux';
import { dataStore } from '../../redux/reducers/authReducers';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditCuaHangScreen: React.FC<NavProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [timeO, setTimeOpen] = useState('');
  const [timeC, setTimeClose] = useState('');
  const [mail, setMail] = useState('');
  const [note, setNote] = useState('');
  const [isChecked, setChecked] = useState<boolean>();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
 
 const route = useRoute();

// Lấy thông tin từ tham số của đường dẫn
// const { tenCH, sdt, diaChi, email, thoiGianMo, thoiGianDong, trangThai, hinhAnh } = route.params;

  // const [imageUri, setImageUri] = useState(null); // State để lưu trữ URI của hình ảnh

  
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // const handleChooseImage = async () => {
  //   // Kiểm tra quyền truy cập vào thư viện ảnh
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     Alert.alert('Permission denied', 'You need to enable permission to access the library.');
  //     return;
  //   }
  
  //   // Chọn hình ảnh từ thư viện
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  
  
  //   if (!result.canceled) {
  //     setImageUri(result.uri);
  //   }
  // };


    //Hàm validate các trường thông tin

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
    if (!note.trim()) {
      return 'Vui lòng nhập trạng thái';
    }
    if (!timeO.trim()) {
      return 'Vui lòng nhập thời gian mở';
    }
    if (!timeC.trim()) {
      return 'Vui lòng nhập thời gian đóng';
    }
  
    if (!mail.trim() || !/^\S+@\S+\.\S+$/.test(mail.trim())) {
      return 'Vui lòng nhập địa chỉ email hợp lệ';
    }

    return null;
  };
  
  const handleContinue = async () => {
    // const errorMessage = validateInputs();
    // if (errorMessage) {
    //   setMsg(errorMessage);
    //   handleShowAlert();
    //   return;
    // }

    //gửi thông tin đi
    // await dispatch(dataStore({tenCH: name, sdt: phone, diaChi: address, email: mail}));
    // await saveData({ nameStore: name, phoneStore: phone, addressStore: address, mailStore: mail });
    navigation.navigate('DetailCuaHangScreen');
  };
  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Đảm bảo bàn phím không che phủ các EditText
  >
    <ScrollView style={styles.container} >
      <View style={styles.header}>
      <Image
     style={[styles.userLogo]} 
     source={require('../../assest/food.jpg')}
   />
      </View>
      <View style={styles.main}>

        <EditTextComponent
          label="text"
          placeholder="Tên cửa hàng"
          value={name}
          iconColor="gray"
          onChangeText={setName}
          icon={faShop}
        ></EditTextComponent>
        <EditTextComponent
          label="text"
          placeholder="Thời gian mở"
          value={timeO}
          iconColor="gray"
          onChangeText={setTimeOpen}
          icon={faLockOpen}
        />
         <EditTextComponent
          label="text"
          placeholder="Thời gian đóng"
          value={timeC}
          iconColor="gray"
          onChangeText={setTimeClose}
          icon={faLock}
        />
        
        <EditTextComponent
          label="text"
          placeholder="Email"
          value={mail}
          iconColor="gray"
          onChangeText={setMail}
          icon={faEnvelope}
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
          value={'Hà Nội'}
          textColor='gray'
          iconColor="gray"
          onChangeText={setAddress}
          icon={faLocationDot}
        />

        <ButtonComponent
              type="primary"
              text="Lưu"
              textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
              onPress={handleContinue}
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
  },
  userLogo: {
    width: 375,
    height: 155,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15
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

  chooseImage: {
    backgroundColor: appColors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  chooseImageText: {
    color: 'white',
  },
  image: {
    width: wp(50),
    height: wp(50),
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default EditCuaHangScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

