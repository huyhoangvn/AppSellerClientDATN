import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Svg from 'react-native-svg'; // Import SVG components from react-native-svg
import NavProps from '../../models/props/NavProps';
import {faAdd, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditTextComponent from '../../component/EditTextComponent';
import {faMagnifyingGlass, faUser} from '@fortawesome/free-solid-svg-icons';
import {appColors} from '../../constants/appColors';
import {color} from '@rneui/themed/dist/config';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDownComponent from '../../component/DropDownComponent';
import TextComponent from '../../component/TextComponent';
import FloatButtonComponent from '../../component/FloatButtonComponent';
import {Mon} from '../../models/Mon';
import authenticationAPI from '../../apis/authApi';
import {getData} from '../../utils/storageUtils';
import LoadingComponent from '../../component/LoadingComponent';
import AlertComponent from '../../component/AlertComponent';
import { DefaultImage } from '../../assest/svgs';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import {useFocusEffect} from '@react-navigation/native';

const titles = ['Tất cả', 'Tráng miệng', 'Đồ chiên', 'Đồ nấu', 'Đồ uống']; // Add your titles here


const ListMonScreen: React.FC<NavProps> = ({ navigation }) =>  {

  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // const [listApi, setListApi] = useState<Mon[]>([]);
  const [listHienThi, setListHienThi] = useState<Mon[]>([]);
  const [position, setPosition] = useState<any>();
  const [textXemThem, setTextXemThem] = useState('Xem thêm');

  //Lưu tìm kiếm
  const [giaTienMin, setGiaTienMin] = useState(0);
  const [giaTienMax, setGiaTienMax] = useState(99999999);
  const [tenMon, setTenMon] = useState("");
  const [trangThai, setTrangThai] = useState(-1);
  const [trang, setTrang] = useState(1);
  const [tenLM, setTenLM] = useState('');
  //Giá tiền select input
  const itemsPosition = [
    {label: 'Tất cả', value: -1},
    {label: 'Dưới 10.000 đ', value: 0},
    {label: 'Dưới 50.000 đ', value: 1},
    {label: 'Dưới 100.000 đ', value: 2},
    {label: 'Trên 100.000 đ', value: 3},
  ];
  const itemsTenLM = [
    {label: 'Tất cả', value: ''},
    {label: 'Cơm ', value: 0},
    {label: 'Đồ chiên', value:1},
    {label: 'Đồ rán', value: 2},
    {label: 'Gà', value: 3},
  ];
  //Trạng thái select input
  const itemsStatus = [
    {label: 'Tất cả', value: -1},
    {label: 'Hoạt động', value: 1},
    {label: 'Khóa', value: 0},
  ];

  //Hiển thị chi tiết
  const handleDetail = ( item: any ) => {
    navigation.navigate("DetailMonScreen", { item });
    console.log(item);
  };
  
  //Tìm kiếm theo tên
  const timKiemTheoTen = (item: string) => {
    handleSearch(item, giaTienMin, giaTienMax, trangThai, 1, tenLM);
  }; 

  //Tìm kiếm theo giá
  const timKiemTheoGiaTien = async (item: any) => {
    let minPrice;
    let maxPrice;
    switch (item.value) {
      case '0':
        minPrice = 0;
        maxPrice = 9999;
        break;
      case '1':
        minPrice = 0;
        maxPrice = 49999;
        break;
      case '2':
        minPrice = 0;
        maxPrice = 99999;
        break;
      case '3':
        minPrice = 100000;
        maxPrice = Number.MAX_SAFE_INTEGER;
        break;
      default:
        minPrice = 0;
        maxPrice = Number.MAX_SAFE_INTEGER;
    }
    await handleSearch(tenMon, minPrice, maxPrice, trangThai, 1, tenLM);
  };
 //Tìm kiếm theo trạng thái
 const timKiemTheoTenLM = async (item: any) => {
  let categoryName = ''; // Initialize an empty string to store the category name
  
  switch (item.value) {
    case '':
      categoryName = '';
      break;
    case '0':
      categoryName = 'Cơm';
      break;
    case '1':
      categoryName = 'Đồ chiên';
      break;
    case '2':
      categoryName = 'Đồ rán';
      break;
    case '3':
      categoryName = 'Gà';
      break;
    default:
      categoryName = 'Trạng thái không xác định';
  }
  
  await handleSearch(tenMon, giaTienMin, giaTienMax, trangThai, 1, categoryName);
  console.log(item.value, item.label, categoryName); // Log the selected value, label, and category name
};

  //Tìm kiếm theo trạng thái
  const timKiemTheoTrangThai = async (item: any) => {
    await handleSearch(tenMon, giaTienMin, giaTienMax, parseInt(item.value, 10), 1, tenLM);
    console.log(item.value);
  };

  //Lấy phân quyền
  const getPhanQuyen = async () => {
    const storedData = await getData();
    const storedPosison = storedData?.position;
    setPosition(storedPosison);
  };
  

  //Tìm kiếm
  const handleSearch = async (tenMon: any, giaTienMin: any, giaTienMax: any, trangThai: any, trang: any, tenLM: any) => {
    const res : any = await authenticationAPI.HandleAuthentication (
    `/nhanvien/mon?tenMon=${tenMon}&giaTienMin=${giaTienMin}&giaTienMax=${giaTienMax}&trangThai=${trangThai}&trang=${trang}&tenLM=${tenLM}`,
      'get',
    )    
   console.log(res);
    if (res.success === false) {
      if (!res.list) {
        return;
      }
      return;
    }

    if (trang === 1) {
      setListHienThi([...res.list]);
    } else {
      setListHienThi(prevListHienThi => [...prevListHienThi, ...res.list]);
    }
    //Lưu lại dữ liệu tìm kiếm 
    if (res.list.length > 0) {
      setTrang(trang);
      setTextXemThem(res.list.length === 10 ? "Xem Thêm" : "Hết");
    } else {
      setTextXemThem("Hết");//Đổi thành "" để khách hàng ko nhấn hoặc ẩn nút cũng đc
    }
    setGiaTienMin(giaTienMin);
    setGiaTienMax(giaTienMax);
    setTrangThai(trangThai);
    setTenMon(tenMon);
    setTenLM(tenLM);
    //Set state sau cùng vì state nó không cập nhật ngay lập tức trong hàm
  }

  //Xem thêm
  const xemThemMon = async () => {
    await handleSearch(tenMon, giaTienMin, giaTienMax, trangThai, trang+1, tenLM);
  };
 
  useEffect(() => {
    handleSearch(tenMon, giaTienMin, giaTienMax, trangThai, 1, tenLM);    
    getPhanQuyen();
  }, []); 
  
  useFocusEffect(
    React.useCallback(() => {
      handleSearch(tenMon, giaTienMin, giaTienMax, trangThai, 1, tenLM);    
      getPhanQuyen();
      return () => {
        // Cleanup logic nếu cần (không bắt buộc)
      };
    }, []),
  );

 
  const renderItem = ({ item }: { item: Mon }) => {  
    return (
      <TouchableOpacity onPress={() => handleDetail(item)}>
      <View style={styles.item}>
          <Image
            source={
            (!item.hinhAnh || item.hinhAnh === "N/A") ?
              require('./../../assest/default-image.jpg') :
              { uri: item.hinhAnh }}
            style={{ width: appImageSize.size100.width, height: appImageSize.size100.height, borderRadius: 10 }}
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

  <View style={styles.container}>
     <View style={styles.main}>
         <EditTextComponent
          label="iconRight"
          placeholder="Nhập tên món"
          iconRight={faMagnifyingGlass}
          stylesEdit={{backgroundColor: 'white'}}
          onChangeText={(text: string) => timKiemTheoTen(text)}
          stylesContainer={{
            backgroundColor: appColors.white,
            borderColor: 'black',
            borderWidth: 1,
            elevation: 0,
          }}
          iconColor={appColors.primary}
        /> 
        <View style={styles.viewDropDow}>
          <DropDownComponent
            label="Loại món" // Nhãn cho DropDownComponent
            items={itemsTenLM.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            containerStyle={{width: wp(55), borderRadius: 100}}
            placeholder="Tất cả"
            onChangeItem={async item => await timKiemTheoTenLM(item)}
          />
          <DropDownComponent
            label="Trạng thái" // Nhãn cho DropDownComponent
            items={itemsStatus.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            containerStyle={{width: wp(35)}}
            placeholder="Tất cả"
            onChangeItem={async item => await timKiemTheoTrangThai(item)}
          />
        </View>
     </View>
  
   <View style={styles.footer}>
    {listHienThi.length === 0 ? (
          <Text style={{textAlign: 'center', fontSize: appFontSize.normal}}>
            không tìm thấy món
          </Text>
        ) : (
        <FlatList
          data={listHienThi}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <View style={{alignItems: 'center', paddingVertical: 10}}>
              <TouchableOpacity onPress={xemThemMon}>
                <Text style={{fontSize: appFontSize.normal}}>{textXemThem}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
        
    {/* Hiển thị nút floating button với phân quyền (position) 0 là quản lý */}
    {position === 0 ? (
      <FloatButtonComponent
        icon={faAdd}
        size={25}
        stylesNew={{alignSelf: 'flex-end', position: 'absolute'}}
        onPress={() => navigation.navigate('AddMonScreen')}
      />
    ) : null}
</View>
    <LoadingComponent visible={loading} />
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  main: {
    justifyContent: 'space-between',
  },
  footer: {
    flex: 1,
    padding: 10,
  },
  viewDropDow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 8,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
 
});

export default ListMonScreen;