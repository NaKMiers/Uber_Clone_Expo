import { icons } from '@/constants'
import { cn } from '@/lib/utils'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'

function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#111',
          borderRadius: 50,
          marginHorizontal: 20,
          position: 'fixed',
          height: 62,
          bottom: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#333',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.home}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: 'Rides',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.list}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.chat}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.profile}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

interface TabIconProps {
  focused: boolean
  source: ImageSourcePropType
}

function TabIcon({ focused, source }: TabIconProps) {
  return (
    <View
      className={cn(
        'flex aspect-square flex-row items-center justify-center rounded-full p-2',
        focused && 'bg-emerald-500'
      )}
    >
      <View className="h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
        <Image
          source={source}
          className="h-full w-full"
          resizeMode="contain"
          tintColor="white"
        />
      </View>
    </View>
  )
}
