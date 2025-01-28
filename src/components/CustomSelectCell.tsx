import { MenuItem, Select } from '@mui/material'

const CustomSelectCell = ({
  params,
  currentStep,
  onSelectChange,
  categoriesByStep,
  options = [], // Nueva propiedad opcional
}: any) => {
  const value = params.value || '' // Valor actual (tag_name)

  const handleChange = (event) => {
    const newVal = event.target.value
    onSelectChange(params.row.id, newVal)
  }

  // 1️⃣ Si hay `currentStep` y `categoriesByStep`, usa esas opciones.
  // 2️⃣ Si hay `options`, usa esas opciones directamente.
  // 3️⃣ Si no hay nada, muestra un aviso en consola.
  const stepCategories =
    categoriesByStep && currentStep
      ? categoriesByStep[currentStep] || []
      : options

  if (!stepCategories || stepCategories.length === 0) {
    console.warn('⚠ CustomSelectCell: No hay opciones para seleccionar.')
  }

  return (
    <Select
      value={value}
      onChange={handleChange}
      size='small'
      fullWidth
      displayEmpty
      disabled={stepCategories.length === 0} // Deshabilita si no hay opciones
      sx={{
        background: '#ECEDEF!important',
        borderRadius: '8px!important',
        height: '30px',
      }}
    >
      <MenuItem value='' sx={{ fontSize: '14px' }}>
        {stepCategories.length === 0
          ? 'Sin opciones disponibles'
          : 'Seleccionar'}
      </MenuItem>
      {stepCategories.map((option) => (
        <MenuItem
          sx={{ fontSize: '14px', display: 'flex', gap: '8px' }}
          key={option}
          value={option}
        >
          {option} <span>{getTagIcon(option)}</span>
        </MenuItem>
      ))}
    </Select>
  )
}

export default CustomSelectCell

const getTagIcon = (tagName: string) => {
  const icons: { [key: string]: string } = {
    'Cuentas de propietarios': '👤',
    'Cuentas de la misma empresa': '🏢',
    'Gastos personales': '🛍️',
    Inversiones: '📊',
    Préstamos: '🤝',
    Ingresos: '💵',
    Gastos: '📉',
    'Retiros de Propietarios': '🏦',
    'Depósitos de Propietarios': '💳',
    Reembolso: '🔄',
  }

  return icons[tagName] || '❓' // 🔹 Icono por defecto si no hay coincidencia
}
