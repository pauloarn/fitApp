import { View } from 'react-native'

interface DividerProps {
  x?: number
  y?: number
}
const Divider = ({ x = 1, y = 1 }: DividerProps) => {
  return <View style={{ height: y * 10, width: x * 10 }} />
}
export default Divider
