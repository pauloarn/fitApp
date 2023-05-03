import { StyleSheet } from 'react-native'
import { defaults } from '../../../../defaults'

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: `48%`,
    marginRight: 10,
    padding: '2%',
    alignItems: 'center'
  },
  gifContainer: { padding: 5, marginBottom: 5 },
  marcouContainer: {
    backgroundColor: defaults.corBackGround,
    paddingVertical: 5,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5
  }
})
