import React, {useState} from 'react';
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

const ListNhanVienScreen: React.FC<NavProps> = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const items = [
    {label: 'Item 1', value: 'item1'},
    {label: 'Item 2', value: 'item2'},
    {label: 'Item 3', value: 'item3'},
  ];
  const data: NhanVien[] = [
    {
      id: '2',
      tenNV: 'Nguyễn Huy hoàng',
      phanQuyen: 0,
      hinhAnh:
        'data:image/png;base64,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',
      trangThai: true,
    },
    {
      id: '3',
      tenNV: 'Nguyễn Huy hoàng',
      phanQuyen: 1,
      hinhAnh:
        'data:image/png;base64,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',
      trangThai: true,
    },
    {
      id: '4',
      tenNV: 'Nguyễn Huy hoàng',
      phanQuyen: 1,
      hinhAnh:
        'data:image/png;base64,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',
      trangThai: true,
    },
    {
      id: '5',
      tenNV: 'Nguyễn Huy hoàng',
      phanQuyen: 0,
      hinhAnh:
        'data:image/png;base64,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',
      trangThai: true,
    },
    {
      id: '7',
      tenNV: 'Nguyễn Huy hoàng',
      phanQuyen: 1,
      hinhAnh:
        'data:image/png;base64,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',
      trangThai: true,
    },
    {
      id: '8',
      tenNV: 'Nguyễn Huy hoàng',
      phanQuyen: 1,
      hinhAnh:
        'data:image/png;base64,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',
      trangThai: true,
    },
    {
      id: '9',
      tenNV: 'Nguyễn Huy hoàng',
      phanQuyen: 1,
      hinhAnh:
        'data:image/png;base64,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',
      trangThai: true,
    },
  ];

    
 const handleSelectItem = (item:any) => {
  console.log("Selected item label: ", item.label);
};



  const renderItem = ({item}: {item: NhanVien}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.hinhAnh}} style={{width: 65, height: 65}} />
        <View style={{paddingHorizontal: 10}}>
          <Text style = {{fontWeight: 'bold', color: 'black'}}>{item.tenNV}</Text>
          <Text style = {{color: 'black'}}>
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
          placeholder="Nhập tên món"
          iconRight={faMagnifyingGlass}
          stylesEdit={{backgroundColor: 'white'}}
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
            items={items} // Danh sách các mục
            defaultValue="item1" // Giá trị mặc định
            containerStyle={{width: wp(55), borderRadius: 100}}
            onChangeItem={handleSelectItem}
            placeholder="Chức vụ"
            />
          <DropDownComponent
            label="Select Item" // Nhãn cho DropDownComponent
            value={selectedItem} // Giá trị được chọn
            items={items} // Danh sách các mục
            defaultValue="item1"
            containerStyle={{width: wp(35)}}
            placeholder='Trạng thái'
            onChangeItem={item => handleSelectItem(item)}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <FlatList
          data={data} // Danh sách dữ liệu
          renderItem={renderItem} // Hàm render cho mỗi phần tử
          keyExtractor={item => item.id || ''} // Hàm để xác định key của mỗi phần tử
        />
        <FloatButtonComponent
          icon={faAdd}
          size={25}
          stylesNew={{alignSelf: 'flex-end', position: 'absolute'}}
          onPress={() => navigation.navigate('AddNhanVienBanScreen')}
        />
      </View>
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
