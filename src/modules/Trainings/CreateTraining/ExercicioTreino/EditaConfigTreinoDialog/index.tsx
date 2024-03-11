import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { ExercicioSetup } from '../../../../../database/model/ExercicioTreinoConfig'
import CustomNumberInput from '../../../../../components/CustomNumberInput'
import { useState } from 'react'
import Divider from '../../../../../components/Divider'
import { Undefined } from '../../../../../types/genericTypes'

interface EditaConfigTreinoDialogProps {
  isOpen: boolean
  handleClose: () => void
  nomeExercicio: string
  handleSave: (ex: ExercicioSetup) => void
  exercicio: ExercicioSetup
}
const EditaConfigTreinoDialog = ({
  isOpen,
  handleSave,
  nomeExercicio,
  handleClose,
  exercicio
}: EditaConfigTreinoDialogProps) => {
  const [carga, setCarga] = useState<Undefined<number>>(exercicio?.carga || 0)
  const [series, setSeries] = useState<Undefined<number>>(
    exercicio?.series || 0
  )
  const [repeticoes, setRepeticoes] = useState<Undefined<number>>(
    exercicio?.repeticoes || 0
  )

  const handleSaveExercicio = () => {
    handleSave({
      repeticoes: repeticoes ?? 0,
      carga: carga ?? 0,
      series: series ?? 0
    })
    handleClose()
  }

  if (!isOpen) return null

  return (
    <Portal>
      <Dialog visible={isOpen} dismissable={false}>
        <Dialog.Title>{nomeExercicio}</Dialog.Title>
        <Dialog.Content>
          <CustomNumberInput
            placeholder={'Carga'}
            endIcon={<TextInput.Affix text={'KG'} />}
            value={carga}
            onChangeNumber={setCarga}
          />
          <Divider y={1} />
          <CustomNumberInput
            placeholder={'Séries'}
            value={series}
            onChangeNumber={setSeries}
          />
          <Divider y={1} />
          <CustomNumberInput
            placeholder={'Repetições'}
            value={repeticoes}
            onChangeNumber={setRepeticoes}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleClose}>Cancelar</Button>
          <Button onPress={handleSaveExercicio}>Salvar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default EditaConfigTreinoDialog
