import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import NavProps from '../../models/props/NavProps';
import DropDownPicker from '../../component/DropDownComponent';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import authenticationAPI from '../../apis/authApi';
import { HoaDon } from '../../models/HoaDon';
import LoadingComponent from '../../component/LoadingComponent';
import EditTextComponent from '../../component/EditTextComponent';
import {
  faCalendarDay,faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import YearPicker from '../../component/YearPicker';

const ThongKeDoanhThuScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [data, setData] = useState<HoaDon[]>([]);
  const [tongTienNgay, setTongTienNgay] = useState<number>(0);
  const [tongTien10Ngay, setTongTien10Ngay] = useState<number>(0);
  const [tongTien30Ngay, setTongTien30Ngay] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [tongDoanhThu, setTongDoanhThu] = useState<any>(0); // New state for yearly revenue
  const [year, setYear] = useState<number | null>(null);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  
  const datas = [
    {month: 0, earnings: 0},
    {month: 1, earnings: 100},
    {month: 2, earnings: 999}, 
    {month: 3, earnings: 541}, 
    {month: 4, earnings: 200}, 
    {month: 5, earnings: 2100}, 
    {month: 6, earnings: 2010}, 
    {month: 7, earnings: 2020}, 
    {month: 8, earnings: 2040}, 
    {month: 9, earnings: 2300}, 
    {month: 10, earnings: 2200}, 
    {month: 11, earnings: 1200}, 
    {month: 12, earnings: 2000}, 
  ];
  const handleYearSelect = async (item: any) => {
    setYear(item);
    setIsPickerVisible(false);
    await thongkeNam(item); // Gọi hàm thongkeNam với năm mới được chọn
  };
  const thongKeNgay = async (type: string) => {
    try {
      setLoading(true);

      let apiEndpoint = '';
      if (type === '1-ngay') {
        apiEndpoint = '/nhanvien/thongke/1-ngay';
      } else if (type === '10-ngay') {
        apiEndpoint = '/nhanvien/thongke/10-ngay';
      }
      else if (type === '30-ngay') {
        apiEndpoint = '/nhanvien/thongke/30-ngay';
      }

      const res: any = await authenticationAPI.HandleAuthentication(
        apiEndpoint,
        'get'
      );

      if (res && res.success === true) {
        setMsg(res.msg);
        setData(res.index);
        
        // Tính tổng tiền của ngày đó
        if (type === '1-ngay') {
          setTongTienNgay(res.tongTien);
        } else if (type === '10-ngay') {
          setTongTien10Ngay(res.tongTien);
        } else if (type === '30-ngay') {
          setTongTien30Ngay(res.tongTien);
        }

      } else {
        setMsg(res.msg);
      }
    } catch (err) {
      console.error(err);
      setMsg('Request timeout. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const thongkeNam = async (year: any) => {
    try {
      setLoading(true);
      const res: any = await authenticationAPI.HandleAuthentication (
        `/nhanvien/thongke?nam=${year}`,
        'get',
      );
      if (res && res.success === true && res.index) {
        setTongDoanhThu(res.index);

      } else {
        setTongDoanhThu(0);

        setMsg('Request failed. Please try again later.');
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
    } finally {
      setLoading(false);
    }
    setYear(year);
  };
  const thongkeThang = async (year: any) => {
    try {
      setLoading(true);
      const res: any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/thongke/12-thang?nam=${year}`,
        'get',
      );
      console.log(res);
      if (res && res.success === true && res.data) {
        // Xử lý dữ liệu từ res ở đây nếu cần thiết
        setMonthlyRevenue(res.data);
      } else {
        setMsg('Thất bại hoặc dữ liệu không có sẵn.');
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Gọi hàm lấy dữ liệu thống kê 1 ngày và 10 ngày khi component được render
    thongKeNgay('1-ngay');
    thongKeNgay('10-ngay');
    thongKeNgay('30-ngay');
    if (year !== null) {
      thongkeNam(year);
      thongkeThang(year);
    }
  }, [year]); 

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Doanh thu gần đây </Text>
        <View style={[styles.itemContainer, styles.marginTop]}>
          <View style={styles.row}>
            <Text style={styles.label}>1 Ngày:</Text>
            <Text style={styles.value}>{tongTienNgay}</Text>
          </View>
        </View>
        <View style={[styles.itemContainer, styles.marginTop]}>
          <View style={styles.row}>
            <Text style={styles.label}>10 Ngày:</Text>
            <Text style={styles.value}>{tongTien10Ngay}</Text>
          </View>
        </View>
        <View style={[styles.itemContainer, styles.marginTop]}>
          <View style={styles.row}>
            <Text style={styles.label}>30 Ngày:</Text>
            <Text style={styles.value}>{tongTien30Ngay}</Text>
          </View>
        </View>
        <Text style={styles.text}>Doanh thu tháng trong năm </Text>

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
        
       
    </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng doanh thu {year}:</Text>
          <Text style={styles.totalValue}>{tongDoanhThu}</Text>
        </View>
        
        <View style={styles.chartContainer}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar animate data={monthlyRevenue} x='month' y='tong'/>
          </VictoryChart>
        </View>


        <LoadingComponent visible={loading} />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    flexDirection: 'column', // Chỉnh sửa để cách hàng
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer:{
    padding: 10,
    backgroundColor: '#d0e7b9',
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  marginTop: {
    marginTop: 10, // Thêm khoảng cách giữa các hàng trừ hàng đầu tiên
  },
  inputDropdown: {
    marginTop: 10, // Khoảng cách giữa dropdown và phần trên
  },
  totalContainer: {
    flexDirection: 'row', // Hiển thị các thành phần trong hàng ngang
    justifyContent: 'space-between', // Các thành phần được căn giữa
    marginTop: 20, // Khoảng cách với phần trên
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
  },
  chartContainer: {
    marginTop: 20,
  },viewDropDow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  item: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 20,
    width: "100%",
    margin: 3,
  },
  input: {
    flex: 1, // To make TextInput fill the remaining space
    height: 45,
    width: 100,
    color: 'black', // Set the text color to black
    // Add any other input styles as needed
  },
  icon: {
    marginLeft: 10, // Adjust the spacing between input and icon as needed
    alignSelf: 'center', // Align the icon vertically center with the text input
  }
});

export default ThongKeDoanhThuScreen;