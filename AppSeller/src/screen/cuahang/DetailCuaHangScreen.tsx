import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import TextComponent from '../../component/TextComponent';
import {useSelector, useDispatch} from 'react-redux';
import {dataStore, getDataStore} from '../../redux/reducers/authReducers'; // Import selector để lấy dữ liệu từ store
import {getData} from '../../utils/storageUtils'; // Import hàm lấy dữ liệu từ AsyncStorage
import NavProps from '../../models/props/NavProps';
import ButtonComponent from '../../component/ButtonComponent';
import EditCuaHangScreen from './EditCuaHangScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CuaHang} from '../../models/CuaHang';
import {Route} from 'react-native-tab-view';
import authenticationAPI from '../../apis/authApi';
import {appColors} from '../../constants/appColors';
import moment from 'moment';
import ImagePickerComponent from '../../component/ImagePickerComponent';
import {DefaultAvatar} from '../../assest/svgs';

const DetailCuaHangScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  const [loading, setLoading] = useState(false);
  const [cuaHang, setCuaHang] = useState<CuaHang>();

  const fetchChiTietCuaHang = useCallback(async () => {
    const result = await getData();
    try {
      setLoading(true);
      const res = await authenticationAPI.HandleAuthentication(
        `/nhanvien/cuahang/chi-tiet/${result?.idStore}`,
        'get',
      );
      if (res.success === true) {
        const {
          hinhAnh,
          tenCH,
          thoiGianMo,
          thoiGianDong,
          thoiGianTao,
          email,
          sdt,
          diaChi,
          trangThai,
        } = res.data;
        setCuaHang({
          hinhAnh,
          tenCH,
          thoiGianMo,
          thoiGianDong,
          thoiGianTao: moment(thoiGianTao).format('YYYY-MM-DD HH:mm'),
          email,
          sdt,
          diaChi,
          trangThai,
        });
      } else {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy dữ liệu cửa hàng');
      }
    } catch (err) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChiTietCuaHang();
    });

    return unsubscribe;
  }, [navigation, fetchChiTietCuaHang]);

  return (
    <View style={styles.container}>
      {/* <Image
        style={[styles.userLogo]}
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/9095/7ee6/2e59f0dd47c07df4fd62c0c6f8234fc1?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WcYJ-Aluh~6iE40ETceszZ2fRS5LImXKOS7YDXkEZM8QIC9lNNPYWqn3nJggcBT1n7wbDHcXX8O49ok~KwzFEbOReNtPZec20~gvbKAJpB1rrCF7ndUQUP09estWu0PA2JCbhLuTEtCAVfCuNyfoxGBjEPSkYJu4LOAGcBrollAESA~TO4HQxmmnrh4dNfWg3mlJ2RVkuA6UwvrkXy~74yV4-rNGiv~BN2LhF1to91VABRD74uFzpfTAhozWqsLnZ1f2-7dfZJHW3lLhEexir6SXp1VhQSIP7y6QVemqttKrL2dAnOjkaU7TCqofJ4-14s3XgjZJQ1jRzHKSfCHD-Q__',
        }}
      /> */}

      {cuaHang && cuaHang.hinhAnh ? (
        <Image
          style={[styles.userLogo]}
          source={{uri: cuaHang.hinhAnh}}
        />
      ) : (
        <DefaultAvatar />
      )}

      {/* tên cửa hàng */}
      <View style={styles.viewText}>
        <Text>Tên cửa hàng </Text>
        <Text style={styles.textPrimary}>{cuaHang?.tenCH}</Text>
      </View>

      {/* thời gian mở  */}
      <View style={styles.viewText}>
        <Text>Thời gian mở </Text>
        <Text style={styles.textPrimary}>{cuaHang?.thoiGianMo}</Text>
      </View>

      {/* thòi gian đóng */}
      <View style={styles.viewText}>
        <Text>Thời gian đóng</Text>
        <Text style={styles.textPrimary}>{cuaHang?.thoiGianDong}</Text>
      </View>

      {/* email */}
      <View style={styles.viewText}>
        <Text>Email</Text>
        <Text style={styles.textPrimary}>{cuaHang?.email}</Text>
      </View>

      {/* số điện thoại */}
      <View style={styles.viewText}>
        <Text>Số điện thoại</Text>
        <Text style={styles.textPrimary}>{cuaHang?.sdt}</Text>
      </View>

      {/* địa chỉ */}
      <View style={styles.viewText}>
        <Text>Địa chỉ</Text>
        <Text style={[styles.textPrimary, styles.wrapText, styles.addressText]}>
          {cuaHang?.diaChi}
        </Text>
      </View>

      {/* thời gian tạo */}
      <View style={styles.viewText}>
        <Text>Thời gian tạo</Text>
        <Text style={styles.textPrimary}>{cuaHang?.thoiGianTao}</Text>
      </View>

      {/* trạng thái */}
      <View style={styles.viewText}>
        <Text>Trạng thái</Text>
        <Text
          style={[
            styles.textPrimary,
            {color: cuaHang?.trangThai === true ? '#3BB647' : '#EC5245'},
          ]}>
          {cuaHang?.trangThai === true ? 'Hoạt động' : 'Không hoạt động'}
        </Text>
      </View>

      <ButtonComponent
        type="primary"
        text="Sửa thông tin"
        textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
        onPress={() => {
          navigation.navigate('EditCuaHangScreen', {cuaHang});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(84),
    backgroundColor: appColors.white,
    justifyContent: 'space-between',
  },
  userLogo: {
    width: 392,
    height: 155,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 10,
  },
  header: {
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    paddingHorizontal: 10,
    height: hp(45),
    justifyContent: 'space-between',
  },
  footer: {
    height: hp(10),
    justifyContent: 'space-between',
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  textPrimary: {
    color: 'black',
    fontWeight: 'bold',
  },
  wrapText: {
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  addressText: {
    width: '70%', // Chiếm 50% chiều rộng của View cha
    // Các style khác cho văn bản địa chỉ
  },
});

export default DetailCuaHangScreen;
