import { Redirect } from 'expo-router'
import * as React from 'react'

function HomeScreen() {
  return <Redirect href="/(auth)/welcome" />
}

export default HomeScreen
