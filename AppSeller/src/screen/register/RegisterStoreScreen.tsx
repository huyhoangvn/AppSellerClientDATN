import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
  faBuildingColumns,
  faUser,
  faMoneyCheck,
  faBank,
} from '@fortawesome/free-solid-svg-icons';
import TextComponent from '../../component/TextComponent';
import ButtonComponent from '../../component/ButtonComponent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {appColors} from '../../constants/appColors';
import {saveData} from '../../utils/storageUtils';
import AlertComponent from '../../component/AlertComponent';
import {useDispatch} from 'react-redux';
import {dataStore} from '../../redux/reducers/authReducers';
import DropDownComponent from '../../component/DropDownComponent';
import NganHangPicker from '../../component/drowpdown/NganHangPicker';
import authenticationAPI from '../../apis/authApi';

const RegisterStoreScreen: React.FC<NavProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [mail, setMail] = useState('');
  const [nameUserBank, setNameUserBank] = useState('');
  const [nameBank, setNameBank] = useState('BIDV');
  const [numberBank, setNumberBank] = useState('');
  const [isChecked, setChecked] = useState<boolean>();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [danhSachNganHang, setDanhSachNganHang] = useState<any>([])

  useEffect(()=>{
    getDanhSachNganHang()
  }, [])
  
  const getDanhSachNganHang = async ()=>{
    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/nhanvien/thanhtoan/nganhang',
        'get',
      );
      if (res.success === true) {
        const { index } = res;
        setDanhSachNganHang(index)
      }
    } catch (e) {
      console.log(e);
    }
  }


  const handelSelectBank = (item: any) => {
    setNameBank(item)
  };

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
    if (!nameUserBank.trim()) {
      return 'Vui lòng nhập tên chủ tài khoản';
    }
    if (!nameBank.trim()) {
      return 'Vui lòng nhập tên ngân hang';
    }
    if (!numberBank.trim()) {
      return 'Vui lòng nhập số tài khoản';
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
    await dispatch(
      dataStore({
        tenCH: name,
        tenTaiKhoan: nameUserBank,
        taiKhoanThanhToan: nameBank,
        nganHangThuHuong: numberBank,
        sdt: phone,
        diaChi: address,
        email: mail,
      }),
    );
    // await saveData({ nameStore: name, phoneStore: phone, addressStore: address, mailStore: mail });
    navigation.navigate('RegisterUserScreen');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Đảm bảo bàn phím không che phủ các EditText
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TextComponent
            text="Đăng Ký"
            size={20}
            styles={{fontWeight: 'bold', textAlign: 'center'}}
          />
          <TextComponent
            text="Nhập thông tin cửa hàng"
            size={14}
            styles={{fontWeight: 'bold', textAlign: 'center'}}
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
          />
          {/* <DropDownComponent
              label="Select Item" // Nhãn cho DropDownComponent
              value={selectedItem} // Giá trị được chọn
              items={listBank.map(item => ({
                label: item.label,
                value: item.value.toString(),
              }))} // Danh sách các mục
              containerStyle={{
                width: wp(55),
                borderRadius: 100,
                maxHeight: 200,
              }}
              onChangeItem={item => {
                handelSelectBank(item);
              }}
              placeholder="Trạng thanh toán"
            />          */}
          <EditTextComponent
            label="text"
            placeholder="Nhập tên chủ tài khoản"
            value={nameUserBank}
            iconColor="gray"
            onChangeText={setNameUserBank}
            icon={faUser}
          />
          <NganHangPicker
            option={"BIDV"}
            onOptionChange={handelSelectBank}
            options={danhSachNganHang}
            icon={faBank}
          />
          <EditTextComponent
            label="number"
            placeholder="Nhập số tài khoản"
            value={numberBank}
            iconColor="gray"
            onChangeText={setNumberBank}
            icon={faMoneyCheck}
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
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}
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
    height: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    height: hp(70),
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },

  footer: {
    height: hp(10),
  },
  signOut: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default RegisterStoreScreen;
