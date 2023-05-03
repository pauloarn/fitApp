import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'
import { defaults } from '../../../../defaults'

export default StyleSheet.create({
  card: {
    height: hp('6%'),
    width: wp('90%'),
    backgroundColor: defaults.corBackgroundCard,
    paddingLeft: wp('5%'),
    elevation: wp('1%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  deleteView: {
    backgroundColor: 'red',
    height: '100%',
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: wp('2%'),
    borderTopRightRadius: wp('2%')
  },
  editView: {
    backgroundColor: 'darkcyan',
    height: '100%',
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dotsView: {
    backgroundColor: 'white',
    height: '100%',
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  openMenuView: {
    borderBottomRightRadius: wp('2%'),
    borderTopRightRadius: wp('2%'),
    height: '100%',
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeMenuView: {
    height: '100%',
    width: '10%',
    borderBottomRightRadius: wp('2%'),
    borderTopRightRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center'
  }
})
