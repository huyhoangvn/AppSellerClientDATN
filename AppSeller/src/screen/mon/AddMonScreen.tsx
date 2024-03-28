import React, {useState} from 'react';
import { View, Text, StyleSheet,Image, TextInput , TouchableOpacity, PermissionsAndroid, ImageBackgroundComponent } from 'react-native';
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
import { getData } from '../../utils/storageUtils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColors} from '../../constants/appColors';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import * as ImagePicker from 'expo-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerComponent from '../../component/ImagePickerComponent';
const AddMonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const route = useRoute(); // Using useRoute hook to get route object
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');

  const [checkBox1, setCheckBox1] = useState<boolean>(false);
  const [checkBox2, setCheckBox2] = useState<boolean>(false);

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

  try {
    setLoading(true);
    const data = await getData();
    const checkbox = data?.isChecked;
    const idNV = data?.idNV;
    const idLM = data?.idLM;

    const body = {
      idNV: idNV,
      idLM: idLM,
      tenMon: tenMon,
      giaTien: price,
      trangThai: checkbox,
      tenLM: selectedCategory,
    };

    const res = await authenticationAPI.HandleAuthentication(
      `/nhanvien/mon/`,
      body,
      'post',
    );
  
    console.log('zzzzzzzzzz'+res);
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
const handleImageSelect = async (imagePath: string) => {
  try {
    console.log("🚀 ~ handleImageSelect ~ imagePath:", imagePath)
    
     
  } catch (error) {
      console.log('Error uploading image:', error);
  }
};

  return (
  <View style={styles.container}>
    
    <ImagePickerComponent onImageSelect={handleImageSelect} />
   
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
            onChangeItem={(item) => setSelectedCategory(item?.valueOf)}
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
    flex: 1,
    backgroundColor: appColors.white,
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

export default AddMonScreen;