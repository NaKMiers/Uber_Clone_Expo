import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'

function SignInScreen() {
  // hooks
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  // states
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  // Handle the submission of the sign-in form
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return
    console.log('form', form)

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(root)/(tabs)/home')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage)
      console.error(JSON.stringify(err, null, 2))
    }
  }, [form])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView className="flex-1">
        <View className="flex-1">
          <View
            className="relative w-full overflow-hidden"
            style={{ height: 250 }}
          >
            <Image
              source={images.signUpCar}
              className="h-full w-full"
              resizeMode="cover"
            />

            <Text
              className="absolute bottom-0 text-2xl font-semibold"
              style={{ left: 18 }}
            >
              Welcome 👋
            </Text>
          </View>

          <View className="flex gap-2 p-5">
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value: string) => setForm({ ...form, email: value })}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry
              value={form.password}
              onChangeText={(value: string) => setForm({ ...form, password: value })}
            />

            <CustomButton
              title="Sign In"
              className="mt-6"
              onPress={onSignInPress}
            />

            {/* OAuth */}
            <OAuth />

            <Link
              href="/(auth)/sign-up"
              className="mt-10 text-center text-lg text-primary"
            >
              <Text>Don't have an account?</Text>{' '}
              <Text
                className="font-semibold text-sky-500"
                style={{ textDecorationLine: 'underline' }}
              >
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignInScreen
