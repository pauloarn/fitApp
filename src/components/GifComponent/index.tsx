import { Image, View } from 'react-native'
import { useEffect, useState } from 'react'
import exercisesService from '../../services/exercises/exercisesService'

interface GifComponentProps {
  imageUrl: string
}

const GifComponent = ({ imageUrl }: GifComponentProps) => {
  const { getImageExercise } = exercisesService()

  const [imgBase64, setImgBase64] = useState<string>()

  useEffect(() => {
    getImageExercise(imageUrl).then((res) => {
      setImgBase64(res.data?.body)
    })
  }, [imageUrl])

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
          uri: `data:image/*;base64,${imgBase64}`
        }}
      />
    </View>
  )
}

export default GifComponent
