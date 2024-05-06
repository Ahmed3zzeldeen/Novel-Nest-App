import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderScreen = () => {
  return (
    <View style={styles.Container}>
      <Text>OrderScreen</Text>
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }

})