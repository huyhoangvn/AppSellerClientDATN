import React, {useEffect, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import { formatCurrency } from '../../utils/currencyFormatUtils';

const EditMonScreen: React.FC<NavProps> = ({ navigation, route }:any) =>  {
  const { position, item } = route.params;


  const [tenMon, setTenMon] = useState<any>(item.tenMon);
  const [trangThai, setTrangThai] = useState(item.trangThai);
  const [giaTien, setGiaTien] = useState<any>(item.giaTien.toString());
  const [idLM, setidLM] = useState<any>(item.tenLM);

  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');

  const [loaiMon, setLoaiMon] = useState<{ label: string; value: string; }[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState('');


//Trạng thái select input
const itemsStatus = [
  {label: 'Hoạt động', value: 1},
  {label: 'Khóa', value: 0},
];
const loaiMonItem = [
  {label: 'Trạng thái', value: 0},
];

  const setSelectedLoaiMon =(item:any)=>{
    setidLM(item.value);
  };
  const setSelectedTrangThai =(item:any)=>{
    setTrangThai(item.value);
  };
  const validateInputs = () => {
  if (!imagePath) {
    return ('Hình ảnh không hợp lệ.');
   }
  if (!tenMon.trim()) {
    return 'Vui lòng nhập tên món';
  }
  if(!idLM  && idLM === ''){
    return 'Vui lòng chọn loại món ';
  }
  if(!trangThai  && trangThai === ''){
    return 'Vui lòng chọn trạng thái món ';
  }
   if (!giaTien.trim() || isNaN(parseFloat(giaTien))) {
    return 'Vui lòng nhập giá tiền hợp lệ';
  }
  return null;
  };
  const handleShowAlert = () => {
  setShowAlert(true); 
  };

const handleCloseAlert = () => {
  setShowAlert(false);
};
const generateRandomImageName = () => {
  const prefix = 'IMG_6314_'; // Tiền tố cố định
  const randomSuffix = Math.floor(Math.random() * 10000); // Số ngẫu nhiên từ 0 đến 9999
  const extension = '.jpeg'; // Phần mở rộng của tệp

  return `${prefix}${randomSuffix}${extension}`;
};
const handleImageSelect = async (imagePath: string) => {
  try {
    setImagePath(imagePath);
  } catch (error) {
    console.log('Error uploading image:', error);
  }
};
const handelUpdate = async (  ) => {
  const errorMessage = validateInputs();
  if (errorMessage) {
    setMsg(errorMessage);
    handleShowAlert();
    return;
  }
  try {
    setLoading(true);
    const data = await getData();
    const idNV = data?.idUser;
    // const parsedGiaTien = parseFloat(giaTien);

    const formData = new FormData();
      if (imagePath) {
        formData.append('hinhAnh', {
          uri: imagePath,
          name: generateRandomImageName(), // Tên của hình ảnh
          type: 'image/jpeg', // Loại của hình ảnh
        });
      }
      formData.append('idNV', idNV);
      formData.append('idLM', idLM);
      formData.append('tenMon', tenMon);
      formData.append('trangThai', trangThai);
      formData.append('giaTien', giaTien);
    const res:any = await authenticationAPI.HandleAuthentication(
      `/nhanvien/mon/${item._id}`,
       formData,
       'put', // 
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
    setMsg(msg); // Set error message
    handleShowAlert();
  } finally {
    setLoading(false);
   }
};



const danhSachLoaiMon = async ()=>{
  try {
    const res: any = await  authenticationAPI.HandleAuthentication (
      `/nhanvien/loaimon/`,
      'put',
    );

    if( res && res.success === true ){
     // đây là chỗ để set danh sách loại món 
     const newCategoryOptions: { label: string; value: string }[] = (res.list as any[]).map(item => ({
      label: item.tenLM.trim(),
      value: item._id.trim()
    }));
    setLoaiMon([...newCategoryOptions]);
    }
    else{
      setMsg('Thất bại.');
    }
  } catch (error) {
     console.log(error);
     setMsg('Request timeout. Please try again later.'); // Set error message
  }

}

useEffect(() => {
  danhSachLoaiMon();
}, []); 
useFocusEffect(
  React.useCallback(() => {
    danhSachLoaiMon();

    return () => {
      // Cleanup logic nếu cần (không bắt buộc)
    };
  }, []),
);
  return (
  <View style={styles.container}>
    
    <ImagePickerComponent
      onImageSelect={handleImageSelect}
      imageUri={item.hinhAnh}
      style={{borderRadius: wp(30), overflow: 'hidden'}}
       />   
    <View style={styles.inputContainer}>
        <EditTextComponent
         label="text"
         placeholder="Tên món"
         value={tenMon}
         iconColor="gray"
         icon={faCalendarWeek}
         onChangeText={setTenMon}
         />
        
   <View style={styles.main}>
    <View style={styles.viewDropDow}>
      <DropDownComponent
          label="Chọn loại món"
          value={idLM}
            items={loaiMon.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            containerStyle={{width: wp(55)}}    
            onChangeItem={(item) => setSelectedLoaiMon(item)}
            placeholder="Chọn loại món"
            
          /> 
         <DropDownComponent
            label="Trạng thái" // Nhãn cho DropDownComponent
            value={trangThai}
            items={itemsStatus.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            containerStyle={{width: wp(35), marginLeft: 5}}       
            onChangeItem={(item) => setSelectedTrangThai(item)}
            placeholder="Trạng thái"
          /> 
    </View>
    
    </View>
      <EditTextComponent
          label="text"
          placeholder="20.000"
          value={giaTien}
          iconColor="gray"
          icon={faCoins}
          onChangeText={setGiaTien}
        />
   </View>
   

    <View style={styles.buttonContainer}>
      <ButtonComponent
       type="primary"
       text="Lưu"
       textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
       onPress={handelUpdate}
      />
    </View>
    <LoadingComponent visible={loading ?? false} />

    <AlertComponent
          visible={showAlert}
          message={msg}
          onClose={handleCloseAlert}
        />
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  main:{
    justifyContent: 'space-between',
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
  
  viewDropDow: {
    padding:20,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
    margin: 10,
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