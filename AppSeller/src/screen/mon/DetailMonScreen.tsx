import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import NavProps from '../../models/props/NavProps';
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../../component/ButtonComponent';
import authenticationAPI from '../../apis/authApi';
import {DefaultAvatar} from '../../assest/svgs';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import {useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getData } from '../../utils/storageUtils';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
import { formatCurrency } from '../../utils/currencyFormatUtils';

const DetailMonScreen: React.FC<NavProps> = ({navigation,route} : any) => {

  const {item} = route.params;
  const [data, setData] = useState<any>();
  const [danhGia, setDanhGia] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [position, setPosition] = useState<any>();
  const getPosison = async () => {
    const storedData = await getData();
    const storedPosison = storedData?.position;
    setPosition(storedPosison);
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const getDetail = async () => {
    const reslt = await getData();
    const idMon = reslt?.idMon;
    try {
      setLoading(true);
      const res:any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/mon/${idMon}`,
        'get',
      );
      if (!res && res.success === true) {
        setData(res.index);
        setMsg(res.msg);
      } else {
        // Xử lý khi có lỗi từ API
        setMsg('Request failed. Please try again.');
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
      setMsg('Request timeout. Please try again later.');
      handleShowAlert();
    } finally {
      setLoading(false);
    }
  };
  const getDanhGiaTrungBinh = async () => {
    const reslt = await getData();
    const idMon = reslt?.idMon;
    try {
      setLoading(true);
      const res:any = await authenticationAPI.HandleAuthentication(
        `/khachhang/danhgia/get-trung-binh/${item._id}`
      );
      if (res.success === true) {
        setDanhGia(res.index);
        setMsg(res.msg);
      }
       else {
        // Xử lý khi có lỗi từ API
        setMsg(res.msg);
        handleShowAlert();
      }
    } catch (error) {
     console.log(error);
    }
  }
  useEffect(() => {
    getDetail();
    getDanhGiaTrungBinh();
    getPosison();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getDetail();    

      return () => {
        // Cleanup logic nếu cần (không bắt buộc)
      };
    }, []),
  );
 
  return (
    <View style={styles.container}>
     <View style={styles.header}>
        {item && item.hinhAnh ? (
          <Image
            style={{
              width: wp(40),
              height: hp(20),
              borderRadius: wp(20),
              overflow: 'hidden',
            }}
            source={{uri: item.hinhAnh}}
          />
        ) : (
          <DefaultAvatar />
        )}
      </View>
       <View style={styles.infoContainer}>
       <View style={styles.viewText}>
          <Text>Tên món</Text>
          <Text style={styles.textPrimary}>{item?.tenMon}</Text>
        </View>
        <View style={styles.viewText}>
          <Text>Loại món</Text>
          <Text style={styles.textPrimary}>{item?.tenLM}</Text>
        </View>
        <View style={styles.viewText}>
          <Text>Giá tiền</Text>
          <Text style={styles.textPrimary}>{formatCurrency(item?.giaTien)}</Text>
        </View>
        <View style={styles.viewText}>
          <Text>Đánh giá</Text>
          <Text style={styles.textPrimaryDanhGia}>{danhGia}</Text>
          <FontAwesomeIcon icon={faStar} size={24} color="#feb800" style={styles.icon}/>
        </View>
        <View style={styles.viewText}>
        <Text>Trạng thái</Text>
          <Text style={[styles.textPrimary, item?.trangThai ? styles.activeStatus : styles.inactiveStatus]}>{item?.trangThai? 'Hoạt động' : 'Khóa'}</Text>
        </View> 
      </View>
      <View style={styles.buttonContainer}>
      {position === 0 ? (
        <ButtonComponent
          type="primary"
          text="Sửa thông tin"
          textStyles={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          onPress={() =>  navigation.navigate('EditMonScreen', {position:position ,item:item})}
        />
      ) : null}
        <ButtonComponent
          type="primary"
          text="Đánh giá"
          textStyles={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('EvaluateScreen',{item: item})}
        />
   
      </View>
      <LoadingComponent visible={loading} />
      {/* <AlertComponent
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor:'red',
  },
  infoContainer: {
    justifyContent: 'space-between',
    height: hp(35),
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrimary: {
    color: 'black',
    fontSize: 18, // Adjust font size as needed
  },
  textPrimaryDanhGia:{
    color: 'black',
    fontSize: 18, 
    left: 120,  
  },
  icon: {
    marginRight: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  activeStatus: {
    color: 'green', // Color for 'Khóa'
  },
  inactiveStatus: {
    color: 'red', // Color for 'Hoạt động'
  },
});

export default DetailMonScreen;
