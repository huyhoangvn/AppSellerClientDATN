import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { appFontSize } from '../../constants/appFontSizes';
import { Mon } from '../../models/Mon';

const DetailDatMonScreen: React.FC<NavProps> = ({ navigation, route } : any) =>  {
  const {dish} = route.params;
  console.log("🚀 ~ dish:", dish)
  

  const renderItem = ({item}: {item: Mon}) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Image
          source={
            (!item?.hinhAnh || item?.hinhAnh === "N/A") ?
              require('./../../assest/default-avatar.jpg') :
              { uri: item?.hinhAnh }}
            style={{ width: 65, height: 65 }}
            defaultSource={require('./../../assest/default-avatar.jpg')}
          />
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {item?.tenMon}
            </Text>
            <Text style={{color: 'black'}}>
              Giá bán: {  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.giaTien ?? 0)}
            </Text>
            <Text style={{color: item.trangThai ? 'green' : 'red'}}>
              Số lượng: {item?.soLuong}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <View style = {styles.header}>
      <Text style = {{color: 'black', fontWeight: 'bold', fontSize: appFontSize.normal}}>Số món đặt (5)</Text>
      </View>
      <View style = {styles.main}>
      <FlatList
            data={dish}
            renderItem={renderItem}
            keyExtractor={item => item._id || ''}
            // onScroll={() => { setScroll(true), setLastList(false) }} // Khi cuộn, đánh dấu là đã cuộn
            // onEndReached={() => { setLastList(true), setScroll(false) }} // Kích hoạt khi đạt đến cuối danh sách
            // onEndReachedThreshold={.1}
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
    justifyContent: 'center',
    paddingLeft: 10
  },
  main: {
   flex: 23,
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

export default DetailDatMonScreen;