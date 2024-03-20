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
  const { tenMon, tenLM, giaTien, hinhAnh, trangThai, danhGia } = route.params as DetailProps;
  console.log(giaTien);
  
  const handleEditMon = (param1: string, param2: string) => {
    navigation.navigate('EditMonScreen', { param1: param1, param2: param2 });
  };
  const handleEvaluateScreen = (param1: string, param2: string) => {
    navigation.navigate('EvaluateScreen', { param1: param1, param2: param2 });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {/* <Image source={{ uri: hinhAnh }} style={styles.image} /> */}
      </View>
       <View style={styles.infoContainer}>
          <Text style={styles.name}>Tên món: {tenMon}</Text>
          <Text style={styles.stypeMon}>Loại món: {tenLM}</Text>
          <Text style={styles.price}>Giá tiền: {giaTien}đ</Text>
         <View style={styles.ratingContainer}>
          <Text style={styles.details}>Đánh giá: {danhGia}</Text>
          <FontAwesomeIcon icon={faStar} size={24} color="#feb800" style={styles.icon} />
         </View>
         <Text style={styles.status}>Trạng thái: {trangThai}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          type="primary"
          text="Sửa thông tin"
          textStyles={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          onPress={handleEditMon}
        />
        <ButtonComponent
          type="primary"
          text="Đánh giá"
          textStyles={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          onPress={handleEvaluateScreen}

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
});

export default DetailMonScreen;