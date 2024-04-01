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

const DetailMonScreen: React.FC<NavProps> = ({navigation,route} : any) => {

  const {item, position} = route.params;
  const [data, setData] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const handleShowAlert = () => {
    setShowAlert(true);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const getDetail = async () => {
    try {
      setLoading(true);
      const res:any = await authenticationAPI.HandleAuthentication(
        `/nhanvien/mon/${item._id}`,
        'get',
      );
      if (!res && res.success === true) {
        setData(res.index);
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

  useEffect(() => {
    getDetail();
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
          <Text style={styles.textPrimary}>{item?.giaTien}</Text>
        </View>
        <View style={styles.viewText}>
          <Text>Đánh giá</Text>
          <Text style={styles.textPrimary}>{item?.danhGia}</Text>
          <FontAwesomeIcon icon={faStar} size={24} color="#feb800" style={styles.icon} />
        </View>
        <View style={styles.viewText}>
        <Text>Trạng thái</Text>
          <Text style={[styles.textPrimary, item?.trangThai ? styles.activeStatus : styles.inactiveStatus]}>{item?.trangThai? 'Hoạt động' : 'Khóa'}</Text>
        </View> 
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          type="primary"
          text="Sửa thông tin"
          textStyles={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          onPress={() =>  navigation.navigate('EditMonScreen', {position:position ,item:item})}
        />
        <ButtonComponent
          type="primary"
          text="Đánh giá"
          textStyles={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('EvaluateScreen',{item})}
        />
      </View>
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
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor:'red',
    marginTop: 10,
  },
  infoContainer: {
    justifyContent: 'flex-end', // Align content to the end (right) of the container
    flex: 1, // Occupy remaining space
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
    flex: 1, // Evenly distribute space
  },
  header: {
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrimary: {
    color: 'black',
    fontWeight:'bold',
    fontSize: 18, // Adjust font size as needed
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
