import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default () => {
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      marginTop: 2.5,
      flex: 1,
      width: '100%',
      padding: 5,
      paddingBottom: 0
    },
    button: {
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: 5
    },
    text: {
      color: 'white',
      fontSize: wp('3.5%')
    },
    modalView: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemsContainer: {
      width: 300,
      borderRadius: 10,
      backgroundColor: 'white',
      padding: 5
    },
    itemBtn: {
      width: '100%',
      alignItems: 'center',
      padding: wp('2%')
    },
    itemText: {
      width: '100%',
      marginHorizontal: 15,
      fontSize: wp('4%'),
      textAlign: 'center'
    }
  })
}
