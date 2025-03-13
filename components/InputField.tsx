import { cn } from '@/lib/utils'
import React from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

interface InputFieldProps {
  label: string
  labelStyle?: string
  placeholder?: string
  icon?: any
  value?: string
  secureTextEntry?: boolean
  containerStyle?: string
  iconStyle?: string
  inputStyle?: string
  onChangeText?: (value: string) => void
  className?: string
  [key: string]: any
}

function InputField({
  label,
  labelStyle,
  placeholder,
  icon,
  value,
  secureTextEntry,
  onChangeText,
  containerStyle,
  iconStyle,
  inputStyle,
  className,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback>
        <View className={cn('my-2 w-full', className)}>
          <Text className={cn('mb-3 text-lg font-semibold text-primary', labelStyle)}>{label}</Text>

          <View
            className={cn(
              'relative flex flex-row items-center justify-start overflow-hidden rounded-lg border border-primary',
              containerStyle
            )}
          >
            {icon && (
              <Image
                source={icon}
                className="h-8 w-7"
                style={{ objectFit: 'contain', marginLeft: 8 }}
              />
            )}

            <TextInput
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              className={cn(
                'h-full flex-1 border-0 p-4 text-left font-semibold text-primary',
                inputStyle
              )}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField
