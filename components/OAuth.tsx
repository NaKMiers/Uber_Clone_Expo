import React, { useCallback } from 'react'
import { Text, View } from 'react-native'
import CustomButton from './CustomButton'
import { icons } from '@/constants'

function OAuth() {
  const handleGoogleSignIn = useCallback(() => {}, [])

  return (
    <View className="mt-3 flex gap-4">
      <View className="flex flex-row items-center justify-center gap-4">
        <View className="h-px flex-1 bg-muted" />
        <Text className="text-lg text-primary">Or</Text>
        <View className="h-px flex-1 bg-muted" />
      </View>

      <CustomButton
        variant="outline"
        title="Sign In with Google"
        className="mt-5 w-full rounded-full"
        iconLeft={icons.google}
        onPress={handleGoogleSignIn}
      />
    </View>
  )
}

export default OAuth
