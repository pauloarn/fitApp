import { Image } from 'react-native'
import { ListedExercise } from '../../types/exercises'

interface GifComponentProps {
  imageData: ListedExercise['imageData']
}
const GifComponent = ({ imageData }: GifComponentProps) => {
  const imageBase64 = `data:image/${imageData.imageType};base64,${imageData.imageBase64}`
  return (
    <Image
      style={{
        resizeMode: 'stretch',
        width: 90,
        height: 90
      }}
      source={{
        uri: imageBase64
      }}
    />
  )
}

export default GifComponent
