import { Button, Dialog, Portal } from 'react-native-paper'
import { SelectOptions } from '../DropDown/types'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import useStyles from './styles'

interface DialogOptionsProps {
  isOpen: boolean
  title: string

  items: SelectOptions[]
  handleClose: () => void

  onValueChange(selectedItem: SelectOptions | null): void
}
const DialogOptions = ({
  isOpen,
  title,
  items,
  onValueChange,
  handleClose
}: DialogOptionsProps) => {
  const styles = useStyles()
  const getHeight = () => {
    if (items?.length > 10) {
      return 300
    }
    return items.length * 40
  }
  const handleSelectItem = (itemSelected: SelectOptions) => {
    handleClose()
    onValueChange(itemSelected)
  }

  const handleDismiss = () => {
    onValueChange(null)
    handleClose()
  }

  return (
    <Portal>
      <Dialog visible={isOpen} dismissable={false}>
        <Dialog.Title
          style={{ fontSize: 20, height: 30, marginTop: 0, padding: 0 }}
        >
          {title}
        </Dialog.Title>
        <Dialog.ScrollArea style={{ height: getHeight() }}>
          <ScrollView style={styles.itemsContainer}>
            {items.length > 0 ? (
              <>
                {items.map((item, index) => (
                  <TouchableOpacity
                    style={styles.itemBtn}
                    onPress={() => handleSelectItem(item)}
                    key={index}
                  >
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <Text>Não possui opções</Text>
            )}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancelar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default DialogOptions
