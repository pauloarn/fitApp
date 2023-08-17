import { StyleSheet } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { defaults } from '../../defaults'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: defaults.corBackGround,
    width: wp('100%'),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  imageContainer: {
    backgroundColor: 'cyan',
    height: hp('20%'),
    width: wp('40%'),
    alignItems: 'center',
    justifyContent: 'center'
  }
})
