import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import YearPicker from '../../component/YearPicker';
import authenticationAPI from '../../apis/authApi';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import DropDownComponent from '../../component/DropDownComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EditMonScreen from '../mon/EditMonScreen';
import NavProps from '../../models/props/NavProps';
import {getData} from '../../utils/storageUtils';
import { appColors } from '../../constants/appColors';
import { formatCurrency } from '../../utils/currencyFormatUtils';
import {Mon} from '../../models/Mon';

const ThongKeMonScreen: React.FC<NavProps> = ({ navigation, route }:any) =>  {
  const [listHienThi, setListHienThi] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [thangChon, setThangChon] = useState(new Date().getMonth() + 1);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [trang, setTrang] = useState(1);
  const [tenMon, setTenMon] = useState("");
  const [soLuong, setSoLuong] = useState("");

  const [giaTien, setGiaTien] = useState("");

  const [doanhThu, setDoanhThu] = useState("");

  const [loading, setLoading] = useState(false);
  const [textXemThem, setTextXemThem] = useState('Xem thêm');

//tháng select input
const itemsThang = [
  {label: 'Tháng', value: -1},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
  {label: '10', value: 10},
  {label: '11', value: 11},
  {label: '12', value: 12},


];
  const handleYearSelect = (selectedYear: any) => {
    setYear(selectedYear);
    setIsPickerVisible(false);
  };
 
//Hiển thị chi tiết
const handleDetail = ( item: any ) => {
  navigation.navigate("DetailMonScreen", { idMon:  item._id });
};
//Tìm tháng
const timKiemTheoThang = async (item: any) => {
  setThangChon(item.value);
};


  // const handleSearch = async () => {
  //   try {
  //     const res:any = await authenticationAPI.HandleAuthentication(
  //       `/nhanvien/thongke/mon-ban-chay?nam=${year}&thang=${thangChon}`,
  //       'get'
  //     );
  //     if (res && res.success) {
  //       setListHienThi(res.list);
  //     } else {
  //       setListHienThi([]);
  //     }
  //   } catch (error) {
  //     console.error('Error while fetching data:', error);
  //     setListHienThi([]);
  //   }
  // };
    //Xem thêm
    const xemThemMon = async () => {
      await getThongKeMon(tenMon, soLuong, giaTien,doanhThu, trang+1);
    };
  const getThongKeMon = async (tenMon: any, soLuong: any, giaTien: any, doanhThu:any, trang: any) => {
    const data = await getData();
    const idMon = data?.idMon;
    const res: any = await authenticationAPI.HandleAuthentication(
      `/nhanvien/thongke/mon-ban-chay/?nam=${year}&thang=${thangChon}&trang=${trang}`,
      'get',
    );
    if (res.success === false) {
      if (!res.list) {
        return;
      }
      return;
    }
   console.log(res);
    if (trang === 1) {
      setListHienThi(res.list);
    } else {
      setListHienThi(prevListHienThi => [...prevListHienThi, ...res.list]);
    }
    //Lưu lại dữ liệu tìm kiếm 
    if (res.list.length > 0) {
      setTrang(res.currentPage);
      setTextXemThem(res.list.length === 10 ? "Xem Thêm" : "Hết");
    } else {
      setTextXemThem("Hết");//Đổi thành "" để khách hàng ko nhấn hoặc ẩn nút cũng đc
    }
    setTenMon(tenMon);
    setSoLuong(soLuong);
    setGiaTien(giaTien);
    setDoanhThu(doanhThu);
  };
  useEffect(() => {
    // handleSearch();
    getThongKeMon(tenMon, soLuong, giaTien,doanhThu, trang);
  }, [year, thangChon]);

  const renderItem = ({ item, index }: { item: any, index: any }) => {
    return (
      <TouchableOpacity onPress={() => handleDetail(item)}>
        <View style={styles.item}>
            <Image
             source={
            (!item.hinhAnh || item.hinhAnh === "N/A") ?
              require('./../../assest/default-avatar.jpg') :
              { uri: item.hinhAnh }}
              style={{ width: appImageSize.size100.width, height: appImageSize.size100.height, borderRadius: 8, }}
              defaultSource={require('./../../assest/default-avatar.jpg')}
          />
          <View style={{ paddingHorizontal: 10 }}>
          <Text style={{fontWeight: 'bold', fontSize: appFontSize.title }}># {index + 1}</Text>
            <Text style={{ fontSize: appFontSize.normal, color: appColors.text }}>{item.tenMon}</Text>
            <Text style={{ fontSize: appFontSize.normal,color: appColors.text }}>Doanh Thu: {formatCurrency(item.doanhThu)}</Text>
            <Text style={{fontSize: appFontSize.normal,color: appColors.text}}>Gía tiền: {formatCurrency(item.giaTien)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.viewDropDow}>
          <TouchableOpacity style={styles.inputContainer} onPress={() => setIsPickerVisible(true)}>
            <TextInput
              style={styles.input}
              placeholder="Năm"
              value={year ? year.toString() : ''}
              editable={false}
            />
            <FontAwesomeIcon icon={faCaretDown} style={styles.icon} />
          </TouchableOpacity>
          <YearPicker
            visible={isPickerVisible}
            onSelect={handleYearSelect}
            onClose={() => setIsPickerVisible(false)}
          />
           <DropDownComponent
           label="Tháng" // Nhãn cho DropDownComponent
           items={itemsThang.map(item => ({
             label: item.label,
             value: item.value.toString(),
           }))} // Danh sách các mục
           containerStyle={{width: wp(35)}}
           placeholder="Tất cả"
           onChangeItem={async item => await timKiemTheoThang(item)}
         />
        </View>
      </View>
      <View style={styles.footer}>
        {listHienThi.length === 0 ? (
          <Text style={{ textAlign: 'center', fontSize: appFontSize.normal }}>
            Không tìm thấy món
          </Text>
        ) : (
          <FlatList
            data={listHienThi}
            renderItem={renderItem}
            keyExtractor={(item, index) => item._id}
            style={{ width: '100%' }}
            ListFooterComponent={() => (
            <View style={{alignItems: 'center', paddingVertical: 10}}>
              <TouchableOpacity onPress={xemThemMon}>
                <Text style={{fontSize: appFontSize.normal}}>{textXemThem}</Text>
              </TouchableOpacity>
            </View>
          )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    justifyContent: 'space-between',
  },
  footer: {
    flex: 1,
    paddingHorizontal:10,
  },
  viewDropDow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#000000',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 30,
    width: 220,
    margin: 3,
  },
  input: {
    flex: 1,
    height: 47,
    width: 100,
    color: 'black',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default ThongKeMonScreen;