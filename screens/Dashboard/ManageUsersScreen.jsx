import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {get_users} from '../../firebase/apis/users'

const ManageUsersScreen = () => {
  return (
    <View style={styles.screenContainer}>
    </View>
  );
};

export default ManageUsersScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f0e8",
  },
  text: {
    color: "#29648f",
    fontSize: 24, // Adjusted for more standard viewing
    fontWeight: "bold",
  },
});
