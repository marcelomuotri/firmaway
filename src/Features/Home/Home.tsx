import { useStyles } from './home.styles'
import { Box, Link, Typography } from '@mui/material'
import logo from '../../assets/Logo Header.png'
import FButton from '../../components/FButton/FButton'
import { useNavigate } from 'react-router-dom'
import Balancito from '../../assets/balancitoChar.png'
import RightChevron from '../../assets/RightChevron.tsx'
import Info from '../../assets/Info.tsx'
import Warning from '../../assets/Warning.tsx'

const Login = () => {
  const { classes: styles } = useStyles()
  const navigate = useNavigate()

  const onClickStart = () => {
    navigate('/balance')
  }

  return (
    <Box className={styles.homeContainer}>
      <Box className={styles.headerContainer}>
        <img src={logo} alt='logobalancito' style={{ width: '123px' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '90vh',
          alignItems: 'center',
        }}
      >
        <Box className={styles.bodyContainer}>
          <Box className={styles.leftSide}>
            <Typography className={styles.title}>
              ¡Bienvenido a Balancito! 👋
            </Typography>
            <Typography className={styles.subTitle}>
              Tu balance contable en simples pasos:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <Box className={styles.stepsContainer}>
                <Typography className={styles.stepNumber}>01</Typography>
                <Typography sx={{ width: 248 }} className={styles.stepText}>
                  Completa la información de tu empresa. Ten a mano tu EIN.
                </Typography>
              </Box>
              <Box className={styles.stepsContainer}>
                <Typography className={styles.stepNumber}>02</Typography>
                <Typography sx={{ width: 268 }} className={styles.stepText}>
                  Conecta tu cuenta de Mercury para conocer tus transacciones de
                  manera segura.
                </Typography>
              </Box>
              <Box className={styles.stepsContainer}>
                <Typography className={styles.stepNumber}>03</Typography>
                <Typography sx={{ width: 248 }} className={styles.stepText}>
                  Clasifica tus cuentas y transacciones fácilmente en
                  categorías.
                </Typography>
              </Box>
              <Box className={styles.stepsContainer}>
                <Typography className={styles.stepNumber}>04</Typography>
                <Typography sx={{ width: 248 }} className={styles.stepText}>
                  Descarga tu balance contable organizado y listo para usar.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={styles.rightSide}>
            <img src={Balancito} alt='balancitoChart' style={{ width: 54 }} />
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: 16,
                lineHeight: '22px',
                color: '#232E39',
              }}
            >
              Soy tu asistente inteligente para preparar el Balance Contable de
              tu LLC.
            </Typography>
            <Box sx={{ paddingTop: 16, width: '100%' }}>
              <FButton
                onClick={onClickStart}
                fullWidth
                startIcon={<RightChevron />}
                title='Iniciar'
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                fontSize: '12px',
                color: '#024675',
                gap: 6,
              }}
            >
              <Warning />
              <Typography sx={{ fontSize: 12 }}>
                No recomendamos usar Balancito si tu LLC debe pagar impuestos en
                Estados Unidos. Conoce más{' '}
                <Link
                  target='_blank'
                  href='https://firmaway.us/que-impuestos-en-estados-unidos-llc/'
                  underline='hover'
                  sx={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                  }}
                >
                  aquí
                </Link>{' '}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
