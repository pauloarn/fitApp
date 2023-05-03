import { Text, TouchableOpacity, View } from 'react-native'
import { ExercicioTreinoExecutado } from '../../../../database/model/ExercicioTreinoConfig'
import DataDisplayGrid, {
  FieldProps
} from '../../../../components/DataDisplayGrid'
import GifComponent from '../../../../components/GifComponent'
import { Treino } from '../../../../database/model/Treino'
import Divider from '../../../../components/Divider'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'

interface ExercicioTreinoProps {
  exercicio: ExercicioTreinoExecutado
  executaExercicio: (exercicio: ExercicioTreinoExecutado) => void
  treino: Treino['treinoSet']
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
        value: exercicio.exercicioSet?.series || treino?.series || 0
      },
      {
        label: 'Repetições',
        value: exercicio.exercicioSet?.repeticoes || treino?.repeticoes || 0
      },
      {
        label: 'Carga',
        value: `${exercicio.exercicioSet?.carga || 0} KG`
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
        <GifComponent gifUrl={exercicio.url} />
      </View>
      <View style={styles.marcouContainer}>
        <MaterialCommunityIcons
          name={
            exercicio.executou ? 'checkbox-marked' : 'checkbox-blank-outline'
          }
          size={20}
          color={'white'}
        />
        <Divider x={2} />
        <View>
          <Text style={{ color: 'white' }}>
            {exercicio.executou ? 'Finalizado' : 'Finalizou ?'}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 15, textAlign: 'center' }}>
          {exercicio.nomeExercicio}
        </Text>
      </View>
      <DataDisplayGrid fields={getFields()} numColunas={1} />
    </TouchableOpacity>
  )
}

export default ExercicioTreino
