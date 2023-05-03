import { Text, View } from 'react-native'
import { useCallback } from 'react'

export interface FieldProps {
  label: string
  value: string | number
}
interface DataDisplayGridProps {
  fields: FieldProps[]
  numColunas: number
}

const DataDisplayGrid = ({ fields, numColunas = 2 }: DataDisplayGridProps) => {
  const montaColunas = useCallback(() => {
    const colunas: FieldProps[][] = []
    for (var i = 0; i < fields.length; i = i + numColunas) {
      colunas.push(fields.slice(i, i + numColunas))
    }
    return colunas
  }, [numColunas])

  return (
    <View
      style={{
        marginTop: 5,
        width: `100%`,
        paddingHorizontal: '5%'
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        {montaColunas().map((field) => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
              }}
            >
              {field.map((f) => {
                return (
                  <View
                    style={{
                      width: `${100 / numColunas}%`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <Text style={{ marginRight: 5 }}>{f.label}: </Text>
                    <Text style={{ fontWeight: 'bold' }}>{f.value}</Text>
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default DataDisplayGrid
