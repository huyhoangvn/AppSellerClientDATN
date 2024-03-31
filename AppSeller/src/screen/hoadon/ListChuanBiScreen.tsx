import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import NavProps from '../../models/props/NavProps';
import EditTextComponent from '../../component/EditTextComponent';
import {
  faCalendarDays,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {appColors} from '../../constants/appColors';
import {HoaDon} from '../../models/HoaDon';
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
const ListChuanBiScreen: React.FC<NavProps> = ({navigation}) => {
  const [text, setText] = useState('Xem thêm');
  const [data, setData] = useState<HoaDon[]>([]);
  const [dataNew, setDataNew] = useState<HoaDon[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [page, setPage] = useState(1);
  const [purchase, setPurchase] = useState(1);
  const [code, setCode] = useState('');

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return 'Chờ duyệt';
      case 1:
        return 'Đang chuẩn bị';
      case 2:
        return 'Đang giao hàng';
      case 3:
        return 'Giao hàng thành công';
      case 4:
        return 'Giao hàng thất bại';
      default:
        return 'Trạng thái không xác định';
    }
  };
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const actionSearch = async (item: string) => {
    getListInvoice(item, purchase, page);
  };

  const handelDetail = (item: any) => {
    navigation.navigate('DetailHoaDonScreen', {
      id: item._id,
    });
  };

  const getListInvoice = async (
    code?: any,
    purchaseStatus?: any,
    page?: any,
  ) => {
    try {
      const res = await authenticationAPI.HandleAuthentication(
        `/nhanvien/hoaDon?maHD=${code}&trangThaiMua=${purchaseStatus}&trang=${page}`,
        'get',
      );

      if (res.success === true) {
        if (res.list.length !== 0 && res.currentPage === 1) {
          setData(res.list);
          setDataNew([]);
        } else if (res.list.length !== 0 && res.currentPage !== 1) {
          setData(prevData => [...prevData, ...res.list]);
        } else {
          setData([]);
          // setText('Hết dữ liệu');
          // setMsg('Đã đến cuói danh sách');
          // handleShowAlert();
        }
      } else {
        // Xử lý khi có lỗi từ API
        setMsg('Request failed. Please try again.');
        handleShowAlert();
      }
      setCode(code);
      setPurchase(purchaseStatus);
      setPage(page);
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };

  const handleGetAll = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1; // Tăng giá trị của currentPage lên 1
      await getListInvoice(code, 1, nextPage);
    } catch (error) {
      console.error('Error loading next page:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListInvoice('', 1, page);
  }, []);

  const renderItem = ({item}: {item: HoaDon}) => {
    return (
      <TouchableOpacity onPress={() => handelDetail(item)}>
        <View style={styles.item}>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              MHD:{item.maHD}
            </Text>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Tổng tiền:{' '}
              {parseInt(item.tongTien || '').toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {/* {item.trangThaiMua === 1 ? "ok" : "Chưa mua"} */}
              Trạng thái mua: {getStatusText(item.trangThaiMua ?? 0)}
            </Text>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Thanh toán:
              {item.trangThaiThanhToan === 0 ? (
                <Text style={{color: 'red'}}> Chưa thanh toán</Text>
              ) : (
                <Text style={{color: 'green'}}> Đã thanh toán</Text>
              )}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Điều chỉnh vị trí của bàn phím
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <EditTextComponent
              label="iconRight"
              placeholder="Nhập mã hoá đơn"
              iconRight={faMagnifyingGlass}
              stylesEdit={{backgroundColor: 'white'}}
              onChangeText={(text: string) => actionSearch(text)}
              stylesContainer={{
                backgroundColor: appColors.white,
                borderColor: 'black',
                borderWidth: 1.5,
              }}
              iconColor={appColors.primary}
            />
          </View>
          <View style={styles.main}>
            {data.length === 0 ? (
              <View>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                  không tìm thấy nhân viên
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    getListInvoice('', 1, 1), setPage(1);
                  }}>
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
                scrollEnabled={false}
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
          </View>
          <View>
            <LoadingComponent visible={loading} />
            <AlertComponent
              visible={showAlert}
              message={msg}
              onClose={handleCloseAlert}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 7,
  },
  item: {
    marginHorizontal: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
});

export default ListChuanBiScreen;
