import { StyleSheet } from 'react-native'
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { defaults } from '../../../defaults'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: defaults.corBackGround,
    paddingHorizontal: 10,
    width: wp('100%'),
    flex: 1
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: heightPercentageToDP('5%'),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: defaults.corBackGround
  },
  textButton: {
    padding: 0,
    color: 'cyan'
  },
  headerText: {
    fontSize: 21,
    color: 'white',
    width: widthPercentageToDP('60%'),
    textAlign: 'center'
  }
})
