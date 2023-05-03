import { BackHandler, Platform } from 'react-native'
import Toast from 'react-native-root-toast'

let currentCount = 0
export const useDoubleBack = (exitHandler: () => void, isFocused: boolean) => {
  if (!isFocused)
    BackHandler.removeEventListener('hardwareBackPress', () => true)
  if (Platform.OS === 'ios') return
  const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
    if (currentCount === 1) {
      exitHandler()
      subscription.remove()
      return true
    }
    backPressHandler()
    return true
  })
}
const backPressHandler = () => {
  if (currentCount < 1) {
    currentCount += 1
    Toast.show('Pressione voltar novamente para descartar', {
      duration: Toast.durations.LONG
    })
  }
  setTimeout(() => {
    currentCount = 0
  }, 2000)
}
