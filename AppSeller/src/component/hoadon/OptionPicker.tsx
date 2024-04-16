import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { appColors } from '../../constants/appColors';
import { appFontSize } from '../../constants/appFontSizes';
import MyButtonComponent from '../button/MyButtonComponent';

interface Option {
  key: string;
  value: string | number;
}

interface OptionPickerProps {
  onSelect: (selected: { option1: string | number; option2: string | number }) => void;
  visible: boolean;
  onClose: () => void;
  options?: Option[]; // Make options array optional
  options2?: Option[]; // Make options2 array optional
  optionalTitle?: string;
  optionalDesc?: string;
}

const OptionPicker: React.FC<OptionPickerProps> = ({
  onSelect,
  visible,
  onClose,
  options = [],
  options2 = [],
  optionalTitle,
  optionalDesc,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | number>('');
  const [selectedOption2, setSelectedOption2] = useState<string | number>('');

  // Handle option selection
  const handleOptionSelect = (value: string | number) => {
    setSelectedOption(value);
  };

  const handleOption2Select = (value: string | number) => {
    setSelectedOption2(value);
  };

  // Handle confirm button press
  const handleConfirm = () => {
    const selected = { option1: selectedOption, option2: selectedOption2 };
    onSelect(selected);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <View style={{alignItems: 'center'}}>
            {optionalTitle && <Text style={styles.instructions}>{optionalTitle}</Text>}
            {optionalDesc && <Text style={styles.text}>{optionalDesc}</Text>}
          </View>
          {options.length > 0 && (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={(itemValue) => handleOptionSelect(itemValue)}
              style={styles.picker}
            >
              {options.map((option) => (
                <Picker.Item key={option.key} label={option.key} value={option.value} />
              ))}
            </Picker>
          </View>
          )}
          {options2.length > 0 && (
            <View style={styles.pickerWrapper}>
                <Picker
                selectedValue={selectedOption2}
                onValueChange={(itemValue) => handleOption2Select(itemValue)}
                style={styles.picker}
                >
                {options2.map((option) => (
                    <Picker.Item key={option.key} label={option.key} value={option.value} />
                ))}
                </Picker>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <MyButtonComponent text="Xác nhận" color={appColors.primary} onPress={handleConfirm}/>
            <MyButtonComponent text="Hủy" color={appColors.primary} onPress={onClose}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
  },
  instructions: {
    marginBottom: 10,
    fontSize: appFontSize.normal,
    color: appColors.text,
    textAlign: 'left',
    fontWeight: 'bold', // Corrected to set font weight to bold
  },
  text: {
    marginBottom: 20,
    fontSize: appFontSize.normal,
    color: appColors.text,
    textAlign: 'left',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: appColors.boderColor,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center', // Center button content
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OptionPicker;

