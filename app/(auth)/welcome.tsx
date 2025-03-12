import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Onboarding() {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-green-200 p-0">
      <TouchableOpacity
        onPress={() => {
          router.replace('/(auth)/sign-up')
        }}
        className="flex w-full items-end justify-end p-5"
      >
        <Text>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Onboarding
