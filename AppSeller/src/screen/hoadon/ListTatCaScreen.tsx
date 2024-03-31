import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import NavProps from '../../models/props/NavProps';
import EditTextComponent from '../../component/EditTextComponent';
import {
  faCalendarDays,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {appColors} from '../../constants/appColors';
import DropDownComponent from '../../component/DropDownComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { text } from '@fortawesome/fontawesome-svg-core';
import { NhanVien } from '../../models/NhanVien';
import { HoaDon } from '../../models/HoaDon';
import authenticationAPI from '../../apis/authApi';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import { getData } from '../../utils/storageUtils';
const ListTatCaScreen: React.FC<NavProps> = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [text, setText] = useState('Xem thêm');
  const [data, setData] = useState<HoaDon[]>([]);
  const [dataNew, setDataNew] = useState<HoaDon[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [page, setPage] = useState(1);
  const [purchase, setPurchase] = useState('');
  const [payment, setPayment] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [position, setPosition] = useState<any>();

  
  const statusPurchase = [
    {label: 'Tất cả', value: ''},
    {label: 'Chờ duyệt', value: 0},
    {label: 'Đang chuẩn bị', value: 1},
    {label: 'Đang giao hàng', value: 2},
    {label: 'Giao hàng thành công', value: 3},
    {label: 'Giao hàng thất bại', value: 4},
  ];

  const statusPayment = [
    {label: 'Tất cả', value: ''},
    {label: 'Chưa thanh toán', value: 0},
    {label: 'Đã thanh toán', value: 1},
  ];
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

  const handleSelectItemPurchase =  async (item: any) => {
    await getListInvoice(code,date,item.value,payment,page);
  };
  const handleSelectItemPayment = async (item: any) => {
    await getListInvoice(code,date,purchase,item.value,page);

    // await getListInvoice(page,code,item.value,payment);
  };
  const actionSearch = async (item: string) => {
    await getListInvoice(item,date,purchase,payment,page);

  };

  const searchDate =  (item: Date | string) => {
     setSelectedDate(item as Date);
  }

  const handleDateSelected = async (date: Date | string) => {
    setSelectedDate(date as Date);

    await getListInvoice(code,date,purchase,payment,page);

  };


  const handelDetail = (item: any) => {
    navigation.navigate('DetailHoaDonScreen', {
      id: item._id,
    });
  };

  const handleGetAll = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1; // Tăng giá trị của currentPage lên 1
      await getListInvoice(code,date,purchase,payment,nextPage);
    } catch (error) {
      console.error('Error loading next page:', error);
    } finally {
      setLoading(false);
    }
  };



  const getListInvoice = async (
    code?: any,
    date?: any,
    purchaseStatus?: any,
    paymentStatus?: any,
    page?: any,
  ) => {
    try {
      setLoading(true);
      const res = await authenticationAPI.HandleAuthentication(
        `/nhanvien/hoaDon?maHD=${code}&thoiGianTao=${date}&trangThaiMua=${purchaseStatus}&trangThaiThanhToan=${paymentStatus}&trang=${page}`,
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
      setDate(date)
      setPurchase(purchaseStatus);
      setPayment(paymentStatus);
      setPage(page);
   
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };




  

  useEffect(() => {
    getListInvoice('','','', '',page);
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
              Tổng tiền: {parseInt(item.tongTien || '').toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {/* {item.trangThaiMua === 1 ? "ok" : "Chưa mua"} */}
              Trạng thái mua: {getStatusText(item.trangThaiMua ?? 0)}
            </Text>
            <Text style = {{fontWeight: 'bold', color: 'black'}}>
              Thanh toán: 
            {item.trangThaiThanhToan === 0 ? (
              <Text style={{ color: 'red' }}> Chưa thanh toán</Text>
            ) : (
              <Text style={{ color: 'green' }}> Đã thanh toán</Text>
            )}
          </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
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
            elevation: 0,
          }}
          iconColor={appColors.primary}
        />

        <EditTextComponent
          label="date"
          placeholder="Chọn ngày"
          value={selectedDate ? selectedDate.toString() : ''} // Convert 
          stylesEdit={{backgroundColor: 'white'}}
          onChangeText={(text: string) => searchDate(text)}
          stylesContainer={{
            backgroundColor: appColors.white,
            borderColor: 'black',
            borderWidth: 1.5,
            elevation: 0,
          }}
          onDateSelected={(item) =>handleDateSelected(item)}
          iconColor={appColors.primary}
        />

        <View style={styles.viewDropDow}>
          <DropDownComponent
            label="Select Item" // Nhãn cho DropDownComponent
            value={selectedItem} // Giá trị được chọn
            items={statusPurchase.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            containerStyle={{width: wp(55), borderRadius: 100}}
            onChangeItem={item => {
              handleSelectItemPurchase(item);
            }}
            placeholder="Trạng thanh toán"
          />
          <DropDownComponent
            label="Select Item" // Nhãn cho DropDownComponent
            value={selectedItem} // Giá trị được chọn
            items={statusPayment.map(item => ({
              label: item.label,
              value: item.value.toString(),
            }))} // Danh sách các mục
            defaultValue="item1"
            containerStyle={{width: wp(35)}}
            placeholder="Trạng thái thanh toán"
            onChangeItem={item => {
              handleSelectItemPayment(item);
            }}
          />
        </View>
      </View>
      <View style={styles.main}>
        {data.length === 0 ? (
          <View>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              không tìm thấy nhân viên
            </Text>
            <TouchableOpacity 
            onPress={async () => {await getListInvoice('','','','',1) , setPage(1)}}
            >
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
                <TouchableOpacity 
                onPress={handleGetAll}
                  >
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
  },
  main: {
    flex: 2,
  },
  viewDropDow: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    marginHorizontal: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
});

export default ListTatCaScreen;
