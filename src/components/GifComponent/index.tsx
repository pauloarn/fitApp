import { Image } from 'react-native'

interface GifComponentProps {
  gifUrl: string
}
const GifComponent = ({ gifUrl }: GifComponentProps) => {
  return (
    <Image
      style={{
        resizeMode: 'stretch',
        width: 90,
        height: 90
      }}
      source={{
        uri: gifUrl
      }}
    />
  )
}

export default GifComponent
