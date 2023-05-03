import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { defaults } from '../../defaults'

export default () => {
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      marginTop: 2.5,
      minHeight: 40,
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      borderColor: 'white',
      borderWidth: 1,
      padding: 5
    },
    placeHolder: {
      position: 'absolute',
      backgroundColor: defaults.corBackGround,
      top: -10,
      paddingHorizontal: 5,
      left: 5
    },
    button: {
      flex: 1,
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
