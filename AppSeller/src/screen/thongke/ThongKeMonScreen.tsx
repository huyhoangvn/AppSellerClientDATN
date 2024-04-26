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

const ThongKeMonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const [listHienThi, setListHienThi] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [thangChon, setThangChon] = useState(new Date().getMonth() + 1);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  
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
  navigation.navigate("DetailMonScreen", { item });
  console.log(item);
};
//Tìm tháng
const timKiemTheoThang = async (item: any) => {
  setThangChon(item.value);
  console.log(item.value);
};



  const handleSearch = async () => {
    try {
      const res:any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/thongke/mon-ban-chay?nam=${year}&thang=${thangChon}`,
        'get'
      );
      if (res && res.success) {
        setListHienThi(res.list);
      } else {
        setListHienThi([]);
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
      setListHienThi([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [year, thangChon]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity onPress={() => handleDetail(item)}>
        <View style={styles.item}>
            <Image
             source={
            (!item.hinhAnh || item.hinhAnh === "N/A") ?
              require('./../../assest/default-avatar.jpg') :
              { uri: item.hinhAnh }}
            style={{ width: 65, height: 65 }}
            defaultSource={require('./../../assest/default-avatar.jpg')}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: appFontSize.normal }}> {item.soLuong}#</Text>
            <Text style={{ fontWeight: 'bold', fontSize: appFontSize.normal, color: 'black' }}>{item.tenMon}</Text>
            <Text style={{ fontSize: appFontSize.normal }}>Doanh Thu: {item.doanhThu}đ</Text>
            <Text style={{fontSize: appFontSize.normal}}>Gía tiền: {item.giaTien}đ</Text>
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
            keyExtractor={(item) => item._id}
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