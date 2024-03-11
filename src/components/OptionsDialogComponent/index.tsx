import { Modal, Text, TouchableOpacity, View } from 'react-native'
import useStyles from './styles'

interface OptionsDialogComponentProps {
  isOptionsDialogOpen: boolean
  handleCloseDialogOption: () => void
  options: OptionsDialogInterface[]
}

export interface OptionsDialogInterface {
  label: string
  onPress: () => void
}

const OptionsDialogComponent = ({
  isOptionsDialogOpen,
  handleCloseDialogOption,
  options
}: OptionsDialogComponentProps) => {
  const styles = useStyles()
  const finalOptions: OptionsDialogInterface[] = [
    ...options,
    { label: `Cancelar`, onPress: handleCloseDialogOption }
  ]

  return (
    <Modal visible={isOptionsDialogOpen} transparent={true}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={handleCloseDialogOption}
      >
        <View style={styles.secondaryBackContainer}>
          {finalOptions.map((op, index) => {
            return (
              <View key={op.label} style={styles.optionContainer}>
                {index === finalOptions.length - 1 ? (
                  <View style={styles.lineSeparator} />
                ) : null}
                <TouchableOpacity
                  onPress={op.onPress}
                  style={styles.optionButton}
                >
                  <Text style={{ color: `white` }}>{op.label}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default OptionsDialogComponent
