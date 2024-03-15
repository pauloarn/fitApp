import { StyleSheet } from 'react-native'
import { defaults } from '../../defaults'

const useStyles = () => {
  return StyleSheet.create({
    container: {
      alignItems: `center`,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: defaults.corBackTextInput,
      paddingVertical: 6,
      borderRadius: 4
    },
    selectorText: {
      fontSize: 15,
      color: `white`
    }
  })
}

export default useStyles
