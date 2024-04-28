import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import NavProps from '../../models/props/NavProps';
import TextComponent from '../../component/TextComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import authenticationAPI from '../../apis/authApi';
import { getData } from '../../utils/storageUtils';
import { DanhGia } from '../../models/DanhGia';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import { appColors } from '../../constants/appColors';
import {CuaHang} from '../../models/CuaHang';
import { Mon } from '../../models/Mon';

const EvaluateScreen: React.FC<NavProps> = ({ navigation, route }: any) => {
  const { idMon } = route.params;
  const [soLuongDanhGia, setSoLuongDanhGia] = useState('');
  const [soLuong, setSoLuong] = useState('');
  const [danhGiaList, setDanhGiaList] = useState<any[]>([]);
  const [msg, setMsg] = useState<string>('');
  const [textXemThem, setTextXemThem] = useState('Xem thêm');
  const [trang, setTrang] = useState(1);


 const [tenKH, setTenKH] = useState('');
 const [thoiGianTao, setThoiGianTao] = useState('');
 const [soSao, setSoSao] = useState('');

 const [mon, setMon] = useState<Mon>();
 const [cuaHang, setCuaHang] = useState<CuaHang>();
 const [loading, setLoading] = useState(false);


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
      setMsg(res.msg);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  //Xem thêm
  const xemThemMon = async () => {
    await getDanhGia(tenKH, thoiGianTao, soSao, trang+1);
  };
  const getDanhGia = async (tenKH: any, thoiGianTao: any, soSao: any, trang: any) => {
    const res: any = await authenticationAPI.HandleAuthentication(
      `/khachhang/danhgia/get-danh-sach-theo-mon-filter/${idMon}?trangThai=1&trang=${trang}`,
      'get',
    );
    if (res.success === false) {
      if (!res.list) {
        return;
      }
      return;
    }

    if (trang === 1) {
      setDanhGiaList([...res.list]);
    } else {
      setDanhGiaList(prevListHienThi => [...prevListHienThi, ...res.list]);
    }
    //Lưu lại dữ liệu tìm kiếm 
    if (res.list.length > 0) {
      setTrang(res.currentPage);
      setTextXemThem(res.list.length === 10 ? "Xem Thêm" : "Hết");
    } else {
      setTextXemThem("Hết");//Đổi thành "" để khách hàng ko nhấn hoặc ẩn nút cũng đc
    }
    setTenKH(tenKH);
    setThoiGianTao(thoiGianTao);
    setSoSao(soSao);
    setSoLuong(res.soLuong);
  };
  useEffect(() => {
    getDanhGia(tenKH, thoiGianTao, soSao, trang);
    fetchChiTietCuaHang();
  }, []);



  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
      <Image
            source={
            (!item.hinhAnh || item.hinhAnh === "N/A") ?
              require('./../../assest/default-image.jpg') :
              { uri: item.hinhAnh }}
            style={{ width: appImageSize.size75.width, height: appImageSize.size75.height, margin: 10 }}
            defaultSource={require('./../../assest/default-avatar.jpg')}
          />  
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.tenKH}</Text>
          <Text style={styles.type}>{item.thoiGianTao}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.price}>{item.danhGia}</Text>
            <FontAwesomeIcon icon={faStar} size={24} color="#feb800" style={styles.icon} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <View style={styles.containerHeader}>
          <TextComponent
            text={`Gà rán (${cuaHang?.tenCH})`}
            color='#000000'
            size={19}
          />
          <TextComponent
            text={`Số đánh giá (${soLuong})`}
            size={18}
          />
        </View>
        
        <FlatList
          data={danhGiaList}
          renderItem={renderItem}
          keyExtractor={(item) => item.idDG}
          style={{ width: '100%' }}
          ListFooterComponent={() => (
            <View style={{alignItems: 'center', paddingVertical: 10}}>
              <TouchableOpacity onPress={xemThemMon}>
                <Text style={{fontSize: appFontSize.normal}}>{textXemThem}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    position: 'relative',
    marginHorizontal: 10,
    margin:10
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#000000',
  },
  type: {
    fontSize: 16,
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  }
});

export default EvaluateScreen;