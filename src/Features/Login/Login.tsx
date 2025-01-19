import { useEffect } from 'react'
import { fetchFromSchema } from '../../framework/supabase/fetch'
import { supabase } from '../../../supabaseClient'
import { useStyles } from './login.styles'
import { useForm } from 'react-hook-form'
import FInput from '../../components/FInput'
import { LoginProps } from '../../types/login'
import { Box } from '@mui/material'
import FButton from '../../components/FButton/FButton'

const Login = () => {
  const { classes: styles } = useStyles()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>()

  // useEffect(() => {
  //   const fetch = async () => {
  //     const data = await fetchFromSchema('account_types')
  //   }
  //   fetch()
  // }, [])
  const onLogin = () => {}

  return (
    <Box className={styles.loginContainer}>
      <FInput type='text' name='email' label='email' control={control} />
      <FInput type='text' name='password' label='password' control={control} />
      <FButton onClick={onLogin} title='LOGIN' />
    </Box>
  )
}

export default Login
