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

const titles = ['Tất cả', 'Tráng miệng', 'Đồ chiên', 'Đồ nấu', 'Đồ uống']; // Add your titles here


const ListMonScreen: React.FC<NavProps> = ({ navigation }) =>  {

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<Mon[]>([]);
  const [dataNew, setDataNew] = useState<Mon[]>([]);
  const [position, setPosition] = useState<any>();
  const [text, setText] = useState('Xem thêm');
  const [showAlert, setShowAlert] = useState(false);

  const [msg, setMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPosition = [
    {label: '1000', value: 0},
    {label: '2000', value: 1},
    {label: '3000', value: 2},
    {label: '5000', value: 3},
    {label: '20000', value: 4},
  ];
  const itemsStatus = [
    {label: 'Hoạt động', value: 1},
    {label: 'Khóa', value: 0},
  ];
  

  const acstionSearch = (item: string) => {
    getListMon(item, '', '', '');
  };
  const handleDetail = ( item: Mon ) => {
    navigation.navigate("DetailMonScreen", { item });
  };

  const handleSelectItemPosition = (item: any) => {
    const giaTienMin = item.value * 1000;

    // Calculate the maximum price to the end of the range
    let giaTienMax;
    if (item.value < itemsPosition.length - 1) {
      giaTienMax = (item.value + 1) * 1000 - 1; // Subtract 1 to stay within the current range
    } else {
      // If it's the last item, set the maximum price to infinity or any other maximum value
      giaTienMax = Number.MAX_SAFE_INTEGER; // Or any other suitable maximum value
    }
    getListMon('', giaTienMin, giaTienMax, '');
  };
  const handleSelectItemStatus = (item: any) => {
    console.log('Selected item label: ', item.value);
    getListMon('', '', '', item.value );
  };

  const handelGetAll = () => {
    getListMon('', '', '', '');
  };
  const getPosison = async () => {
    const storedData = await getData();
    console.log(storedData);
    const storedPosison = storedData?.position;

    setPosition(storedPosison);
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
        `/nhanvien/mon?tenMon=${tenMon}&giaTienMin=${giaTienMin}&giaTienMax=${giaTienMax}&trangThai=${trangThai}`,
        'get',
      )
      if (res.success === true) {
        if (res.list.length !== 0 ) {
          setData(res.list);
        } else if (res.list.length !== 0 ) {
          setData(prevData => {
            const newData = res.list.filter(
              (item: {_id: string | undefined}) =>
                !prevData.find(oldItem => oldItem._id === item._id),
            );
            return [...prevData, ...newData];
          });
        } else {
          setText('Hết dữ liệu');
          setMsg('Đã đến cuói danh sách');
        }
      } else {
        // Xử lý khi có lỗi từ API
        setMsg('Request failed. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
    } finally {
      setLoading(false);
    }
  
}
  const handleGetAll = async () => {
    try {
      setLoading(true);
      await getListMon('', '', '', '');
    } catch (error) {
      console.error('Error loading next page:', error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    // Update the document title using the browser API
    getListMon('', '', '', 2);
    getPosison();

  }, []); 

  // const renderTitleItem = ({ item }: { item: string }) => (
  //   <View style={styles.titleItemContainer}>
  //     <Text>{item}</Text>
  //   </View>
  // );

  const renderItem = ({ item }: { item: Mon }) => {  
    return (

      <TouchableOpacity onPress={() => handleDetail(item)}>
      <View style={styles.item}>
          <Image
            source={
            (!item.hinhAnh || item.hinhAnh === "N/A") ?
              require('./../../assest/default-image.jpg') :
              { uri: item.hinhAnh }}
            style={{ width: 65, height: 65 }}
            defaultSource={require('./../../assest/default-avatar.jpg')}
          />  
          <View style={{paddingHorizontal: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Tên món: {item.tenMon}</Text>
          <Text style={{fontSize: 16}}>Loại món: {item.tenLM}</Text>
          <Text style={{fontSize: 16}}>Gía tiền: {item.giaTien}đ</Text>
          <Text style={[{fontSize: 16}, {color: item.trangThai ? 'green' : 'red'}]}>
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
            keyExtractor={item => item._id || ''}
            // onScroll={() => { setScroll(true), setLastList(false) }} // Khi cuộn, đánh dấu là đã cuộn
            // onEndReached={() => { setLastList(true), setScroll(false) }} // Kích hoạt khi đạt đến cuối danh sách
            // onEndReachedThreshold={.1}
            ListFooterComponent={() => (
              <View style={{alignItems: 'center', paddingVertical: 10}}>
                {/* {lastList === true && scroll !== true ? ( */}
                <TouchableOpacity onPress={handleGetAll}>
                  <Text style={{fontSize: 14}}>{text}</Text>
                </TouchableOpacity>
                {/* ) : null} */}
              </View>
            )}
          />
        )}
        
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
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
 
});

export default ListMonScreen;