import { Text, View } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootRouter } from '../../types/routes'
import { useEffect } from 'react'
import { userService } from '../../services/user/userService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'
import Toast from 'react-native-root-toast'
import { useCategories } from '../../hooks/useCategories'

const SplashScreen = () => {
  const { getLoggedUserToken } = userService()
  const { getCategories } = useCategories()
  const { navigate } = useNavigation<NativeStackNavigationProp<RootRouter>>()

  const initiate = async () => {
    await validateUserToken()
  }

  const validateUserToken = async () => {
    const userData = await getLoggedUserToken()
    if (userData.data?.body) {
      await getCategories()
    } else {
      const token = await AsyncStorage.getItem(config.localStorageTokenName)
      if (token) {
        Toast.show('Sessão expirada, favor efetuar login novamente')
      }
      navigate('LoginScreen', {})
    }
  }

  useEffect(() => {
    initiate()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.stylesMainText}>My Fit App</Text>
      <Text style={styles.styleSubText}>Carregando dados...</Text>
    </View>
  )
}

export default SplashScreen
