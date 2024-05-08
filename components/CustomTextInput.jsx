import { StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React, { useState } from "react";
import COLORS from "@/constants/colors";
import CustomLink from "./CustomLink";

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  InputStyle,
  withLink,
  linkText,
  linkRoute,
}) => {
  const [Error, setError] = useState(error);

  return (
    <View style={styles.container}>
      {withLink ? (
        <View style={{...styles.labelContiner, flexDirection: "row" , justifyContent:'space-between'}}>
          <Text style={[styles.label ]}>{label}</Text>
          <CustomLink
            text={linkText}
            href={linkRoute}
            style={{marginTop:0  }}
          />
        </View>
      ) : (
        <Text style={{...styles.label , ...styles.labelContiner }}>{label}</Text>
      )}

      <TextInput
        style={{ ...styles.input, ...InputStyle }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.error}>{Error}</Text>}
    </View>
  );
};

CustomTextInput.Select = function Select({
  label,
  placeholder,
  value = { label: "Option 1", value: "Option_1" },
  onValueChange,
  items = [
    { label: "Option 1", value: "Option_1" },
    { label: "Option 2", value: "Option_2" },
    { label: "Option 3", value: "Option_3" },
    { label: "Option 4", value: "Option_4" },
  ],
  error,
  InputStyle,
}) {
  const [Error, setError] = useState(error);

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label, ...styles.labelContiner }}>{label}</Text>
      <RNPickerSelect
        value={value}
        onValueChange={onValueChange}
        items={items}
        style={{ ...pickerSelectStyles, ...InputStyle }}
        placeholder={placeholder}
      />
      {error && <Text style={styles.error}>{Error}</Text>}
    </View>
  );
};
export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexShrink: 1,
    flexDirection: "column",
  },
  labelContiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  input: {
    padding: 5,
    backgroundColor: COLORS.background,
    color: COLORS.placeholderText,
    borderRadius: 5,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 3,
  },
  onfocus: {
    borderColor: "#29648F",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    backgroundColor: COLORS.background,
    color: COLORS.placeholderText,
    borderWidth: 3,
    borderRadius: 5,
    borderBottomColor: COLORS.primary,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 14,
    backgroundColor: COLORS.background,
    color: COLORS.placeholderText,
    borderWidth: 3,
    borderRadius: 5,
    borderBottomColor: COLORS.primary,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30,
  },
  inputWeb: {
    padding: 5,
    backgroundColor: COLORS.background,
    color: COLORS.placeholderText,
    borderRadius: 5,
    borderBottomColor: COLORS.primary,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomWidth: 3,
    paddingRight: 30,
  },
});
