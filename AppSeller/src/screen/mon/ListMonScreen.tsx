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
import { formatCurrency } from '../../utils/currencyFormatUtils';

const titles = ['Tất cả', 'Tráng miệng', 'Đồ chiên', 'Đồ nấu', 'Đồ uống']; // Add your titles here


const ListMonScreen: React.FC<NavProps> = ({ navigation }) =>  {

  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // const [listApi, setListApi] = useState<Mon[]>([]);
  const [listHienThi, setListHienThi] = useState<Mon[]>([]);
  const [position, setPosition] = useState<any>();
  const [textXemThem, setTextXemThem] = useState('Xem thêm');
  const [tenMon, setTenMon] = useState("");
  const [trangThai, setTrangThai] = useState('');
  const [nameType, setNameType] = useState('');
  const [trang, setTrang] = useState(1);
  const [type, setType] = useState<any[]>([]); 
  
  
  //Trạng thái select input
  const itemsStatus = [
    {label: 'Tất cả', value: ''},
    {label: 'Hoạt động', value: 1},
    {label: 'Khóa', value: 0},
  ];

  //Hiển thị chi tiết
  const handleDetail = ( item: any ) => {
    navigation.navigate("DetailMonScreen", { idMon: item._id });
  };
  
  //Tìm kiếm theo tên
  const timKiemTheoTen = (item: string) => {
    getListDish(item,  trangThai, trang, nameType);
  }; 


 //Tìm kiếm theo trạng thái
 const timKiemTheoTenLM = async (item: any) => {
  
  
  await getListDish(tenMon,  trangThai, trang, item.value);

};

  //Tìm kiếm theo trạng thái
  const timKiemTheoTrangThai = async (item: any) => {
    console.log("🚀 ~ timKiemTheoTrangThai ~ item:", item)
    await getListDish(tenMon,  parseInt(item.value, 10), 1, nameType);
  };

  //Lấy phân quyền
  const getPhanQuyen = async () => {
    const storedData = await getData();
    const storedPosison = storedData?.position;
    setPosition(storedPosison);
  };
  

  //Tìm kiếm
  const getListDish = async (tenMon: any, trangThai: any, trang: any, tenLM: any) => {
    console.log("🚀 ~ getListDish ~ tenLM:", tenLM)
    try {
      const item = await getData();
      const idStore = item?.idStore;
      const res : any = await authenticationAPI.HandleAuthentication (
        `/nhanvien/mon/theo-cua-hang/${idStore}?tenMon=${tenMon}&trangThai=${trangThai}&trang=${trang}&tenLM=${tenLM}`,
        'get',
      )    
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
      setTrangThai(trangThai);
      setTenMon(tenMon);
      setNameType(tenLM);
      //Set state sau cùng vì state nó không cập nhật ngay lập tức trong hàm
    } catch (error) {
      console.error(error);
    }
  }
  const getListType = async () => {
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/loaimon`,
        'get',
      );
      if (res.success === true) {
        let data = res.list.map((item: any) => ({
          label: item.tenLM,
          value: item.tenLM,
        }));
        data = [{ label: 'Tất cả', value: '' }, ...data];
        setType(data);
      }
    } catch (error) {
      console.error(error);
    }
  };




  //Xem thêm
  const xemThemMon = async () => {
    await getListDish(tenMon,  trangThai, trang + 1, nameType);
  };
 
  useEffect(() => {
    getListDish('',  '', 1, '');    
    getPhanQuyen();
    getListType();
  }, []); 
  
  useFocusEffect(
    React.useCallback(() => {
      getListDish('',  '', 1, '');    
      getPhanQuyen();
      getListType();
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
            style={{ width: appImageSize.size100.width, height: appImageSize.size100.height, borderRadius: 8 }}
            defaultSource={require('./../../assest/default-avatar.jpg')}
          />  
          <View style={{paddingHorizontal: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: appFontSize.title, color: 'black'}}>{item.tenMon}</Text>
          <Text style={{fontSize: appFontSize.normal}}>Loại món: {item.tenLM}</Text>
          <Text style={{fontSize: appFontSize.normal}}>Giá tiền:{item.giaTien !== undefined ? formatCurrency(item.giaTien) : ''}</Text>
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
            borderWidth: 1.5,
            elevation: 1,
          }}
          iconColor={appColors.primary}
        /> 
        <View style={styles.viewDropDow}>
        <DropDownComponent
                label="Loại món"
                items={type.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
                containerStyle={{ width: wp(55), borderRadius: 100 }}
                placeholder="Tất cả"
                onChangeItem={async (item) => await timKiemTheoTenLM(item)}
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