import { StyleSheet } from 'react-native'
import {
  heightPercentageToDP,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { defaults } from '../../../defaults'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: defaults.corBackGround,
    width: wp('100%'),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  stylesMainText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 23
  },
  styleSubText: {
    textAlign: 'center',
    padding: 10,
    marginTop: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  dropDownView: {
    height: heightPercentageToDP('5%'),
    width: wp('80%'),
    marginBottom: heightPercentageToDP('2%')
  }
})
