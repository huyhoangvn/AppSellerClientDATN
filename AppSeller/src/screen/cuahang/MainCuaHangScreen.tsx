import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image,KeyboardAvoidingView,ScrollView, Platform } from 'react-native';
import TextComponent from '../../component/TextComponent';
import {faShop,faPhone,faLocationDot,faEnvelope, faTimes, faTimeline, faTimesCircle, faTimesSquare, faClock, faPlane, faMessage} from '@fortawesome/free-solid-svg-icons';
import NavProps from '../../models/props/NavProps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const MainCuaHangScreen: React.FC<NavProps> = ({ navigation }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  return (
     <ScrollView style={styles.container} >
     <View style={styles.header}>
     <Image
        style={[styles.userLogo]} 
        source={require('../../assest/food.jpg')}
      />
      </View>

      <TextComponent 
      size={24}
      color='black'
      text='FIVE STAR Cát Quế'
     marginLeft={10}
      />
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
  <TextComponent 
    size={15}
    color='#2D4912'
    text='06h30 - 22h00 '
  />
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
  <TextComponent 
    size={15}
    color='#2D4912'
    text='abc@gmail.com '
  />
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
  <TextComponent 
    size={15}
    color='#2D4912'
    text='0987654321 '
  />
  </View>

  {/* địa chỉ */}
  <View style={styles.textPlace}>
    <TextComponent 
    size={15}
    color='#000000'
    text=' Địa chỉ : '
    icon={faLocationDot}
    iconColor='gray'
    marginLeft={5}
  />
  <TextComponent 
    size={15}
    color='#2D4912'
    text=' Hàm Nghi, Mỹ Đình 2, Nam Từ Liêm, HN'
  />
  </View>

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
