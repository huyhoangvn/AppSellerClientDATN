import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import NavProps from '../../models/props/NavProps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditTextComponent from '../../component/EditTextComponent';
import {
  faShop,
  faPhone,
  faLocationDot,
  faEnvelope,
  faLock,
  faLockOpen,
  faNoteSticky,
  faNotesMedical,
  faCalendarTimes,
} from '@fortawesome/free-solid-svg-icons';
import TextComponent from '../../component/TextComponent';
import ButtonComponent from '../../component/ButtonComponent';
import {appColors} from '../../constants/appColors';
import AlertComponent from '../../component/AlertComponent';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getData} from '../../utils/storageUtils';
import authenticationAPI from '../../apis/authApi';
import ImagePickerComponent from '../../component/ImagePickerComponent';
import {DefaultAvatar} from '../../assest/svgs';

const EditCuaHangScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  const [loading, setLoading] = useState(false);
  const cuaHang = route.params.cuaHang;
  const [name, setName] = useState(cuaHang.tenCH);
  const [phone, setPhone] = useState(cuaHang.sdt);
  const [address, setAddress] = useState(cuaHang.diaChi);
  const [timeO, setTimeOpen] = useState(cuaHang.thoiGianMo);
  const [timeC, setTimeClose] = useState(cuaHang.thoiGianDong);
  const [mail, setMail] = useState(cuaHang.email);
  const [imagePath, setImagePath] = useState('');
  const [isChecked, setChecked] = useState<boolean>();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  // Định nghĩa một biến state để xác định xem liệu hình ảnh đã được chọn hay không
  const [imageSelected, setImageSelected] = useState<boolean>(false);

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

    if (!timeO.trim()) {
      return 'Vui lòng nhập thời gian mở';
    }
    if (!timeC.trim()) {
      return 'Vui lòng nhập thời gian đóng';
    }
    if (!timeC.trim()) {
      return 'Vui lòng nhập thời gian đóng';
    }

    if (!mail.trim() || !/^\S+@\S+\.\S+$/.test(mail.trim())) {
      return 'Vui lòng nhập địa chỉ email hợp lệ';
    }

    return null;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  // Cập nhật thời gian mở
  const updateTimeOpen = (newTime: string) => {
    const formattedTime = formatTime(newTime);
    setTimeOpen(formattedTime);
  };

  // Cập nhật thời gian đóng
  const updateTimeClose = (newTime: string) => {
    const formattedTime = formatTime(newTime);
    setTimeClose(formattedTime);
  };

  // Xử lý khi nhấn nút "Lưu"
  const handleContinue = async () => {
    setLoading(true);
    try {
      const idStore = route.params?.cuaHang;
      const result = await getData();

      const formData = new FormData();
      if (imagePath) {
        formData.append('hinhAnh', {
          uri: imagePath,
          name: generateRandomImageName(), // Tạo tên ngẫu nhiên cho hình ảnh
          type: 'image/jpeg', // Loại của hình ảnh
        });
      }

      formData.append('tenCH', name);
      formData.append('diaChi', address);
      formData.append('sdt', phone);
      formData.append('thoiGianMo', timeO);
      formData.append('thoiGianDong', timeC);
      formData.append('email', mail);

      const res = await authenticationAPI.HandleAuthentication(
        `/nhanvien/cuahang/${result?.idStore}`,
        formData,
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

  // Tạo tên ngẫu nhiên cho hình ảnh
  const generateRandomImageName = () => {
    const prefix = 'IMG_6314_'; // Tiền tố cố định
    const randomSuffix = Math.floor(Math.random() * 10000); // Số ngẫu nhiên từ 0 đến 9999
    const extension = '.jpeg'; // Phần mở rộng của tệp

    return `${prefix}${randomSuffix}${extension}`;
  };

  // Xử lý khi chọn ảnh
  const handleImageSelect = async (imagePath: string | null) => {
    try {
      if (imagePath) {
        setImagePath(imagePath);
        // Khi có ảnh được chọn, đặt giá trị của biến imageSelected thành true
        setImageSelected(true);
      } else {
        // Nếu không có ảnh được chọn, sử dụng ảnh mặc định và đặt giá trị của biến imageSelected thành false
        setImagePath(require('./../../assest/default-image.jpg'));
        setImageSelected(false);
      }
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Đảm bảo bàn phím không che phủ các EditText
    >
      <ScrollView style={styles.container}>
      
        <ImagePickerComponent
          onImageSelect={handleImageSelect}
          imageUri={cuaHang.hinhAnh}
          style={[styles.userLogo]}
        />

        <View style={styles.main}>
          {/* tên cửa hàng */}
          <EditTextComponent
            label="text"
            placeholder="Tên cửa hàng"
            value={name}
            iconColor="gray"
            onChangeText={setName}
            icon={faShop}></EditTextComponent>

          {/* số điện thoại */}
          <EditTextComponent
            label="number"
            placeholder="Số điện thoại"
            value={phone}
            iconColor="gray"
            onChangeText={setPhone}
            icon={faPhone}
          />
          {/* địa chỉ */}
          <EditTextComponent
            label="text"
            placeholder="Địa chỉ"
            value={address}
            iconColor="gray"
            onChangeText={setAddress}
            icon={faLocationDot}
          />

          {/* email */}
          <EditTextComponent
            label="text"
            placeholder="Email"
            value={mail}
            iconColor="gray"
            onChangeText={setMail}
            icon={faEnvelope}
          />

          {/* thòi gian mở */}
          <EditTextComponent
            label="time"
            placeholder="Thời gian mở"
            value={timeO}
            iconColor="gray"
            onChangeText={setTimeOpen}
            icon={faLockOpen}
            onUpdate={updateTimeOpen}
          />

          {/* Thời  gian đóng */}
          <EditTextComponent
            label="time"
            placeholder="Thời gian đóng"
            value={timeC}
            iconColor="gray"
            onChangeText={setTimeClose}
            icon={faLock}
            onUpdate={updateTimeClose}
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
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
  },
  textContent: {
    fontSize: 15,
    color: '#2D4912',
  },

  textContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row', // Sắp xếp các thành phần ngang hàng
    alignItems: 'center', // Căn chỉnh các thành phần theo chiều dọc
    marginBottom: 10, // Khoảng cách giữa các thành phần
  },
  textPlace: {
    flexDirection: 'row', // Sắp xếp các thành phần ngang hàng
  },
  userLogo: {
    width: 375,
    height: 155,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  main: {
    height: hp(70),
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
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
