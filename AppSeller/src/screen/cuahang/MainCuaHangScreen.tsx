import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import TextComponent from '../../component/TextComponent';
import {
  faShop,
  faPhone,
  faLocationDot,
  faEnvelope,
  faTimes,
  faTimeline,
  faTimesCircle,
  faTimesSquare,
  faClock,
  faPlane,
  faMessage,
  faLocation,
  faLocationPin,
} from '@fortawesome/free-solid-svg-icons';
import NavProps from '../../models/props/NavProps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CuaHang} from '../../models/CuaHang';
import {Route} from 'react-native-tab-view';
import authenticationAPI from '../../apis/authApi';
import {getData} from '../../utils/storageUtils';
import {appImageSize} from '../../constants/appImageSize';
import {appFontSize} from '../../constants/appFontSizes';
import {appColors} from '../../constants/appColors';
import {Mon} from '../../models/Mon';
import ImagePickerComponent from '../../component/ImagePickerComponent';
import {DefaultAvatar} from '../../assest/svgs';

const MainCuaHangScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  const [loading, setLoading] = useState(false);
  const [cuaHang, setCuaHang] = useState<CuaHang>();
  const [listHienThi, setListMon] = useState<Mon[]>([]);
  const [msg, setMsg] = useState('');

  //Hiển thị chi tiết
  const handleDetail = ( item: any ) => {
    navigation.navigate("DetailMonScreen", { item });
  };
  
  const fetchChiTietCuaHang = async () => {
    const result = await getData();
    try {
      setLoading(true);
      const res:any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/cuahang/chi-tiet/${result?.idStore}`,
        'get',
      );
      if (res.success === true) {
        const {hinhAnh, tenCH, thoiGianMo, thoiGianDong, email, sdt, diaChi} =
          res.data;
        // Cập nhật mảng cuaHang bằng cách thêm một đối tượng mới
        setCuaHang({
          hinhAnh,
          tenCH,
          thoiGianMo,
          thoiGianDong,
          email,
          sdt,
          diaChi,
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

  const getMonBanChay = async () => {
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/mon`,
        'get',
      );
      if (res.success === true) {
        setListMon(res.list);
        setMsg(res.msg);
      } else {
        setMsg(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChiTietCuaHang();
      getMonBanChay();
    });

    return unsubscribe;
  }, [navigation, fetchChiTietCuaHang]);

  const renderItem = ({ item }: { item: Mon }) => {  
    return (
      <TouchableOpacity onPress={() => handleDetail(item)}>
      <View style={styles.item}>
          <Image
            source={
            (!item.hinhAnh || item.hinhAnh === "N/A") ?
              require('./../../assest/default-image.jpg') :
              { uri: item.hinhAnh }}
            style={{ width: appImageSize.size100.width, height: appImageSize.size100.height, borderRadius: 8 }}
            defaultSource={require('./../../assest/default-avatar.jpg')}
          />  
          <View style={{paddingHorizontal: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: appFontSize.title, color: 'black'}}>Tên món: {item.tenMon}</Text>
          <Text style={{fontSize: appFontSize.normal}}>Loại món: {item.tenLM}</Text>
          <Text style={{fontSize: appFontSize.normal}}>Gía tiền: {item.giaTien}đ</Text>
          <Text style={[{fontSize: appFontSize.normal}, {color: item.trangThai ? appColors.green : appColors.red}]}>
            {item.trangThai ? 'Hoạt động' : 'Khóa'}
          </Text>    
        </View>
      </View>
    </TouchableOpacity>
    );
  };


  return (
    <ScrollView style={styles.container}>
      {cuaHang && (
        <View>
          
          <Image
            source={
              !cuaHang.hinhAnh || cuaHang.hinhAnh === 'N/A'
                ? require('./../../assest/default-image.jpg')
                : {uri: cuaHang.hinhAnh}
            }
            style={[[styles.userLogo]]}
          />

          {/* tên cửa hàng */}
          <Text style={styles.textTitle}> {cuaHang.tenCH}</Text>
          <Text style={styles.line} />

          {/* thời gian mở */}
          <View style={styles.textContainer}>
            <TextComponent
              size={15}
              color="#000000"
              text=" Thời gian mở : "
              icon={faClock}
              iconColor="gray"
            />
            <Text style={styles.textContent}>
              {cuaHang.thoiGianMo} - {cuaHang.thoiGianDong}
            </Text>
          </View>

          {/* email */}
          <View style={styles.textContainer}>
            <TextComponent
              size={15}
              color="#000000"
              text=" Email : "
              icon={faEnvelope}
              iconColor="gray"
            />
            <Text style={styles.textContent}>{cuaHang.email}</Text>
          </View>

          {/* số điện thoại */}
          <View style={styles.textContainer}>
            <TextComponent
              size={15}
              color="#000000"
              text=" Số điện thoại : "
              icon={faPhone}
              iconColor="gray"
            />
            <Text style={styles.textContent}>{cuaHang.sdt}</Text>
          </View>

          {/* địa chỉ */}
          <View style={styles.textPlace}>
            <TextComponent
              size={15}
              color="#000000"
              text=" Địa chỉ : "
              icon={faLocationDot}
              iconColor="gray"
              marginLeft={5}
            />
            <Text style={styles.textContent}>{cuaHang.diaChi}</Text>
            
          </View>
          <Text style={styles.line} />
        </View>
      )}
      <View style={styles.footer}>
        <Text style={styles.textMonBanChay}>Món đang phục vụ</Text>
        <FlatList
          scrollEnabled={false}
          data={listHienThi}
          renderItem={renderItem}
          keyExtractor={(item: any) => item._id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginLeft: 5,
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
    borderBottomWidth: 1,
    borderColor: '#D2D2D2',
    marginBottom: 10,
    margin: 10,
  },
  userLogo: {
    width: appImageSize.sizeCH.width,
    height: appImageSize.sizeCH.height,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 10,
  },

  textMonBanChay: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
  },
  item: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    margin: 10,
  },
});

export default MainCuaHangScreen;
