import { StyleSheet } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { defaults } from '../../defaults'

const useStyles = () => {
  return StyleSheet.create({
    backContainer: {
      position: 'absolute',
      bottom: 0,
      justifyContent: 'flex-end',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: heightPercentageToDP(100)
    },
    secondaryBackContainer: {
      alignItems: `center`,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      overflow: 'scroll',
      paddingBottom: 20
    },
    optionContainer: {
      width: '95%',
      marginVertical: 10
    },
    optionButton: {
      backgroundColor: defaults.corBackTextInput,
      width: '100%',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10
    },
    lineSeparator: {
      height: 1,
      backgroundColor: `white`,
      width: `95%`,
      marginBottom: 10
    }
  })
}

export default useStyles
