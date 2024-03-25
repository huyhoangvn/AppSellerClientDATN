import React, {useState} from 'react';
import { View, Text, StyleSheet,Image, TextInput , TouchableOpacity } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { useRoute } from '@react-navigation/native'; // Importing useRoute hook
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faUser, faCalendarWeek, faCoins, faVectorSquare } from '@fortawesome/free-solid-svg-icons'; // Change to faUser for user icon
import EditTextComponent from '../../component/EditTextComponent';
import ButtonComponent from '../../component/ButtonComponent';
import { Mon } from '../../models/Mon';
import CheckBox from 'expo-checkbox';
import DropdownPicker from '../../component/drowpdown/DropdownPicker';
import DropDownComponent from '../../component/DropDownComponent';
import authenticationAPI from '../../apis/authApi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColors} from '../../constants/appColors';
import { getData } from '../../utils/storageUtils';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';

const EditMonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const route = useRoute(); // Using useRoute hook to get route object
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');

  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Mon[]>([]);
  const [position, setPosition] = useState<any>();
  const [tenMon, setTenMon] = useState('');
  const [price, setPrice] = useState('');


  const categoryOptions = [
    { label: 'Đò chiên', value: 'Đò chiên' },
    { label: 'Đồ rán', value: 'Đồ rán' },
  ];
const validateInputs = () => {
  if (!tenMon.trim()) {
    return 'Vui lòng nhập tên món';
  }
  if (!price.trim() ) {
    return 'Vui lòng nhập giá tiền hợp lệ';
  }
  if (!checkBox1 && !checkBox2) {
    return 'Vui lòng chọn ít nhất một trạng thái';
  }
  return null;
};
const handleShowAlert = () => {
  setShowAlert(true);
};

const handleCloseAlert = () => {
  setShowAlert(false);
};
const handleCheckBox1Change = (newValue: boolean) => {
  setCheckBox1(newValue);
};

const handleCheckBox2Change = (newValue: boolean) => {
  setCheckBox2(newValue);
};
  const handelSave = async () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setMsg(errorMessage);
      handleShowAlert();
      return;
    }
    
    const data = await getData();
    const idNV = data?.idNV;
    const checkbox = data?.isChecked;
    const requestData = {
      idNV: idNV,
      tenMon: tenMon,
      giaTien: price,
      trangThai: checkbox,
      tenLM: selectedCategory,
    };
    try {
      setLoading(true);
      const res = await authenticationAPI.HandleAuthentication(
        `/nhanvien/mon/${idNV}`,
         requestData,
        'post',
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
    <Image style={styles.userLogo} source={{uri:'data:image/png;base64,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',}} />

    <View style={styles.inputContainer}>
      <EditTextComponent
        label="text"
        placeholder="Tên món"
        iconColor="gray"
        icon={faCalendarWeek}
        onChangeText={setTenMon}
        />
         <DropDownComponent
            label="Select Item" // Nhãn cho DropDownComponent
            value={selectedItem} // Giá trị được chọn
            items={categoryOptions.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            defaultValue="item1" // Giá trị mặc định
            containerStyle={styles.inputDropdown}
            onChangeItem={item => setSelectedCategory(item?.valueOf)}
            placeholder="Loại món"
          /> 

        <EditTextComponent
          label="text"
          placeholder="20.000"
          iconColor="gray"
          icon={faCoins}
          onChangeText={setPrice}
        />


    </View>

    <View style={styles.checkboxContainer}>
       <Text style={styles.label}>Trạng thái</Text>
     <View style={styles.checkbox}>
       <CheckBox
       disabled={false}
       value={checkBox1}
       onValueChange={handleCheckBox1Change} 
       />
       <Text style={styles.checkboxText}>Hoạt động</Text>
    </View>
     <View style={styles.checkbox}>
      <CheckBox
       disabled={false}
       value={checkBox2}
       onValueChange={handleCheckBox2Change} 
       />
      <Text style={styles.checkboxText}>Khóa</Text>
    </View>
   </View>

    <View style={styles.buttonContainer}>
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
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(90),
    backgroundColor: appColors.white,
    position: 'relative', // Add this line to make positioning easier
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Add this line to set the zIndex of the input container
  },
  userLogo: {
    width: 150,
    height: 150,
    borderRadius: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 20, // Adjusted marginTop
    marginBottom: 20, // Adjusted marginBottom
  },

 
  inputDropdown: {
    width: wp(95),
    borderRadius: 100,
    backgroundColor: appColors.editTextColor,
    marginTop: 20,
    marginBottom: 20,
    position: 'relative', // Add this line to make positioning easier
    zIndex: 2, // Add this line to set the zIndex of the dropdown component
  },
 
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  checkboxText: {
    color: 'black',
    marginLeft: 5,
  },
  inactiveCheckbox: {
    backgroundColor: 'red',
  },
  
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer:{
    marginTop: 10,
  },
 
});

export default EditMonScreen;