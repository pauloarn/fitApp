import { Image, View } from 'react-native'
import { ListedExercise } from '../../types/exercises'

interface GifComponentProps {
  imageData: ListedExercise['imageData']
}
const GifComponent = ({ imageData }: GifComponentProps) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 50,
        overflow: 'hidden'
      }}
    >
      <Image
        style={{
          resizeMode: 'stretch',
          width: 70,
          height: 70
        }}
        source={{
          uri: imageData.imageBase64
        }}
      />
    </View>
  )
}

export default GifComponent
