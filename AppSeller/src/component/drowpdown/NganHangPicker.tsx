import { Picker } from '@react-native-picker/picker';
import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appColors } from '../../constants/appColors';
import { appIcon } from '../../constants/appIcon';
import { appFontSize } from '../../constants/appFontSizes';

interface OptionPickerProps {
  option: string;
  onOptionChange: (option: string) => void;
  options: any[];
  optionTitle?: string;
  handleSave?: Function;
  mode?: 'dialog' | 'dropdown';
  titleHandleSave?: string;
  icon?: any;
}



const NganHangPicker: React.FC<OptionPickerProps> = ({ option, onOptionChange, options, optionTitle, handleSave, mode = "dialog", titleHandleSave="Lưu", icon }) => {

  const handleValueChange = (itemValue: any) => {
    // Find the selected option in the options array
    onOptionChange(itemValue);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10}}>
      {optionTitle && (
        <Text style={{fontSize: appFontSize.normal, fontWeight: 'bold', color: appColors.warmOrange }}>
          {optionTitle}</Text>
      )}
      <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', height: 50, borderWidth: 1, backgroundColor: 'white',
      borderRadius: 26, borderColor: appColors.boderColor}}>
        {icon && <FontAwesomeIcon style={{marginLeft: 20}} icon={icon} color={appColors.gray} size={16} />}
        <Picker
          selectedValue={option}
          style={{minHeight: 100, maxHeight: 100, flex: 1, flexGrow: 1}}
          onValueChange={handleValueChange} // Use the new handler
          mode={mode}
        >
          {options.map((item: any) => (
            <Picker.Item key={item.key} label={item.value+" - "+item.key} value={item.value} style={{fontSize: 16}} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default NganHangPicker;
