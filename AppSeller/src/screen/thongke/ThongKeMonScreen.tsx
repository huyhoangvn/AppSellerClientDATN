import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NavProps from '../../models/props/NavProps';
import DropDownPicker from '../../component/DropDownComponent';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import authenticationAPI from '../../apis/authApi';
import { HoaDon } from '../../models/HoaDon';
import LoadingComponent from '../../component/LoadingComponent';




const ThongKeMonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [data, setData] = useState<HoaDon[]>([]);
  const [tongTienNgay, setTongTienNgay] = useState<number>(0);
  const [tongTien10Ngay, setTongTien10Ngay] = useState<number>(0);
  const [tongTien30Ngay, setTongTien30Ngay] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState('2024'); // Năm được chọn
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [yearlyRevenue, setYearlyRevenue] = useState<any>(); // New state for yearly revenue

 
  const items = [
      {label: '2020', value: '2020'},
      {label: '2021', value: '2021'},
      {label: '2022', value: '2022'},
      {label: '2023', value: '2023'},
      {label: '2024', value: '2024'}, // Năm 2024 là mặc định được chọn
      {label: '2025', value: '2025'},  
  ];

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
  const luaChonNam = async (item: any) => {
     
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
  const thongkeNam = async (nam: string) => {
    try {
      setLoading(true);
      const res: any = await authenticationAPI.HandleAuthentication (
        `/nhanvien/thongke?nam=${nam}`,
        'get',
      );
      if (res && res.success === true && res.index) {
        setYearlyRevenue(res.index);
      } else {
        setMsg('Request failed. Please try again later.');
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const thongkeThang = async (
    nam: string
    ) => {
    try {
      setLoading(true);
      const res:  any = await authenticationAPI.HandleAuthentication (
        `/nhanvien/thongke/12-thang?nam=${nam}`,
        'get',
      );
    
      if (res && res.success === true && res.index) {
        // Xử lý dữ liệu từ res ở đây nếu cần thiết
        setMonthlyRevenue(res.index);
        console.log(res.index);
      } else {
        setMsg('Thất bại.');
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
    thongkeThang(selectedYear);
    thongkeNam(selectedYear);
  }, []);

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
        <DropDownPicker
          label="Select Item" // Nhãn cho DropDownPicker
          value={selectedYear} // Giá trị được chọn
          items={items} // Danh sách các mục
          defaultValue="2024" // Giá trị mặc định
          containerStyle={styles.inputDropdown}
          onChangeItem={async item => await luaChonNam(item)}          
          placeholder="Loại món"
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng doanh thu {selectedYear}:</Text>
          <Text style={styles.totalValue}>{yearlyRevenue}</Text>
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
    fontSize: 24,
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
  },
});

export default ThongKeMonScreen;