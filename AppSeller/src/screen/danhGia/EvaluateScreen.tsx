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

const EvaluateScreen: React.FC<NavProps> = ({ navigation, route }: any) => {
  const { item } = route.params;
  const [soLuongDanhGia, setSoLuongDanhGia] = useState('');
  const [soLuong, setSoLuong] = useState('');
  const [danhGiaList, setDanhGiaList] = useState<any[]>([]);
  const [msg, setMsg] = useState<string>('');
  const [textXemThem, setTextXemThem] = useState('Xem thêm');
  const [trang, setTrang] = useState(1);

  const getDanhGia = async () => {
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        `/khachhang/danhgia/get-danh-sach-theo-mon-filter/${item._id}`,
        'get',
      );

      if (res && res.success) {
        const { list, count, currentPage, totalPage } = res;
        setDanhGiaList(res.list);
        setDanhGiaList(prevList => [...prevList, ...list]);
        setTrang(trang+1);

        setSoLuong(res.count);
      } else {
        setMsg(res.msg);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setMsg(msg);
    }
  };

 

  useEffect(() => {
    getDanhGia();
  }, []);

  const handleEvaluate = (item: any) => {
    navigation.navigate("DetailMonScreen", { item });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleEvaluate(item)}>
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
            text='Gà rán FIVESTAR'
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
          keyExtractor={(item) => item._id}
          style={{ width: '100%' }}
        />
        <TouchableOpacity onPress={() => getDanhGia()} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: appColors.primary, fontSize: appFontSize.normal}}>Xem thêm</Text>
          </TouchableOpacity>
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