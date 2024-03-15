import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { defaults } from '../../../defaults'

export default () => {
  return StyleSheet.create({
    itemSelectedBtn: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: wp('2%'),
      backgroundColor: defaults.corBackTextInput
    },
    itemText: {
      width: '100%',
      fontSize: wp('4%'),
      textAlign: 'center'
    },
    selectedItemText: {
      width: '100%',
      fontSize: wp('4%'),
      color: 'white',
      textAlign: 'center'
    },
    itemBtn: {
      width: '100%',
      alignItems: 'center',
      padding: wp('2%')
    }
  })
}
