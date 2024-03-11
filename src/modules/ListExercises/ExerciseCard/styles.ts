import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  card: {
    height: hp('10%'),
    width: wp('90%'),
    paddingHorizontal: wp('1%'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1
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
