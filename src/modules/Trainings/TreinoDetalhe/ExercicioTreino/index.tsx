import { Text, TouchableOpacity, View } from 'react-native'
import DataDisplayGrid, {
  FieldProps
} from '../../../../components/DataDisplayGrid'
import GifComponent from '../../../../components/GifComponent'
import Divider from '../../../../components/Divider'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import {
  ExerciseInRoutineExecution,
  ExerciseRoutineDetailResponse
} from '../../../../types/exerciseRoutine'

interface ExercicioTreinoProps {
  exercicio: ExerciseInRoutineExecution
  executaExercicio: (exercicio: ExerciseInRoutineExecution) => void
  treino: ExerciseRoutineDetailResponse
}
const ExercicioTreino = ({
  exercicio,
  treino,
  executaExercicio
}: ExercicioTreinoProps) => {
  const getFields = () => {
    const fields: FieldProps[] = [
      {
        label: 'Séries',
        value: (exercicio.series ?? treino?.series) || 0
      },
      {
        label: 'Repetições',
        value: (exercicio.repetitions ?? treino?.repetitions) || 0
      },
      {
        label: 'Carga',
        value: `${exercicio.exerciseWeight ?? 0} KG`
      }
    ]
    return fields
  }

  return (
    <TouchableOpacity
      style={styles.cardStyle}
      onPress={() => executaExercicio(exercicio)}
    >
      <View style={styles.gifContainer}>
        <GifComponent imageData={exercicio.execise.imageData} />
      </View>
      <View style={styles.marcouContainer}>
        <MaterialCommunityIcons
          name={
            exercicio.hasExecuted ? 'checkbox-marked' : 'checkbox-blank-outline'
          }
          size={20}
          color={'white'}
        />
        <Divider x={2} />
        <View>
          <Text style={{ color: 'white' }}>
            {exercicio.hasExecuted ? 'Finalizado' : 'Finalizou ?'}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 15, textAlign: 'center' }}>
          {exercicio.execise.name}
        </Text>
      </View>
      <DataDisplayGrid fields={getFields()} numColunas={1} />
    </TouchableOpacity>
  )
}

export default ExercicioTreino
