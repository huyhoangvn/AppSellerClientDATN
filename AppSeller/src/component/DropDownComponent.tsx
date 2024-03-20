import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

interface Props {
  label?: string;
  value?: string;
  containerStyle: StyleProp<ViewStyle>;
  items?: { label: string; value: string }[];
  defaultValue?: string;
  onChangeItem: (item: string | null) => void; // Chỉnh sửa kiểu của tham số thành string | null
}

const DropDownComponent = (props: Props) => {
  const { value, items, defaultValue, onChangeItem,containerStyle, ...otherProps } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(value || defaultValue || null);

  const handleValueChange = (value: any) => { // Đảm bảo kiểu dữ liệu đúng cho value
    setSelectedValue(value);
    onChangeItem(value);
  };

  return (
    <DropDownPicker
      open={open}
      value={selectedValue}
      items={items || []}
      setOpen={setOpen}
      setValue={(value) => handleValueChange(value)} 
      zIndex={9999}
      style={{ backgroundColor: '#fafafa' , borderRadius: 30, }}
      containerStyle={[containerStyle]}
      onChangeValue={(value) => setSelectedValue(value)}
      
      {...otherProps}
    />
  );
};

export default DropDownComponent;
