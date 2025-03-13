import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { fetchAPI } from '@/lib/fetch'
import { useSignUp } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'

function SignUpScreen() {
  // hooks
  const { isLoaded, signUp, setActive } = useSignUp()

  // states
  const [form, setForm] = useState({
    name: 'nakmiers',
    email: 'diwas118151@gmail.com',
    password: 'Nak14950@0',
  })
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  })

  // Handle submission of sign-up form
  const onSignUpPress = useCallback(async () => {
    if (!isLoaded) return

    // reset verification
    setVerification({ state: 'default', error: '', code: '' })

    // Start sign-up process using email and password provided
    console.log('form', form)
    try {
      await signUp.create({
        username: form.name,
        emailAddress: form.email,
        password: form.password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
        ...verification,
        state: 'pending',
      })
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage)
      console.error(JSON.stringify(err, null, 2))
    }
  }, [form])

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    console.log('verification', verification, form)

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (signUpAttempt.status === 'complete') {
        console.log('signUpAttempt.createdUserId', signUpAttempt.createdUserId)

        // Create a database user
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        })

        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification({ ...verification, state: 'success' })
      } else {
        setVerification({ ...verification, error: 'Verification failed', state: 'failed' })
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: any) {
      setVerification({ ...verification, error: err.errors[0].longMessage, state: 'failed' })
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView className="flex-1">
        <View className="flex-1">
          {/* MARK: Head */}
          <View
            className="relative w-full overflow-hidden"
            style={{ height: 250 }}
          >
            <Image
              source={images.signUpCar}
              className="z-0 h-full w-full"
              resizeMode="cover"
            />

            <Text
              className="absolute bottom-0 text-2xl font-semibold"
              style={{ left: 18 }}
            >
              Create Your Account
            </Text>
          </View>

          {/* MARK: Form */}
          <View className="flex gap-2 p-5">
            {/* MARK: Name */}
            <InputField
              label="Name"
              placeholder="Enter your name"
              icon={icons.person}
              value={form.name}
              onChangeText={(value: string) => setForm({ ...form, name: value })}
            />

            {/* MARK: Email */}
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value: string) => setForm({ ...form, email: value })}
            />

            {/* MARK: Password */}
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry
              value={form.password}
              onChangeText={(value: string) => setForm({ ...form, password: value })}
            />

            {/* MARK: Submit Button */}
            <CustomButton
              title="Sign Up"
              className="mt-6"
              onPress={onSignUpPress}
            />

            {/* MARK: OAuth */}
            <OAuth />

            <Link
              href="/(auth)/sign-in"
              className="mt-10 text-center text-lg text-primary"
            >
              <Text>Already have an account?</Text>{' '}
              <Text
                className="font-semibold text-sky-500"
                style={{ textDecorationLine: 'underline' }}
              >
                Sign In
              </Text>
            </Link>
          </View>

          {/* MARK: Verification Modal */}
          <ReactNativeModal isVisible={verification.state === 'pending'}>
            <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
              <Text className="mb-2 text-2xl font-bold">Verification</Text>

              <Text className="mb-5 text-black">
                We have sent a verification code to {form.email}. Please enter the code below.
              </Text>

              <InputField
                label="Code"
                icon={icons.lock}
                placeholder="12345"
                value={verification.code}
                keyboard="numeric"
                labelStyle="text-black"
                inputStyle="text-black"
                onChangeText={code => {
                  setVerification({ ...verification, code })
                }}
              />

              {verification.error && (
                <Text className="mt-1 text-sm text-red-500">{verification.error}</Text>
              )}

              <CustomButton
                title="Verify Email"
                onPress={onVerifyPress}
                className="mt-5 rounded-full bg-green-500"
              />
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen
