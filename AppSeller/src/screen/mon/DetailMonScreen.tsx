import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../../component/ButtonComponent';
import authenticationAPI from '../../apis/authApi';

interface DetailProps {
  id: string;
  tenMon: string;
  tenLM: string;
  giaTien: number;
  hinhAnh: string;
  trangThai: boolean;
  danhGia: string;
}

const DetailMonScreen: React.FC<NavProps> = ({ navigation }) => {
  const route = useRoute();
  const { tenMon, tenLM, giaTien, hinhAnh, trangThai, danhGia } = route.params.item as Detai ;
  
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
         <Image source={{ uri: hinhAnh }} style={styles.image} />
      </View>
       <View style={styles.infoContainer}>
       <View style = {styles.viewText}>
          <Text>Tên món</Text>
          <Text style = {styles.textPrimary}>{tenMon}</Text>
        </View>
        <View style = {styles.viewText}>
          <Text>Loại món</Text>
          <Text style = {styles.textPrimary}>{tenLM}</Text>
        </View>
        <View style = {styles.viewText}>
          <Text>Giá tiền</Text>
          <Text style = {styles.textPrimary}>{giaTien}</Text>
        </View>
        <View style = {styles.viewText}>
          <Text>Đánh giá</Text>
          <Text style = {styles.textPrimary}>{danhGia}</Text>
          <FontAwesomeIcon icon={faStar} size={24} color="#feb800" style={styles.icon} />
        </View>
        <View style = {styles.viewText}>
        <Text> Trạng thái </Text>
          <Text style = {[styles.textPrimary,trangThai ? styles.activeStatus : styles.inactiveStatus ]}>{trangThai? 'Hoạt động' : 'Khóa'}</Text>
        </View> 
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          type="primary"
          text="Sửa thông tin"
          textStyles={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('EditMonScreen')}
        />
        <ButtonComponent
          type="primary"
          text="Đánh giá"
          textStyles={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('AddMonScreen')}

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
    
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
    color: 'gray',
    borderBottomWidth: 0.2,
    padding: 10,
  },
  stypeMon: {
    fontSize: 18,
    marginBottom: 5,
    color: 'gray',
    borderBottomWidth: 0.2,
    padding: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 5,
    color: 'gray',
    borderBottomWidth: 0.2,
    padding: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 5,
    color: 'gray',
    borderBottomWidth: 0.2,
    padding: 10,
  },
  details: {
    fontSize: 18,
    marginBottom: 5,
    color: 'gray',
    padding: 10,
  },
  viewText: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  textPrimary: {
    color: 'black',
    fontWeight:'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
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