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
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { theme } from '../framework/theme/theme'

const useStyles = makeStyles()((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
}))

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
  placeholder?: string
  options?: { value: string; label: string }[] // For select and radio
  defaultValue?: any
  helperText?: string
  width?: string | number // Prop para el ancho
  height?: string | number // Prop para la altura
  rows?: number // Prop para el número de filas
  sx?: any
  validationType?: 'email' | 'phone' | 'number' | 'text'
  disabled?: boolean
}

interface InputWithTitleProps {
  label?: string
  children: ReactNode
}

const InputWithTitle: React.FC<InputWithTitleProps> = ({ label, children }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}
    >
      <Typography
        sx={{
          color: theme.palette.common.black,
          fontWeight: 400,
          fontSize: 14,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  )
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
  width = '100%', // Valor predeterminado de 230px
  rows = 1,
  validationType,
  disabled,
  ...props
}) => {
  const { classes } = useStyles()

  const getValidationRules = (validationType: string) => {
    switch (validationType) {
      case 'email':
        return {
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'La direccion de email es invalida',
          },
        }
      case 'phone':
        return {
          pattern: {
            value: /^\d{10}$/,
            message: 'el telefono es invalido',
          },
        }
      case 'number':
        return {
          pattern: {
            value: /^\d+$/,
            message: 'Solo se admiten numeros',
          },
        }
      case 'text':
        return {
          pattern: {
            value: /^[a-zA-Z ]*$/,
            message: 'Solo se admite texto',
          },
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
        return (
          <InputWithTitle label={label}>
            <TextField
              type={type === 'phone' ? 'tel' : type}
              {...field}
              {...props}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error.message : helperText}
              variant='outlined'
              InputLabelProps={{
                shrink: false,
              }}
              fullWidth
              size='small'
              rows={rows}
              multiline={rows > 1}
              disabled={disabled}
            />
          </InputWithTitle>
        )
      case 'select':
        return (
          <FormControl
            className={classes.input}
            error={!!error}
            fullWidth
            variant='outlined'
            style={{ width }} // Aplicar el ancho personalizado
          >
            <InputWithTitle label={label}>
              <Select
                {...field}
                {...props}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <p style={{ color: 'rgb(117 117 117 / 46%)' }}>
                        {placeholder}
                      </p>
                    )
                  }
                  return options.find((option) => option.value === selected)
                    ?.label
                }}
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
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                sx={{ paddingBottom: 0, paddingRight: 4 }}
                {...field}
                checked={field.value}
                {...props}
              />
            }
            label={label}
            sx={{ alignItems: 'end' }}
          />
        )
      case 'checkboxGroup':
        return (
          <Box>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      sx={{ paddingRight: 4 }}
                      {...field}
                      checked={field.value.includes(option.value)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...field.value, option.value]
                          : field.value.filter((val) => val !== option.value)
                        field.onChange(newValue)
                      }}
                      {...props}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </Box>
        )
      case 'radio':
        return (
          <FormControl
            component='fieldset'
            className={classes.input}
            error={!!error}
            style={{ width }} // Aplicar el ancho personalizado
          >
            <Typography
              sx={{
                color: theme.palette.common.black,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {label}
            </Typography>
            <RadioGroup {...field} {...props} row>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {helperText && (
              <FormHelperText>
                {error ? error.message : helperText}
              </FormHelperText>
            )}
          </FormControl>
        )
      case 'autocomplete':
        return (
          <InputWithTitle label={label}>
            <Autocomplete
              {...field}
              {...props}
              id='free-solo-demo'
              freeSolo
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error ? error.message : helperText}
                  variant='outlined'
                  size='small'
                  placeholder={placeholder}
                />
              )}
              onChange={(_, data) => field.onChange(data)}
              onInputChange={(event, newInputValue) => {
                if (!options.includes(newInputValue)) {
                  console.log(newInputValue)
                  field.onChange(newInputValue)
                }
              }}
              disabled={disabled}
            />
          </InputWithTitle>
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
