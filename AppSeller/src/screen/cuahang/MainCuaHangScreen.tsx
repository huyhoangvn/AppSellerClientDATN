import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image,KeyboardAvoidingView,ScrollView, Alert,Platform } from 'react-native';
import TextComponent from '../../component/TextComponent';
import {faShop,faPhone,faLocationDot,faEnvelope, faTimes, faTimeline, faTimesCircle, faTimesSquare, faClock, faPlane, faMessage} from '@fortawesome/free-solid-svg-icons';
import NavProps from '../../models/props/NavProps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CuaHang } from '../../models/CuaHang';
import { Route } from 'react-native-tab-view';
import authenticationAPI from '../../apis/authApi';


const MainCuaHangScreen: React.FC<NavProps> = ({ navigation ,route}:any) => {
  const [loading, setLoading] = useState(false);
  const [cuaHang, setCuaHang] = useState<CuaHang []>([]);

  useEffect(() => {
    const fetchChiTietCuaHang = async (
    ) => {
      const idStore = route.params?.idCH; // Lấy idCH từ props navigation

      try {
        setLoading(true);
     
        const res = await authenticationAPI.HandleAuthentication(
          `/nhanvien/cuahang/chi-tiet/${idStore}`,
          'get'
        );
        if (res.success === true) {
          const { tenCH, thoiGianMo,thoiGianDong, email, sdt, diaChi } = res.data;
           // Cập nhật mảng cuaHang bằng cách thêm một đối tượng mới
           setCuaHang({
            tenCH,
            thoiGianMo,
            thoiGianDong,
            email,
            sdt,
            diaChi
          });
        } else {
          Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy dữ liệu cửa hàng');
        }
      } catch (err) {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kết nối đến máy chủ');
      } finally {
        setLoading(false);
      }
    };
    fetchChiTietCuaHang();
  }, [route.params]);


  return (

     <ScrollView style={styles.container} >
      {cuaHang && (
        <View >
          <Image
               style={[styles.userLogo]} 
               source={{uri:'https://s3-alpha-sig.figma.com/img/9095/7ee6/2e59f0dd47c07df4fd62c0c6f8234fc1?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WcYJ-Aluh~6iE40ETceszZ2fRS5LImXKOS7YDXkEZM8QIC9lNNPYWqn3nJggcBT1n7wbDHcXX8O49ok~KwzFEbOReNtPZec20~gvbKAJpB1rrCF7ndUQUP09estWu0PA2JCbhLuTEtCAVfCuNyfoxGBjEPSkYJu4LOAGcBrollAESA~TO4HQxmmnrh4dNfWg3mlJ2RVkuA6UwvrkXy~74yV4-rNGiv~BN2LhF1to91VABRD74uFzpfTAhozWqsLnZ1f2-7dfZJHW3lLhEexir6SXp1VhQSIP7y6QVemqttKrL2dAnOjkaU7TCqofJ4-14s3XgjZJQ1jRzHKSfCHD-Q__'}} />

    {/* tên cửa hàng */}
         <Text style = {styles.textTitle}> {cuaHang.tenCH}</Text>
         <Text style={styles.line} />
    

    {/* thời gian mở */}
    <View style={styles.textContainer}>
   
    <TextComponent 
    size={15}
    color='#000000'
    text=' Thời gian mở : '
    icon={faClock}
    iconColor='gray'
  />
  <Text style = {styles.textContent} >{cuaHang.thoiGianMo} - {cuaHang.thoiGianDong}</Text>
  </View>

  {/* email */}
  <View style={styles.textContainer}>
    <TextComponent 
    size={15}
    color='#000000'
    text=' Email : '
    icon={faEnvelope}
    iconColor='gray'
  />
  <Text style = {styles.textContent}>{cuaHang.email}</Text>
  </View>

  {/* số điện thoại */}
  <View style={styles.textContainer}>
    <TextComponent 
    size={15}
    color='#000000'
    text=' Số điện thoại : '
    icon={faPhone}
    iconColor='gray'
  />
  <Text style = {styles.textContent}>{cuaHang.sdt}</Text>
  </View>

  {/* địa chỉ */}
  <View style={styles.textPlace}>
    <TextComponent 
       size={15}
       color='#000000'
       text=' Địa chỉ : '
       icon={faLocationDot}
       iconColor='gray'
       marginLeft={5}/>
  <Text style = {styles.textContent}>{cuaHang.diaChi}</Text>
        </View>
        </View>
      )}
     
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
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5
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
 
  line: {
    borderBottomWidth:2,
    borderColor: '#D2D2D2',
    marginBottom: 10
  },
  userLogo: {
    width: 392,
    height: 155,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 10,
  },
  
  // info: {
  //   fontSize: 16,
  //   marginBottom: 5,
  // },
});

export default MainCuaHangScreen;
