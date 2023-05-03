import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { defaults } from '../../../defaults'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: defaults.corBackGround,
    width: wp('100%'),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
