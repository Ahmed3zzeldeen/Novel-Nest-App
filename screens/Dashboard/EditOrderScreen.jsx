import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ROUTES from "../../constants/routes";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

const EditOrderScreen = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.IconLogout}>
      <Pressable
        onPress={() => {
          console.log("mmmmmm");
        }}
      >
        <Text style={{ color: "#29649f", fontSize: 20, alignSelf: "flex-end" }}>
          <FontAwesome6
            name="door-open"
            size={24}
            color="#29648F"
            style={{ margin: 10 }}
          />
          logout
        </Text>
      </Pressable>
      </View>
    </View>
  )
}

export default EditOrderScreen

const styles = StyleSheet.create({
    Container:{
        flex:1,

    }



    
})