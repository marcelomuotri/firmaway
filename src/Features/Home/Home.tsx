import { useStyles } from './home.styles'
import { Box, Typography } from '@mui/material'
import logo from '../../assets/logoBalancito.png'
import FButton from '../../components/FButton/FButton'

const Login = () => {
  const { classes: styles } = useStyles()

  const onClickStart = () => {
    console.log('holis')
  }

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
          <FButton title='Empezar' fullWidth={true} onClick={onClickStart} />
        </Box>
      </Box>
    </Box>
  )
}

export default Login
