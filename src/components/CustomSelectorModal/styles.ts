import { StyleSheet } from 'react-native'
import {
  heightPercentageToDP,
  widthPercentageToDP
} from 'react-native-responsive-screen'
import { defaults } from '../../defaults'

export default (isMultiple: boolean) => {
  return StyleSheet.create({
    secondaryBackContainer: {
      height: heightPercentageToDP(45),
      alignItems: `center`,
      borderRadius: 10,
      overflow: 'scroll',
      backgroundColor: defaults.corBackgroundCard
    },

    backContainer: {
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: widthPercentageToDP(2),
      justifyContent: 'flex-end',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: heightPercentageToDP(100)
    }
  })
}
