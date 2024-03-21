import React, {useState} from 'react';
import { View, Text, StyleSheet,Image, TextInput , TouchableOpacity } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { useRoute } from '@react-navigation/native'; // Importing useRoute hook
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faUser, faCake, faCoins, faVectorSquare } from '@fortawesome/free-solid-svg-icons'; // Change to faUser for user icon
import EditTextComponent from '../../component/EditTextComponent';
import ButtonComponent from '../../component/ButtonComponent';

import CheckBox from 'expo-checkbox';
import DropdownPicker from '../../component/drowpdown/DropdownPicker';
const EditMonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const route = useRoute(); // Using useRoute hook to get route object
 
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  return (
    <View style={styles.container}>
      {/* <Image
        style={[styles.userLogo]} 
        source={require('../../assest/logo.png')}
      /> */}
      <View style={styles.inputContainer}>
        <EditTextComponent
          label="text"
          placeholder="Tên món"
          iconColor="gray"
          icon={faCake}
          />
          

          <DropdownPicker
            label="Đồ chiên"
            iconColor="gray"
            icon={faVectorSquare}
          />

          <EditTextComponent
            label="text"
            placeholder="20.000"
            iconColor="gray"
            icon={faCoins}
          />
      </View>

    <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Trạng thái</Text>
     <View style={styles.checkbox}>
         <CheckBox
          disabled={false}
          value={toggleCheckBox1}
          onValueChange={(newValue) => setToggleCheckBox1(newValue)} 
          />
       <Text style={styles.checkboxText}>Hoạt động</Text>
      </View>
     <View style={styles.checkbox}>
          <CheckBox
           disabled={false}
           value={toggleCheckBox2}
           onValueChange={(newValue) => setToggleCheckBox2(newValue)} 
           />
      <Text style={styles.checkboxText}>Khóa</Text>
   </View>
  </View>

      <View style={styles.buttonContainer}>

        <ButtonComponent
         type="primary"
         text="Sửa thông tin"
         textStyles={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
        />

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  userLogo: {
    width: 150,
    height: 150,
    borderRadius: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
    
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  checkboxText: {
    color: 'black',
    marginLeft: 5,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default EditMonScreen;