import React, { ReactNode } from 'react'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Typography,
  Box,
  Autocomplete,
  FormGroup,
} from '@mui/material'
import { Controller, Control, FieldError } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'
import { theme } from '../framework/theme/theme'

interface GenericInputProps {
  name: string
  control: Control<any>
  label?: string
  error?: FieldError
  rules?: any
  type:
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'phone'
    | 'checkbox'
    | 'radio'
    | 'password'
    | 'autocomplete'
    | 'checkboxGroup'
    | 'ein' // ✅ Nuevo tipo para EIN
  placeholder?: string
  options?: { value: string; label: string }[]
  defaultValue?: any
  helperText?: string
  width?: string | number
  height?: string | number
  rows?: number
  sx?: any
  validationType?: 'email' | 'phone' | 'number' | 'text' | 'ein' // ✅ Validación EIN
  disabled?: boolean
}

interface InputWithTitleProps {
  label?: string
  children: ReactNode
}

const InputWithTitle: React.FC<InputWithTitleProps> = ({ label, children }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}
    >
      {label && (
        <Typography
          sx={{
            color: theme.palette.common.black,
            fontWeight: 400,
            fontSize: 14,
          }}
        >
          {label}
        </Typography>
      )}
      {children}
    </Box>
  )
}

// ✅ Función para formatear el EIN en tiempo real
const formatEIN = (value: string) => {
  const cleaned = value.replace(/\D/g, '') // Elimina caracteres no numéricos
  if (cleaned.length <= 2) return cleaned
  if (cleaned.length <= 9) return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`
  return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 9)}`
}

const FInput: React.FC<GenericInputProps> = ({
  name,
  control,
  label,
  error,
  rules,
  type,
  placeholder,
  options = [],
  helperText = '',
  width = '100%',
  rows = 1,
  validationType,
  disabled,
  ...props
}) => {
  const getValidationRules = (validationType: string) => {
    switch (validationType) {
      case 'email':
        return {
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'La dirección de email es inválida',
          },
        }
      case 'phone':
        return {
          pattern: { value: /^\d{10}$/, message: 'El teléfono es inválido' },
        }
      case 'number':
        return {
          pattern: { value: /^\d+$/, message: 'Solo se admiten números' },
        }
      case 'ein': // ✅ Validación EIN
        return {
          pattern: {
            value: /^\d{2}-\d{7}$/,
            message: 'El EIN debe tener el formato XX-XXXXXXX',
          },
        }
      case 'text':
        return {
          pattern: { value: /^[a-zA-Z ]*$/, message: 'Solo se admite texto' },
        }
      default:
        return {}
    }
  }

  const validationRules = { ...rules, ...getValidationRules(validationType) }

  const renderInput = (field: any) => {
    switch (type) {
      case 'text':
      case 'number':
      case 'phone':
      case 'password':
      case 'ein': // ✅ EIN como un tipo de input especial
        return (
          <InputWithTitle label={label}>
            <TextField
              {...field}
              {...props}
              type='text' // EIN debe ser tratado como string con formato
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error.message : helperText}
              variant='outlined'
              InputLabelProps={{ shrink: false }}
              fullWidth
              size='small'
              rows={rows}
              multiline={rows > 1}
              disabled={disabled}
              value={type === 'ein' ? formatEIN(field.value) : field.value} // ✅ Aplica formato EIN
              onChange={(e) => {
                const formattedValue =
                  type === 'ein' ? formatEIN(e.target.value) : e.target.value
                field.onChange(formattedValue)
              }}
            />
          </InputWithTitle>
        )
      case 'select':
        return (
          <FormControl
            error={!!error}
            fullWidth
            variant='outlined'
            style={{ width }}
          >
            <InputWithTitle label={label}>
              <Select
                {...field}
                {...props}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                disabled={disabled}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </InputWithTitle>
            {helperText && (
              <FormHelperText>
                {error ? error.message : helperText}
              </FormHelperText>
            )}
          </FormControl>
        )
      default:
        return null
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field }) => renderInput(field)}
    />
  )
}

export default FInput
