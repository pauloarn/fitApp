import { StyleSheet } from 'react-native'
import { defaults } from '../../../defaults'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default StyleSheet.create({
  filterArea: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 5,
    marginBottom: 10
  },
  categorySelectorArea: {
    paddingTop: 10,
    flexDirection: `row`,
    justifyContent: 'space-between'
  },
  resetFilterButton: {
    backgroundColor: defaults.corBackTextInput,
    width: heightPercentageToDP(4),
    height: heightPercentageToDP(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: heightPercentageToDP(4) / 2
  }
})
