import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import React, { memo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function Home() {
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <TouchableOpacity
          onPress={() => signOut()}
          className="mt-4 rounded bg-red-500 p-2"
        >
          <Text className="font-semibold text-white">Sign Out</Text>
        </TouchableOpacity>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}

export default memo(Home)
