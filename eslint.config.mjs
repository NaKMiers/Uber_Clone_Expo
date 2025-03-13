import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

// Chuyển đổi ESM thành đường dẫn file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Khởi tạo FlatCompat
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// Cấu hình ESLint cho React Native
const eslintConfig = [
  // Kế thừa các cấu hình cơ bản
  ...compat.extends(
    'eslint:recommended', // Quy tắc cơ bản của ESLint
    'plugin:react/recommended', // Quy tắc cho React
    'plugin:react-native/recommended' // Quy tắc cho React Native
  ),

  // Cấu hình môi trường
  {
    env: {
      'react-native/react-native': true, // Môi trường React Native
    },
  },

  // Cấu hình plugin
  {
    plugins: ['react', 'react-native'],
  },

  // Quy tắc tùy chỉnh
  {
    rules: {
      // Quy tắc React
      'react/prop-types': 'off', // Tắt prop-types nếu dùng TypeScript
      'react/react-in-jsx-scope': 'off', // Không cần import React trong JSX từ React 17+

      // Quy tắc React Native
      'react-native/no-unused-styles': 'warn', // Cảnh báo nếu có style không dùng
      'react-native/no-inline-styles': 'warn', // Khuyến khích dùng StyleSheet
      'react-native/no-raw-text': 'warn', // Khuyến khích dùng <Text> thay vì text trực tiếp
    },
  },

  // Hỗ trợ TypeScript (nếu cần)
  ...compat.extends('plugin:@typescript-eslint/recommended'), // Quy tắc cho TypeScript
  {
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'], // Báo lỗi biến không dùng
      'no-undef': 'off', // Tắt no-undef vì TypeScript đã xử lý
    },
    settings: {
      'import/resolver': {
        typescript: {}, // Hỗ trợ phân giải import trong TypeScript
      },
    },
  },
]

export default eslintConfig
