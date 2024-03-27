import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NavProps from '../../models/props/NavProps';
import DropDownPicker from '../../component/DropDownComponent';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

interface ThongKeMonScreenProps extends NavProps {}

const ThongKeMonScreen: React.FC<ThongKeMonScreenProps> = ({ navigation }) =>  {
  const [selectedYear, setSelectedYear] = useState('2024'); // Năm được chọn

  // Dữ liệu mẫu (sẽ thay thế bằng dữ liệu thực tế)
  const data = {
    ngay: "1 NGÀY",
    doanhThu1Ngay: "10000đ",
    doanhThu10Ngay: "20000đ",
    doanhThu30Ngay: "300000đ",
    tongDoanhThu: "330000đ"
  };
  const items = [
      {label: '2020', value: '2020'},
      {label: '2021', value: '2021'},
      {label: '2022', value: '2022'},
      {label: '2023', value: '2023'},
      {label: '2024', value: '2024'}, // Năm 2024 là mặc định được chọn
      {label: '2025', value: '2025'},
     
  ];
  
const datas =[
  {moth: 0, earnings: 0},
  {moth: 1, earnings: 100},
  {moth: 2, earnings: 999}, 
  {moth: 3, earnings: 541}, 
  {moth: 4, earnings: 200}, 
  {moth: 5, earnings: 2100}, 
  {moth: 6, earnings: 2010}, 
  {moth: 7, earnings: 2020}, 
  {moth: 8, earnings: 2040}, 
  {moth: 9, earnings: 2300}, 
  {moth: 10, earnings: 2200}, 
  {moth: 11, earnings: 1200}, 
  {moth: 12, earnings: 2000}, 

 
];
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Doanh thu gần đây </Text>
        <View style={[styles.itemContainer, styles.marginTop]}>
          <View style={styles.row}>
            <Text style={styles.label}>1 Ngày:</Text>
            <Text style={styles.value}>{data.doanhThu1Ngay}</Text>
          </View>
        </View>
        <View style={[styles.itemContainer, styles.marginTop]}>
          <View style={styles.row}>
            <Text style={styles.label}>10 Ngày:</Text>
            <Text style={styles.value}>{data.doanhThu10Ngay}</Text>
          </View>
        </View>
        <View style={[styles.itemContainer, styles.marginTop]}>
          <View style={styles.row}>
            <Text style={styles.label}>30 Ngày:</Text>
            <Text style={styles.value}>{data.doanhThu30Ngay}</Text>
          </View>
        </View>
        <Text style={styles.text}>Doanh thu tháng trong năm </Text>
        <DropDownPicker
            label="Select Item" // Nhãn cho DropDownPicker
            value={selectedYear} // Giá trị được chọn
            items={items} // Danh sách các mục
            defaultValue="2024" // Giá trị mặc định
            containerStyle={styles.inputDropdown}
            onChangeItem={(item) => setSelectedYear(item.value)}
            placeholder="Loại món"
          />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng doanh thu {selectedYear}:</Text>
          <Text style={styles.totalValue}>{data.tongDoanhThu}</Text>
        </View>
        <View style={styles.chartContainer}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar animate data={datas} x='month' y='earnings'/>

          </VictoryChart>
        </View>
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
    borderRadius: 10,
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