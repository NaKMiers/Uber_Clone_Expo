import { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'

export const fetchAPI = async (url: string, options?: RequestInit) => {
  const baseUrl = Platform.OS === 'web' ? '' : 'http://192.168.1.66:8081'
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`

  console.log('fetchAPI', fullUrl, options)

  try {
    const response = await fetch(fullUrl, options)
    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchAPI(url, options)
      setData(result.data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
