import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, TextStyle, StyleProp } from 'react-native';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { appColors } from '../constants/appColors';

interface Props {
  label?: string;
  placeholder: string;
  textColor?: string;
  borderColor?: string;
  value?: string;
  icon?: IconProp;
  iconColor?: string;
  textStyles?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
}

const EditTextComponent = (props: Props) => {
  const { label, placeholder, textColor, borderColor, value, icon, iconColor, textStyles, onChangeText } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    if (label === 'pass') {
      setShowPassword(!showPassword);
    }
  };

  return (
    <View style={[styles.container, { borderColor }]}>
      {icon && <FontAwesomeIcon icon={icon} fa-thin style={[styles.icon, { color: iconColor } as any]} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#808080"
        style={[textStyles, styles.input, { color: textColor }]}
        secureTextEntry={label === 'pass' ? !showPassword : false}  
        value={value}
        onChangeText={onChangeText}
        keyboardType={label === 'number' ? 'numeric' : 'default'}
        />
      {label === 'pass' && (
        <TouchableOpacity onPress={toggleShowPassword}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={[styles.icon, { color: iconColor } as any]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: appColors.editTextColor,
    elevation: 8, // Adjust the elevation value as needed
  },
  input: {
    borderRadius: 20,
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    backgroundColor: appColors.editTextColor,
  },
  icon: {
    paddingHorizontal: 10,
    width: 24,
    height: 24,
  },
});


export default EditTextComponent;
