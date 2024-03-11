import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { ListedExercise } from '../../../types/exercises'
import GifComponent from '../../../components/GifComponent'
import { widthPercentageToDP } from 'react-native-responsive-screen'

interface ExerciseCardProps {
  listaExercicios: ListedExercise[]
  exercise: ListedExercise
  onPress: (exercicio: ListedExercise) => void
}

const ExerciseCard = ({
  exercise,
  onPress,
  listaExercicios
}: ExerciseCardProps) => {
  const selecionados = listaExercicios.filter(
    (ex) => ex.exerciseId === exercise.exerciseId
  )
  const isSelecionado = selecionados.length > 0
  return (
    <View style={styles.cardContainer}>
      {isSelecionado ? <View style={styles.selectedExerciseIndicador} /> : null}

      <TouchableOpacity style={styles.card} onPress={() => onPress(exercise)}>
        <View
          style={{
            minWidth: '30%',
            paddingLeft: widthPercentageToDP(4),
            alignItems: 'flex-start'
          }}
        >
          <GifComponent imageData={exercise.imageData} />
        </View>
        <View style={{ width: '60%' }}>
          <Text style={{ textAlign: 'center', color: `white` }}>
            {exercise.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default ExerciseCard
