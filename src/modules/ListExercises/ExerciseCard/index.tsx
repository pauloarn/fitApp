import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { ListedExercise } from '../../../types/exercises'
import GifComponent from '../../../components/GifComponent'

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
      {isSelecionado && <View style={styles.selectedExerciseIndicador} />}

      <TouchableOpacity style={styles.card} onPress={() => onPress(exercise)}>
        <View
          style={{
            minWidth: '30%',
            alignItems: 'center'
          }}
        >
          <GifComponent imageData={exercise.imageData} />
        </View>
        <View style={{ width: '60%' }}>
          <Text style={{ textAlign: 'center' }}>{exercise.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default ExerciseCard
