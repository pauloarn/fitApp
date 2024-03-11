import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'
import { defaults } from '../../../../defaults'

const useStyles = (isMenuOpen: boolean) => {
  return StyleSheet.create({
    card: {
      height: hp('15%'),
      paddingVertical: 8,
      width: wp('90%'),
      backgroundColor: defaults.corBackgroundCard,
      paddingLeft: wp('3%'),
      elevation: wp('1%'),
      borderRadius: wp('3%'),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp('1%'),
      marginBottom: hp('1%'),
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column'
    },
    dotsView: {
      backgroundColor: 'white',
      height: '100%',
      width: '33%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    menuView: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardHeaderView: {
      display: 'flex',
      flexDirection: 'row',
      height: `20%`,
      alignItems: 'center',
      justifyContent: 'center'
    },
    startTrainingButton: {
      backgroundColor: defaults.corBackTextInput,
      width: '90%',
      marginLeft: -10,
      borderRadius: 6,
      alignItems: 'center',
      paddingVertical: 5
    },
    startTrainingButtonContainer: {
      width: '100%',
      height: `25%`,
      alignItems: `center`
    },
    exercisesContainer: {
      height: `50%`,
      width: `100%`,
      marginRight: 15,
      paddingHorizontal: 3
    },
    optionsContainer: {
      height: `100%`,
      width: `10%`,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
}
export default useStyles
