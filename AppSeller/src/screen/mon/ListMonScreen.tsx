import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Button } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { Mon } from '../../models/Mon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faAdd, } from '@fortawesome/free-solid-svg-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import EditTextComponent from '../../component/EditTextComponent';
import DropdownPicker from '../../component/drowpdown/DropdownPicker';
import authenticationAPI from '../../apis/authApi';
import ButtonComponent from '../../component/ButtonComponent';
import { TextBold } from 'iconsax-react-native';
import TextComponent from '../../component/TextComponent';
import AddMonScreen from '../../screen/mon/AddMonScreen';
interface ListItem {
  id: string;
  tenMon: string;
  tenLM: string;
  giaTien: number;
  hinhAnh: string;
  trangThai: boolean;
  title: String;
};
const titles = ['Tất cả', 'Tráng miệng', 'Đồ chiên', 'Đồ nấu', 'Đồ uống']; // Add your titles here

const data: ListItem[] = [
  { id: '1', tenMon: 'Gà rán FIVESTAR - 422 Cát Quế', tenLM:"Đồ chiên", giaTien: 59000, hinhAnh: 'https://cdn.tgdd.vn/Files/2017/03/22/963765/cach-lam-ga-ran-thom-ngon-8_760x450.jpg', trangThai: true , title:"Tất cả"},
  { id: '2', tenMon: 'Hamburger', tenLM:"Đồ chiên", giaTien: 60000, hinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg', trangThai: true , title:"Tất cả" },
  { id: '3', tenMon: 'Bánh mì  - 422 Huế ', tenLM:"Đồ chiên", giaTien: 60000, hinhAnh: 'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg', trangThai: 'Hoạt động', title:"Tất cả"  },
  { id: '4', tenMon: 'Bánh tráng trộn - 422 Cát Quế ', tenLM:"Đồ chiên",  giaTien: 60000, hinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg', trangThai: true , title:"Tất cả"  },
  { id: '5', tenMon: 'Bánh tráng trộn - 422 Cát Quế ', tenLM:"Đồ chiên", giaTien: 60000, hinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg', trangThai: true , title:"Tất cả"  },
  { id: '6', tenMon: 'Bánh tráng trộn - 422 Cát Quế ', tenLM:"Đồ chiên", giaTien: 60000, hinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg', trangThai: true , title:"Tất cả"  },
];

const ListMonScreen: React.FC<NavProps> = ({ navigation }) =>  {

  const [search, setSearch] = useState('');
  const [mon, setMon] = useState(''); // State to store fetched data
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };
  const handleAddMon = (param1: string, param2: string) => {
    navigation.navigate("AddMonScreen", { param1: param1, param2: param2 });
  };

  const handleDetail = ( item: ListItem ) => {
    navigation.navigate("DetailMonScreen", { item });
  };
 
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   handleMon();
  // }, []); 
  //  const handleMon = async () =>{
  //   setLoading(true);

  //   try {
  //     const res = await authenticationAPI.HandleAuthentication (
  //       '/nhanvien/mon',
  //       'get',
  //     )
  //     console.log(res.list);
  //     setData(res.list)
  //     // setData(res.list.KetQuaLoaiMon);

  //   } catch (error) {
  //     console.log(error);
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // }
  const renderTitleItem = ({ item }: { item: string }) => (
    <View style={styles.titleItemContainer}>
      <Text>{item}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: ListItem }) => (   
    <TouchableOpacity onPress={() => handleDetail(item)}>
    <View style={styles.itemContainer}>
        <Image source={{ uri: item.hinhAnh }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Tên món: {item.tenMon}</Text>
          <Text style={styles.type}>Loại món: {item.tenLM}</Text>
          <Text style={styles.price}>Gía tiền: {item.giaTien}đ</Text>
          <Text style={[styles.status, item.trangThai ? styles.activeStatus : styles.inactiveStatus]}>
           {item.trangThai ? 'Hoạt động' : 'Khóa'}
          </Text>       
       </View>
      </View>
    </TouchableOpacity>
  );

  return (

    <View style={styles.container}>
    <ScrollView>

      <View style={styles.containerHeader}>
        <EditTextComponent
          label="text"
          placeholder="Nhập tên món"
          value={search}
          iconColor="#5a9223"
          onChangeText={handleSearchChange}
        />
         <TouchableOpacity  style={styles.searchButton}>
             <FontAwesomeIcon icon={faSearch} size={20} style={{color:"#5a9223", }} />
         </TouchableOpacity>
      </View>

      <View style={styles.dropdownContainer}>
        <DropdownPicker
          label='Khoảng giá tiền'
          values={[]}
          onSelect={(val: string) => console.log(val)}
          selected={undefined}
        />
        <DropdownPicker
          label='Trạng thái'
          values={[]}
          onSelect={(val: string) => console.log(val)}
          selected={undefined}
        />
      </View>
      
      <FlatList
        data={titles}
        renderItem={renderTitleItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        />
 
  
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
        // refreshing={loading}
        // onRefresh={handleMon}
      />
      
      <View style={styles.centeredTextContainer}>
        <TouchableOpacity>
        <TextComponent 
          text='Xem thêm ...'
          styles={styles.textXemThem}
         />
        </TouchableOpacity>
       
      </View>
      
          
      </ScrollView>
      <TouchableOpacity style={styles.addButton}
       onPress={handleAddMon}
      >
         <FontAwesomeIcon icon={faAdd} size={24} color="white" />

      </TouchableOpacity>  
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    position: 'relative', // Add this line to make positioning easier
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: 195,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: '30%',
    aspectRatio: 1, 
    marginRight: 10,
    borderRadius: 20,
  },
  infoContainer: {
    width: '70%',
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
    color: '#000000',
  },
  status: {
    fontSize: 16,
    color: '#000000',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5a9223',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3, 
  },
  activeStatus: {
    color: 'green', // Color for 'Khóa'

  },
  inactiveStatus: {
    color: 'red', // Color for 'Hoạt động'

  },
  titleItemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
    marginHorizontal: 10,
  },
  searchButton: {
    position: 'absolute',
    right: 20, 
    alignContent: 'center',
    top: -10, 
  },
  centeredTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textXemThem:{
    color: '#5a9223',

  }
});

export default ListMonScreen;