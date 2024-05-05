import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import COLORS from '@/constants/colors'

export default function PrimaryBtn({ text, handlePress}) {
  return (
    <Pressable
    onPress={handlePress}
    style={({ pressed }) => [
      {
        backgroundColor: pressed
          ? COLORS.primary_70
          : COLORS.primary
      },
      styles.wrapperCustom
    ]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapperCustom: {
    width: "auto",
    borderRadius: 8,
    padding: 6,
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 1.4
  }
})