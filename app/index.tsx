import { useAuth } from '@clerk/clerk-react'
import { Redirect } from 'expo-router'
import * as React from 'react'

function HomeScreen() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />
  }

  return <Redirect href="/(auth)/welcome" />
}

export default HomeScreen
