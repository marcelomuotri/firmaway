import { Select, MenuItem } from '@mui/material'
import { GridRenderEditCellParams } from '@mui/x-data-grid'

function CategorySelectEditCell(props: GridRenderEditCellParams) {
  const { id, value, api, field } = props

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    // 1. Avisarle al Data Grid que actualice el valor de la celda
    await api.setEditCellValue({ id, field, value: event.target.value })
    // 2. Finalizar modo edición
    api.stopCellEditMode({ id, field })
  }

  return (
    <Select
      value={value || ''} // asegurate que no sea undefined
      onChange={handleChange}
      fullWidth
      displayEmpty // esto muestra el renderValue cuando no hay selección
      renderValue={(selected) => {
        if (!selected) {
          return <p>Seleccionar</p>
        }
        return selected as string
      }}
    >
      <MenuItem disabled value=''>
        <em>Seleccioná una categoría</em>
      </MenuItem>
      <MenuItem value='Retiros a propietarios 👤'>
        Retiros a propietarios 👤
      </MenuItem>
      <MenuItem value='Cuentas de la empresa 🏢'>
        Cuentas de la empresa 🏢
      </MenuItem>
    </Select>
  )
}

export default CategorySelectEditCell
