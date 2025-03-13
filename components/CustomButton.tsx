import { useColorScheme } from '@/lib/useColorScheme'
import { cn } from '@/lib/utils'
import React from 'react'
import { Image, Text } from 'react-native'
import { Button } from './ui/button'

interface CustomButtonProps {
  title: string
  variant?: 'default' | 'ghost' | 'secondary' | 'link' | 'destructive' | 'outline'
  className?: string
  style?: { [key: string]: any }
  onPress: () => void
  iconLeft?: any
  iconRight?: any
  [key: string]: any
}

function CustomButton({
  title,
  variant = 'default',
  className,
  onPress,
  style,
  iconLeft,
  iconRight,
  ...props
}: CustomButtonProps) {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <Button
      variant={variant}
      className={cn('flex w-full flex-row gap-2', className)}
      style={{ ...style }}
      onPress={onPress}
      {...props}
    >
      {iconLeft && (
        <Image
          source={iconLeft}
          className="h-6 w-6"
          style={{ objectFit: 'contain' }}
        />
      )}
      {variant === 'default' ? (
        <Text
          className={cn('font-semibold text-primary')}
          style={{ color: isDarkColorScheme ? '#111' : '#fff' }}
        >
          {title}
        </Text>
      ) : (
        <Text className={cn('font-semibold text-primary')}>{title}</Text>
      )}
      {iconRight && (
        <Image
          source={iconRight}
          className="h-6 w-6"
          style={{ objectFit: 'contain' }}
        />
      )}
    </Button>
  )
}

export default CustomButton
