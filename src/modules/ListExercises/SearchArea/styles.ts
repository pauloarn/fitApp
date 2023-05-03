import { StyleSheet } from 'react-native'
import { defaults } from '../../../defaults'

export default StyleSheet.create({
  filterArea: {
    backgroundColor: defaults.corBackTextInput,
    marginTop: -5,
    paddingTop: 10,
    paddingHorizontal: 5,
    height: 200,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
    borderBottomWidth: 1,
    borderWidth: 0.7
  }
})
