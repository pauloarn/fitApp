import { Button, Dialog, Portal } from 'react-native-paper'
import { TreinoSet } from '../../../../database/model/Treino'
import { useEffect, useState } from 'react'
import CustomNumberInput from '../../../../components/CustomNumberInput'
import Divider from '../../../../components/Divider'
import CustomTextInput from '../../../../components/CustomTextInput'

interface ModalEditaConfigTreinoProps {
  isOpen: boolean
  handleClose: () => void
  handleConfirm: (config: TreinoSet) => void
  treinoConfig?: TreinoSet
}
const ModalEditaConfigTreino = ({
  isOpen,
  treinoConfig,
  handleConfirm,
  handleClose
}: ModalEditaConfigTreinoProps) => {
  const [observacao, setObservacao] = useState('')
  const [series, setSeries] = useState(0)
  const [repeticoes, setRepeticoes] = useState(0)

  useEffect(() => {
    if (treinoConfig) {
      setObservacao(treinoConfig.observacao)
      setSeries(treinoConfig.series)
      setRepeticoes(treinoConfig.repeticoes)
    }
  }, [treinoConfig])
  const handleSaveExercicio = () => {
    handleConfirm({ repeticoes, observacao, series })
    handleClose()
  }

  if (!isOpen) return null

  return (
    <Portal>
      <Dialog visible={isOpen} dismissable={false}>
        <Dialog.Title>Configurações do Treino</Dialog.Title>
        <Dialog.Content>
          <Divider y={1} />
          <CustomNumberInput
            label={'Séries'}
            placeholder={'Séries'}
            value={series}
            onChangeNumber={setSeries}
          />
          <Divider y={1} />
          <CustomNumberInput
            label={'Repetições'}
            placeholder={'Repetições'}
            value={repeticoes}
            onChangeNumber={setRepeticoes}
          />
          <CustomTextInput
            label={'Observação'}
            placeholder={'Observações'}
            value={observacao}
            fieldLimit={2000}
            multiline
            style={{ height: 250 }}
            onChangeText={setObservacao}
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

export default ModalEditaConfigTreino
