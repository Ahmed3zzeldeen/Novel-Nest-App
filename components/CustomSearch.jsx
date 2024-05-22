import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import COLORS from "@/constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const CustomSearch = ({
  handleSearch,
  searchText,
  setSearchText,
  placeholderText,
  containerStyle,
}) => {
  return (
    <View style={[styles.searchInputContainer,containerStyle]}>
      <Pressable onPress={handleSearch} style={styles.searchIcon}>
        <FontAwesome5
          name="search"
          size={18}
          color="#2f6892"
          style={styles.searchIcon}
        />
      </Pressable>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholderText}
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          handleSearch();
        }}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

export default CustomSearch;

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    height: 40,
  },
  searchInput: {
    width:"100%",
    paddingHorizontal: 10,
    color: COLORS.placeholderText,
    fontSize: 16,
    height: "100%",
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
});
