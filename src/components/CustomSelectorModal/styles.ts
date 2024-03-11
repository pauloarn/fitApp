import { StyleSheet } from 'react-native'
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { defaults } from '../../defaults'

export default () => {
  return StyleSheet.create({
    itemBtn: {
      width: '100%',
      alignItems: 'center',
      padding: wp('2%')
    },
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
    secondaryBackContainer: {
      height: heightPercentageToDP(45),
      alignItems: `center`,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      overflow: 'scroll',
      backgroundColor: defaults.corBackgroundCard
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderBottomWidth: 0.5,
      borderBottomColor: 'grey',
      width: widthPercentageToDP(95),
      paddingTop: 10,
      paddingBottom: 8
    },
    backContainer: {
      position: 'absolute',
      bottom: 0,
      justifyContent: 'flex-end',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: heightPercentageToDP(100)
    }
  })
}
