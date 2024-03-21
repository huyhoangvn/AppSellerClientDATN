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
import {NhanVien} from '../../models/NhanVien';
import authenticationAPI from '../../apis/authApi';
import {getData} from '../../utils/storageUtils';
import TabComponent from '../../component/TabComponent';
import LoadingComponent from '../../component/LoadingComponent';

const ListNhanVienScreen: React.FC<NavProps> = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NhanVien[]>([]);
  const [position, setPosition] = useState<any>();
  const itemsPosition = [
    {label: 'Quản lý', value: 0},
    {label: 'Nhân viên', value: 1},
  ];
  const itemsStatus = [
    {label: 'Hoạt động', value: true},
    {label: 'Không hoạt động', value: false},
  ];

  const handleSelectItemPosition = (item: any) => {
    console.log('Selected item label: ', item.value);
    getListUser('', item.value, '', '');
  };
  const handleSelectItemStatus = (item: any) => {
    console.log('Selected item label: ', item.value);
    getListUser('', '', item.value, '');
  };

  const acstionSearch = (item: string) => {
    getListUser(item, '', '', '');
  };

  const handelGetAll = () => {
    getListUser('', '', '', '');
  };

  const getPosison = async () => {
    const storedData = await getData();
    console.log(storedData);
    const storedPosison = storedData?.position;

    setPosition(storedPosison);
  };

  console.log(position);

  const getListUser = async (
    name: any,
    phanQuyen: any,
    trangThai: any,
    limit: any,
  ) => {
    try {
      setLoading(true);
      const res = await authenticationAPI.HandleAuthentication(
        `/nhanvien/nhanvienquanly?tenNV=${name}&phanQuyen=${phanQuyen}&trangThai=${trangThai}&limit=${limit}`,
        'get',
      );

      if (res.success === true) {
        if (res.index.length !== 0) {
          setData(res.index);
        } else {
          setData([]);
        }
      } else {
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListUser('', '', '', 2);
    getPosison();
    // setRememberedChecked(true);
  }, []);

  const renderItem = ({item}: {item: NhanVien}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.hinhAnh}} style={{width: 65, height: 65}} />
        <View style={{paddingHorizontal: 10}}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>{item.tenNV}</Text>
          <Text style={{color: 'black'}}>
            Chức vụ: {item.phanQuyen === 0 ? 'Quản lý' : 'Nhân viên'}{' '}
          </Text>
          <Text style={{color: item.trangThai ? 'green' : 'red'}}>
            {item.trangThai ? 'Hoạt động' : 'Không hoạt động'}
          </Text>
        </View>
      </View>
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
            placeholder="Chức vụ"
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
    height: hp(100),
    backgroundColor: appColors.white,
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

export default ListNhanVienScreen;
