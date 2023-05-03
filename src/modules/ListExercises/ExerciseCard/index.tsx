import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Exercicio } from '../../../database/model/Exercicio'
import GifComponent from '../../../components/GifComponent'

interface ExerciseCardProps {
  listaExercicios: Exercicio[]
  exercise: Exercicio
  onPress: (Exercicio) => void
}

const ExerciseCard = ({
  exercise,
  onPress,
  listaExercicios
}: ExerciseCardProps) => {
  const selecionados = listaExercicios.filter((ex) => ex.id === exercise.id)
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
          <GifComponent gifUrl={exercise.url} />
        </View>
        <View style={{ width: '60%' }}>
          <Text style={{ textAlign: 'center' }}>{exercise.nomeExercicio}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default ExerciseCard
