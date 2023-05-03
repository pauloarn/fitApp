import { StyleSheet } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    minWidth: 50,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: wp('7%'),
    bottom: hp('3%')
  }
})
