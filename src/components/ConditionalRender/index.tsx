import { PropsWithChildren } from 'react'
import { View } from 'react-native'

interface ConditionalRenderProps extends PropsWithChildren {
  validation: boolean
}
const ConditionalRender = (props: ConditionalRenderProps) => {
  const { validation, children } = props
  if (!validation) {
    return null
  }
  return <View>children</View>
}

export default ConditionalRender
