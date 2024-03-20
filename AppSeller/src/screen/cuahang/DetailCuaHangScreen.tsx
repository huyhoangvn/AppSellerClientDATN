import React, { useEffect } from 'react';
import { View, Text, StyleSheet,KeyboardAvoidingView,Image, Platform,ScrollView } from 'react-native';
import TextComponent from '../../component/TextComponent';

import { useSelector, useDispatch } from 'react-redux';
import { dataStore, getDataStore } from '../../redux/reducers/authReducers'; // Import selector để lấy dữ liệu từ store
import { getData } from '../../utils/storageUtils'; // Import hàm lấy dữ liệu từ AsyncStorage
import NavProps from '../../models/props/NavProps';
import ButtonComponent from '../../component/ButtonComponent';
import EditCuaHangScreen from './EditCuaHangScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailCuaHangScreen: React.FC<NavProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const storeData = useSelector(getDataStore); // Lấy dữ liệu cửa hàng từ store
  const { tenCH, sdt, diaChi, email,thoiGianMo,thoiGianDong,trangThai  ,hinhAnh,thoiGianTao} = storeData; // Trích xuất thông tin cửa hàng từ dữ liệu lấy được từ store

  useEffect(() => {
    // Gọi hàm lấy dữ liệu từ AsyncStorage khi màn hình được tải
    fetchDataFromAsyncStorage();
  }, []);

  const fetchDataFromAsyncStorage = async () => {
    // Gọi hàm lấy dữ liệu từ AsyncStorage
    const dataFromAsyncStorage = await getData();
    if (dataFromAsyncStorage) {
      // Nếu có dữ liệu từ AsyncStorage, cập nhật store
      dispatch(dataStore(dataFromAsyncStorage));
    }
  };

  const handleChange = async() =>{

    await dispatch(dataStore({tenCH: tenCH, sdt: sdt, diaChi: diaChi, email: email}));
    // Truyền dữ liệu thông qua props navigation
    navigation.navigate('EditCuaHangScreen', { 
      tenCH: tenCH, 
      sdt: sdt, 
      diaChi: diaChi, 
      email: email 
    });
  // navigation.navigate('EditCuaHangScreen');
}
return (
  <ScrollView style={styles.container} >
  <View style={styles.header}>
  <Image
     style={[styles.userLogo]} 
     source={require('../../assest/food.jpg')}
   />
   </View>
   <View style={styles.textContainer}>
 <TextComponent 
 size={15}
 color='#919191'
 marginTop={3}
 text=' Tên cửa hàng : '
/>
<TextComponent 
 marginTop={3}

   size={15}
   color='black'
   text='FIVE STAR Cát Quế'
  textAlign='left'
   />

</View>
  <Text style={styles.line} />

 {/* thời gian mở */}
 <View style={styles.textContainer}>
 <TextComponent 
 size={15}
 color='#919191'
 text=' Thời gian mở : '
 marginTop={3}

/>
<TextComponent 
 size={15}
 color='#000000'
 text='06h30 '
 textAlign='left'
 marginTop={3}

/>
</View>
<Text style={styles.line} />

{/* thời gian đóng */}
<View style={styles.textContainer}>
 <TextComponent 
 size={15}
 color='#919191'
 text=' Thời gian đóng : '
 marginTop={3}

/>
<TextComponent 
 size={15}
 color='#000000'
 text='22h00 '
 textAlign='left'
 marginTop={3}

/>
</View>
<Text style={styles.line} />

{/* email */}
<View style={styles.textContainer}>
 <TextComponent 
 size={15}
 color='#919191'
 text=' Email : '
 marginTop={3}

/>
<TextComponent 
 size={15}
 color='#000000'
 text='abc@gmail.com '
 textAlign='left'
 marginTop={3}

/>
</View>
<Text style={styles.line} />

{/* số điện thoại */}
<View style={styles.textContainer}>
 <TextComponent 
 size={15}
 color='#919191'
 text=' Số điện thoại : '
 marginTop={3}

/>
<TextComponent 
 size={15}
 color='#000000'
 text='0987654321 '
 textAlign='left'
 marginTop={3}

/>
</View>
<Text style={styles.line} />

{/* địa chỉ */}
<View style={styles.textPlace}>
 <TextComponent 
 size={15}
 color='#000000'
 text=' Địa chỉ : '
 marginLeft={5}
 marginTop={3}

/>
<TextComponent 
 size={15}
 color='#000000'
 text=' Hàm Nghi, Mỹ Đình 2, Nam Từ Liêm, HN'
 textAlign='left'
 marginTop={3}

/>
</View>
<Text style={styles.line} />

{/* thời gian tạo */}
<View style={styles.textContainer}>
 <TextComponent 
 size={15}
 color='#919191'
 text=' Thời gian tạo : '
 marginTop={3}

/>
<TextComponent 
 size={15}
 color='#000000'
 text='18-02-2024 08:30 '
 textAlign='left'
 marginTop={3}

/>
</View>
<Text style={styles.line} />

{/* trạng thái */}
<View style={styles.textContainer}>
 <TextComponent 
 size={15}
 color='#919191'
 text=' Trạng thái : '

/>
<TextComponent 
 size={15}
 color='#EC5245'
 text='Không Hoạt Động '
 textAlign='right'
/>
</View>
<Text style={styles.line} />
<ButtonComponent
              type="primary"
              text="Sửa thông tin"
              textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
              onPress={() =>  {navigation.navigate('EditCuaHangScreen')}}
            />
        

   {/* <Text style={styles.info}>Thời gian mở cửa: {thoiGianMo}-{thoiGianDong}</Text>
   <Text style={styles.info}>
     Email: {email}</Text>
   <Text style={styles.info}>  Số điện thoại: {sdt}
     </Text>
   <Text style={styles.info}>Địa chỉ: {diaChi}</Text> */}
  </ScrollView>


);
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
    height: hp(100),
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header:{

  },
  
  textContainer: {
    textAlign:'right',
    paddingHorizontal: 10,
    flexDirection: 'row', // Sắp xếp các thành phần ngang hàng
    alignItems: 'center', // Căn chỉnh các thành phần theo chiều dọc
    marginBottom: 10, // Khoảng cách giữa các thành phần
  },
  textPlace: {
    flexDirection: 'row', // Sắp xếp các thành phần ngang hàng

  },
 
  line: {
    borderBottomWidth:1,
    borderColor: '#D2D2D2',
   
  },
  userLogo: {
    width: 375,
    height: 155,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  
  // info: {
  //   fontSize: 16,
  //   marginBottom: 5,
  // },
});


export default DetailCuaHangScreen;
