import { StyleSheet } from 'react-native'
import { defaults } from '../../../defaults'

export default () => {
  return StyleSheet.create({
    buttonContainer: {
      backgroundColor: defaults.corBackgroundCard,
      padding: 10,
      marginTop: 10,
      alignItems: 'center',
      borderRadius: 10
    }
  })
}
