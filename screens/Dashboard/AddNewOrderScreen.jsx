import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddNewOrderScreen = () => {
  return (
    <View style={styles.Container}>
      <Text>AddNewOrderScreen</Text>
    </View>
  )
}

export default AddNewOrderScreen

const styles = StyleSheet.create({
  Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }

})