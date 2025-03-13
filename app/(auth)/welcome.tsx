import CustomButton from '@/components/CustomButton'
import { onboarding } from '@/constants'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

function Onboarding() {
  const swiperRef = useRef<any>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false)

  return (
    <SafeAreaView
      edges={['bottom', 'right', 'left']}
      className="flex-1 items-center justify-between p-0"
      style={{ padding: 0, margin: 0 }}
    >
      <TouchableOpacity
        onPress={() => {
          router.replace('/(auth)/sign-up')
        }}
        className="flex w-full items-end justify-end p-5"
      >
        <Text className="text-md font-JakartaBold text-primary">Skip</Text>
      </TouchableOpacity>

      <Swiper
        loop={false}
        dot={<View className="mx-1 h-1 w-8 rounded-full bg-[#E2E8F0]"></View>}
        activeDot={<View className="mx-1 h-1 w-8 rounded-full bg-[#0286FF]"></View>}
        ref={swiperRef}
        onIndexChanged={(index: number) => {
          setActiveIndex(index)
          setIsLastSlide(index === onboarding.length - 1)
        }}
      >
        {onboarding.map(item => (
          <View
            className="flex items-center justify-center p-5"
            key={item.id}
          >
            <Image
              source={item.image}
              className="h-[300px] w-full"
              resizeMode="contain"
            />
            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-primary">{item.title}</Text>
            </View>
            <Text className="font-JakartaBold mx-10 mt-3 text-center text-lg text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        style={{ maxWidth: '90%' }}
        onPress={() => (isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current.scrollBy(1))}
      />
    </SafeAreaView>
  )
}

export default Onboarding
