import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'

function RootLayout() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}

export default RootLayout
