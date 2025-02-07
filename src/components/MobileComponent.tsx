import { makeStyles } from 'tss-react/mui'
import logo from '../assets/Logo Header.png'
import logoBalancito from '../assets/balancitoChar.png'
import { Box, TextField, Typography } from '@mui/material'
import FButton from './FButton/FButton'
import RightChevron from '../assets/RightChevron'
import { useState } from 'react'
import { usePostEmailMutation } from '../framework/state/services/emailService'

const MobileComponent = () => {
  const { classes: styles } = useStyles()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successScreen, setSuccessScreen] = useState(false)
  const [postEmail, { isLoading }] = usePostEmailMutation()

  const handleSendLink = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(email)) {
      setError('')
      await postEmail({ email })
      setSuccessScreen(true)
    } else {
      setError('El formato del correo electrónico es inválido')
    }
  }

  return (
    <Box className={styles.mobileContainer}>
      <img src={logo} alt='logo' style={{ width: '123px' }} />
      <img
        src={logoBalancito}
        alt='logoBalancito'
        className={styles.logoBalancito}
      />
      {!successScreen ? (
        <Box>
          <Typography className={styles.title}>
            Oops... Balancito es solo para computadoras
          </Typography>
          <Typography className={styles.subtitle}>
            Por ahora, Balancito solo funciona en computadoras. Déjanos tu
            correo y te enviamos el enlace directo para que accedas desde tu PC
            o laptop.
          </Typography>
          <TextField
            label=''
            fullWidth
            className={styles.textField}
            placeholder='Correo electrónico'
            onChange={(e) => setEmail(e.target.value)}
          />
          <FButton
            title='Enviar enlace'
            onClick={handleSendLink}
            fullWidth
            startIcon={<RightChevron />}
            loading={isLoading}
          />
          {error && <Typography className={styles.error}>{error}</Typography>}
        </Box>
      ) : (
        <Box>
          <Typography className={styles.title}>
            ✅ ¡Listo! Enlace enviado.
          </Typography>
          <Typography className={styles.subtitle}>
            Revisa tu bandeja de entrada (y spam, por si acaso). Te enviamos un
            enlace para que accedas a Balancito desde tu computadora.
          </Typography>
          <Typography className={styles.subtitle}>
            {' '}
            🔎 ¿No llegó el correo? Espera unos minutos o intenta nuevamente.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default MobileComponent

export const useStyles = makeStyles()((theme: Theme) => ({
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBalancito: {
    marginTop: 120,
    width: '54px',
    marginBottom: 24,
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '26px',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    marginBottom: 32,
    textAlign: 'center',
  },
  textField: {
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: 8,
  },
}))
