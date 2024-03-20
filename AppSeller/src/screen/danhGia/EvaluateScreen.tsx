import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import NavProps from '../../models/props/NavProps';
import TextComponent from '../../component/TextComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const EvaluateScreen: React.FC<NavProps> = ({ navigation }) =>  {
    interface ListItem {
        id: string;
        tenNV: string;
        danhGia: number;
        thoiGianTao: String;
        hinhAnh: string;
        trangThai: boolean;
      };
      const data: ListItem[] = [
        { id: '1', tenNV: 'NGuyễn huy hoàng', danhGia: 4, thoiGianTao: '18-02-2024 08:30', hinhAnh: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-120.jpg', trangThai: false},
        { id: '2', tenNV: 'NGuyễn huy hoàng', danhGia: 4, thoiGianTao: '18-02-2024 08:30', hinhAnh: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-120.jpg', trangThai: false},
        { id: '3', tenNV: 'NGuyễn huy hoàng', danhGia: 4, thoiGianTao: '18-02-2024 08:30', hinhAnh: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-120.jpg', trangThai: false},
        { id: '4', tenNV: 'NGuyễn huy hoàng', danhGia: 4, thoiGianTao: '18-02-2024 08:30', hinhAnh: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-120.jpg', trangThai: false},
      ];

      const handleEvaluate = ( item: ListItem ) => {
        navigation.navigate("EvaluateScreen", { item });
      };
      const renderItem = ({ item }: { item: ListItem }) => (   
        <TouchableOpacity onPress={() => handleEvaluate(item)}>
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.hinhAnh }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}> {item.tenNV}</Text>
              <Text style={styles.type}>{item.thoiGianTao}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.price}> {item.danhGia}</Text>
              <FontAwesomeIcon icon={faStar} size={24} color="#feb800" style={styles.icon} />
            </View>
                  
           </View>
          </View>
        </TouchableOpacity>
      );
  return (
    <View style={styles.container}>
     <ScrollView>

     <View style={styles.containerHeader}>
        <TextComponent 
         text='Gà rán FIVESTAR'
         color='#000000'
         size={19}
        />
      
        <TextComponent 
        text='Số đánh giá (4) '
        size={18}
        />
           
     </View>
     <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
        // refreshing={loading}
        // onRefresh={handleMon}
      />
      <View style={styles.centeredTextContainer}>
        <TouchableOpacity>
          <TextComponent 
          text='Xem thêm ...'
          styles={styles.textXemThem}
          size={18}
          />
        </TouchableOpacity>
       
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      containerHeader:{ 
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
        position: 'relative', // Add this line to make positioning easier
        marginHorizontal: 10,

      },
      textContainer:{
       flexDirection: 'row',
      },
      itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop: 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
      },
      image: {
        width: '30%',
        aspectRatio: 1, 
        marginRight: 10,
        borderRadius: 20,
      },
      infoContainer: {
        width: '70%',
      },
      name: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
      },
      price: {
        fontSize: 16,
        color: '#000000',
      },
      type: {
        fontSize: 16,
        color: 'gray',
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
     
      centeredTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 5,
      },
      textXemThem:{
        color: '#5a9223',
      },
      icon:{
        left: 10,
      }
});

export default EvaluateScreen;