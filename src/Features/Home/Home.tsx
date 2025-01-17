import { useStyles } from './home.styles'
import { Box, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import FButton from '../../components/FButton/FButton'

const Login = () => {
  const { classes: styles } = useStyles()

  return (
    <Box className={styles.homeContainer}>
      <Box className={styles.homeContent}>
        <Box
          sx={{
            padding: '79px 97px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ marginBottom: 24 }}>
            <img src={logo} alt='Logo' />
          </Box>
          <Typography className={styles.title}>
            Bienvenido a balancito 👋
          </Typography>
          <Typography className={styles.text}>
            Prepara un Balance Contable Simplificado en minutos y úsalo para
            declarar impuestos con tu LLC.
          </Typography>
          <FButton title='Empezar' fullWidth={true} />
        </Box>
      </Box>
    </Box>
  )
}

export default Login
