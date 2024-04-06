import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import NavProps from '../../models/props/NavProps';
import {faAdd} from '@fortawesome/free-solid-svg-icons';

import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EditTextComponent from '../../component/EditTextComponent';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {appColors} from '../../constants/appColors';
import DropDownComponent from '../../component/DropDownComponent';
import FloatButtonComponent from '../../component/FloatButtonComponent';
import {NhanVien} from '../../models/NhanVien';
import authenticationAPI from '../../apis/authApi';
import {getData} from '../../utils/storageUtils';
import LoadingComponent from '../../component/LoadingComponent';
import {useFocusEffect} from '@react-navigation/native';
import AlertComponent from '../../component/AlertComponent';

const ListNhanVienScreen: React.FC<NavProps> = ({navigation}) => {
  // const [lastList, setLastList] = useState(false);
  // const [scroll, setScroll] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NhanVien[]>([]);
  const [dataNew, setDataNew] = useState<NhanVien[]>([]);
  const [position, setPosition] = useState<any>();
  const [text, setText] = useState('Xem thêm');
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('');
  const [phanQuyen, setPhanQuyen] = useState('');
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);

  

  const itemsPosition = [
    {label: 'Tất cả', value: ''},
    {label: 'Quản lý', value: 0},
    {label: 'Nhân viên', value: 1},
  ];
  const itemsStatus = [
    {label: 'Tất cả', value: ''},
    {label: 'Hoạt động', value: true},
    {label: 'Không hoạt động', value: false},
  ];

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSelectItemPosition = async (item: any) => {
    await getListUser(name, item.value, status, page);
  };
  const handleSelectItemStatus = async (item: any) => {
    await getListUser(name, phanQuyen, item.value, page);
  };

  const actionSearch = async (item: string) => {
    await getListUser(item, phanQuyen, status, page);
  };
  const getPosison = async () => {
    const storedData = await getData();
    const storedPosison = storedData?.position;
    setPosition(storedPosison);
  };
  const handelDetail = (item: any) => {
    navigation.navigate('DetailNhanVienScreen', {
      idUser: item._id,
      position: position,
    });
  };

  const handleGetAll = async () => {
    getListUser(name, phanQuyen, status, page + 1);
  };

  


  const getListUser = async (
    name?: any,
    phanQuyen?: any,
    trangThai?: any,
    page?: any,
  ) => {

    try {
      setLoading(true); // Set loading to true before making the API call

      const res: any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/nhanvienquanly?tenNV=${name}&phanQuyen=${phanQuyen}&trangThai=${trangThai}&page=${page}`,
          'get',
      );

      if (res.success === false) {
        if (!res.list) {
          return;
        }
        return;
      }

      if (page === 1) {
        setData([...res.index]);
      } else {
        setData(prevListHienThi => [...prevListHienThi, ...res.index]);
      }
      if (res.index.length > 0) {
        setPage(page);
        setText(res.index.length === 10 ? 'Xem Thêm' : 'Hết');
      } else {
        setText('Hết');
      }
      setStatus(trangThai);
      setPhanQuyen(phanQuyen);
      setName(name);
    } catch (error) {
      setMsg('Lỗi kết nối');
      handleShowAlert();
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    getListUser('', '', '', 1);
    getPosison();
    // setRememberedChecked(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getListUser('', '', '', 1);
      return () => {
        // Cleanup logic nếu cần (không bắt buộc)
      };
    }, []),
  );

  



  const renderItem = ({item}: {item: NhanVien}) => {
    return (
      <TouchableOpacity onPress={() => handelDetail(item)}>
        <View style={styles.item}>
          <Image
          source={
            (!item.hinhAnh || item.hinhAnh === "N/A") ?
              require('./../../assest/default-avatar.jpg') :
              { uri: item.hinhAnh }}
            style={{ width: 65, height: 65 }}
            defaultSource={require('./../../assest/default-avatar.jpg')}
          />
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {item.tenNV}
            </Text>
            <Text style={{color: 'black'}}>
              Chức vụ: {item.phanQuyen === 0 ? 'Quản lý' : 'Nhân viên'}{' '}
            </Text>
            <Text style={{color: item.trangThai ? 'green' : 'red'}}>
              {item.trangThai ? 'Hoạt động' : 'Không hoạt động'}
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
          onChangeText={(text: string) => actionSearch(text)}
          stylesContainer={{
            backgroundColor: appColors.white,
            borderColor: 'black',
            borderWidth: 1.5,
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
            containerStyle={{width: wp(55), borderRadius: 100}}
            onChangeItem={item => {
              handleSelectItemPosition(item);
            }}
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
            onChangeItem={item => {
              handleSelectItemStatus(item)
            }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        {data.length === 0 ? (
          <View>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              không tìm thấy nhân viên
            </Text>
            <TouchableOpacity onPress={() => {getListUser('', '', '', 1),setPage(1)}}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  color: appColors.primary,
                  textDecorationLine: 'underline',
                }}>
                Trở lại
              </Text>
            </TouchableOpacity>
          </View>
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
            onPress={() => navigation.navigate('AddNhanVienBanScreen')}
          />
        ) : null}
      </View>
      <LoadingComponent visible={loading} />
      <AlertComponent
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
      />
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
    justifyContent: 'space-between',
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
  },
});

export default ListNhanVienScreen;
