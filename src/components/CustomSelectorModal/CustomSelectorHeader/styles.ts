import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

export default () => {
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderBottomWidth: 0.5,
      borderBottomColor: 'grey',
      width: widthPercentageToDP(95),
      paddingTop: 10,
      paddingBottom: 8
    },
    headerText: {
      fontSize: 15,
      width: '60%',
      fontWeight: `bold`,
      textAlign: `center`
    }
  })
}
