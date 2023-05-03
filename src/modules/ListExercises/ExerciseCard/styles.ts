import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  card: {
    height: hp('15%'),
    width: wp('90%'),
    backgroundColor: `white`,
    paddingHorizontal: wp('1%'),
    display: 'flex',
    flexDirection: 'row',
    elevation: wp('1%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    alignSelf: 'center'
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  selectedExerciseIndicador: {
    backgroundColor: 'darkcyan',
    width: '1.5%',
    height: '85%',
    borderRadius: 5
  }
})
