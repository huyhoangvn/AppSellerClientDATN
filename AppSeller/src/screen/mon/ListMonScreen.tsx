import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Button } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { Mon } from '../../models/Mon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { faMagnifyingGlass, faSearch, faAdd, } from '@fortawesome/free-solid-svg-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import EditTextComponent from '../../component/EditTextComponent';
import DropdownPicker from '../../component/drowpdown/DropdownPicker';
import authenticationAPI from '../../apis/authApi';
import ButtonComponent from '../../component/ButtonComponent';
import { TextBold } from 'iconsax-react-native';
import TextComponent from '../../component/TextComponent';
import AddMonScreen from '../../screen/mon/AddMonScreen';
import {appColors} from '../../constants/appColors';
import DropDownComponent from '../../component/DropDownComponent';
import FloatButtonComponent from '../../component/FloatButtonComponent';
import LoadingComponent from '../../component/LoadingComponent';

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

// const data: ListItem[] = [
//   { id: '1', tenMon: 'Gà rán FIVESTAR - 422 Cát Quế', tenLM:"Đồ chiên", giaTien: 59000, hinhAnh: 'https://cdn.tgdd.vn/Files/2017/03/22/963765/cach-lam-ga-ran-thom-ngon-8_760x450.jpg', trangThai: true , title:"Tất cả"},
//   { id: '2', tenMon: 'Hamburger', tenLM:"Đồ chiên", giaTien: 60000, hinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg', trangThai: true , title:"Tất cả" },
//   { id: '3', tenMon: 'Bánh mì  - 422 Huế ', tenLM:"Đồ chiên", giaTien: 60000, hinhAnh: 'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg', trangThai: 'Hoạt động', title:"Tất cả"  },
//   { id: '4', tenMon: 'Bánh tráng trộn - 422 Cát Quế ', tenLM:"Đồ chiên",  giaTien: 60000, hinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg', trangThai: true , title:"Tất cả"  },
//   { id: '5', tenMon: 'Bánh tráng trộn - 422 Cát Quế ', tenLM:"Đồ chiên", giaTien: 60000, hinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg', trangThai: true , title:"Tất cả"  },
//   { id: '6', tenMon: 'Bánh tráng trộn - 422 Cát Quế ', tenLM:"Đồ chiên", giaTien: 60000, hinhAnh: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551783604684-AE2UE7DYUGV96DUT4G80/chup-anh-thuc-an-1.jpg', trangThai: true , title:"Tất cả"  },
// ];

const ListMonScreen: React.FC<NavProps> = ({ navigation }) =>  {

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Mon[]>([]);
  const [position, setPosition] = useState<any>();

  const itemsPosition = [
    {label: '1000', value: 0},
    {label: '2000', value: 1},
    {label: '3000', value: 2},
  ];
  const itemsStatus = [
    {label: 'Hoạt động', value: true},
    {label: 'Không hoạt động', value: false},
  ];
  
  const handleAddMon = (param1: string, param2: string) => {
    navigation.navigate("AddMonScreen", { param1: param1, param2: param2 });
  };
  const acstionSearch = (item: string) => {
    getListMon(item, '', '', '');
  };
  const handleDetail = ( item: ListItem ) => {
    navigation.navigate("DetailMonScreen", { item });
  };

  const handleSelectItemPosition = (item: any) => {
    console.log('Selected item label: ', item.value);
    getListMon('', item.value, '', '');
  };
  const handleSelectItemStatus = (item: any) => {
    console.log('Selected item label: ', item.value);
    getListMon('', '', item.value, '');
  };

  const handelGetAll = () => {
    getListMon('', '', '', '');
  };

  const getListMon = async (
  tenMon: any,
  giaTienMin: any,
  giaTienMax: any,
  trangThai: any,
  ) => {
   
    setLoading(true);

    try {
      const res = await authenticationAPI.HandleAuthentication (
        `/nhanvien/mon?tenMon=${tenMon}&trangThai=${trangThai}&giaTienMin=${giaTienMin}$giaTienMax=${giaTienMax}`,
        'get',
      )
      console.log(res.list);
      setData(res.list)
      // setData(res.list.KetQuaLoaiMon);
      if (res.success === true) {
        if (res.index.length !== 0) {
          setData(res.index);
        } else {
          setData([]);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  
}

 
  useEffect(() => {
    // Update the document title using the browser API
    getListMon('', '', '', 2);
  }, []); 

  // const renderTitleItem = ({ item }: { item: string }) => (
  //   <View style={styles.titleItemContainer}>
  //     <Text>{item}</Text>
  //   </View>
  // );

  const renderItem = ({ item }: { item: ListItem }) => {  
    return (

    <TouchableOpacity onPress={() => handleDetail(item)}>
    <View style={styles.itemContainer}>
        <Image source={{ uri: item.hinhAnh }} style={styles.image} 
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Tên món: {item.tenMon}</Text>
          <Text style={styles.type}>Loại món: {item.tenLM}</Text>
          <Text style={styles.price}>Gía tiền: {item.giaTien}đ</Text>
          <Text style={{color: item.trangThai ? 'green' : 'red'}}>
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
          placeholder="Nhập tên nhân viên"
          iconRight={faMagnifyingGlass}
          stylesEdit={{backgroundColor: 'white'}}
          onChangeText={(text: string) => acstionSearch(text)}
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
            label="Select Item" // Nhãn cho DropDownComponent
            value={selectedItem} // Giá trị được chọn
            items={itemsPosition.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            defaultValue="item1" // Giá trị mặc định
            containerStyle={{width: wp(55), borderRadius: 100}}
            onChangeItem={item => handleSelectItemPosition(item)}
            placeholder="Khoảng giá tiền"
          />
          <DropDownComponent
            label="Select Item" // Nhãn cho DropDownComponent
            value={selectedItem} // Giá trị được chọn
            items={itemsStatus.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            defaultValue="item1"
            containerStyle={{width: wp(35)}}
            placeholder="Trạng thái"
            onChangeItem={item => handleSelectItemStatus(item)}
          />
        </View>
     </View>
     
      
      {/* <FlatList
        data={titles}
        renderItem={renderTitleItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        /> */}
 
  
  <View style={styles.footer}>
        {data.length === 0 ? (
          <Text style={{textAlign: 'center', fontSize: 20}}>
            không tìm thấy nhân viên
          </Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id || ''}></FlatList>
        )}
        <TouchableOpacity
          style={{position: 'absolute', alignSelf: 'center'}}
          onPress={handelGetAll}>
          {data.length <= 2 && data.length !== 0 ? (
            <Text>xem thêm</Text>
          ) : (
            <Text></Text>
          )}
        </TouchableOpacity>
        {position === 0 ? (
          <FloatButtonComponent
            icon={faAdd}
            size={25}
            stylesNew={{alignSelf: 'flex-end', position: 'absolute'}}
            onPress={() => navigation.navigate('AddNhanVienBanScreen')}
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

  main: {
    height: hp(18),
    justifyContent: 'space-between',
  },
  footer: {
    justifyContent: 'center',
    height: hp(65),
    padding: 10,
  },
  viewDropDow: {
    padding: 10,
    flexDirection: 'row',
    width: wp(100),
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
 
});

export default ListMonScreen;