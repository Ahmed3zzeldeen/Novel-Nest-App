import { View, Text } from 'react-native'
import React from 'react'
import EditBook from '@/screens/Dashboard/Books-Screens/EditBook'
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
  const { id } = useLocalSearchParams();

  return (
    <EditBook bookId={id} />
  )
}