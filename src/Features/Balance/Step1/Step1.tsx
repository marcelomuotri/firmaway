import {
  Alert,
  Box,
  Fade,
  IconButton,
  Link,
  Modal,
  Snackbar,
  Typography,
} from '@mui/material'
import { useStyles } from './step1.styles'
import { useTranslation } from 'react-i18next'
import FInput from '../../../components/FInput'
import FButton from '../../../components/FButton/FButton'
import Tick from '../../../assets/Tick'
import Info from '../../../assets/Info'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface Step1Props {
  tokenControl: any
  isButtonTokenDisabled: boolean
  postTransactions: any
  handleTokenSubmit: any
  isLoadingTransactions: boolean
  setIsStep1Ready: any
  isStep1Ready: boolean
  postTransactionsError: any
}

const Step1 = ({
  tokenControl,
  isButtonTokenDisabled,
  postTransactions,
  handleTokenSubmit,
  isLoadingTransactions,
  setIsStep1Ready,
  isStep1Ready,
  postTransactionsError,
}: Step1Props) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const onCheckToken = async (data: any) => {
    try {
      const response = await postTransactions({
        api_token: data.token,
        year: data.year ? data.year : '2024',
      })
      if (response.data) setIsStep1Ready(true)
      else setOpenSnackbar(true)
    } catch (error) {
      console.log(error)
      setOpenSnackbar(true)
    }
  }

  const getCopyConnectButton = () => {
    if (isLoadingTransactions) {
      return t('connecting')
    } else return t('connect_now')
  }

  return (
    <Fade in={true} timeout={500}>
      <Box className={styles.step2Container}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000} // 4 segundos
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            //onClose={handleClose}
            severity='error'
            variant='filled'
            sx={{ width: '100%' }}
          >
            {postTransactionsError?.data?.message}
          </Alert>
        </Snackbar>

        <Modal open={isOpenModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              borderRadius: '13px',
              padding: '20px 32px',
              backgroundColor: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                sx={{ color: 'black', marginBottom: 16 }}
                onClick={() => setIsOpenModal(false)}
              >
                <CloseIcon color='black' />
              </IconButton>
            </Box>
            <Typography className={styles.modalTitle}>
              {t('tutorial_title')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              <Typography className={styles.modalSubTitle}>
                {t('tutorial_subTitle')}
              </Typography>
              <Link
                sx={{
                  marginTop: 2,
                  color: '#FF6846',
                  textDecorationColor: '#FF6846',
                  textUnderlineOffset: '2px',
                }}
                href='https://app.mercury.com/settings/tokens' // URL a abrir
                target='_blank' // ✅ Abre en una nueva pestaña
              >
                Mercury
              </Link>
            </Box>

            <iframe
              width='500'
              height='315'
              src='https://www.youtube.com/embed/f2a4UupXUqQ'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              frameBorder='0'
            ></iframe>
          </Box>
        </Modal>
        <Box className={styles.step2Content}>
          <Typography className={styles.title}>{t('step2_title')}</Typography>
          <Typography className={styles.subTitle}>
            {t('step2_subtitle')}
          </Typography>
          <Box className={styles.tutorialContainer}>
            <Typography className={styles.tutorial}>
              {t('step2_dontKnowHow')}
            </Typography>
            <Typography
              onClick={() => setIsOpenModal(true)}
              className={styles.tutorialLink}
            >
              {t('step2_learn')}
            </Typography>
          </Box>
          <Box
            style={{
              width: '100%',
              marginBottom: 27,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <FInput
              type='text'
              control={tokenControl}
              name='token'
              placeholder='Ingresa tu API Key'
              label='API Key'
            />
            <FInput
              type='select'
              control={tokenControl}
              name='year'
              label='Periodo fiscal'
              options={['2021', '2022', '2023', '2024'].map((year) => ({
                value: year,
                label: year,
              }))} // ✅ Años fiscales
              defaultValue='2024'
            />
          </Box>

          {isStep1Ready ? (
            <FButton
              title='Conexion exitosa'
              fullWidth
              endIcon={<Tick />}
              onClick={() => {}}
              sx={{ backgroundColor: '#5EA17B', color: 'white' }}
            />
          ) : (
            <FButton
              title={getCopyConnectButton()}
              fullWidth
              endIcon={<Tick />}
              onClick={handleTokenSubmit(onCheckToken)}
              disabled={isButtonTokenDisabled}
              loading={isLoadingTransactions}
            />
          )}

          <Box
            sx={{
              display: 'flex',
              paddingTop: '12px',
              fontSize: '12px',
              color: '#024675',
              gap: 6,
            }}
          >
            <Info />
            <Typography>
              Al continuar, aceptas los{' '}
              <Link
                href='https://firmaway.us/terms-balancito/'
                target='_blank'
                underline='hover'
                sx={{ fontWeight: 'bold' }}
              >
                Términos de servicio
              </Link>{' '}
              y la{' '}
              <Link
                href='https://firmaway.us/privacy-balancito/'
                target='_blank'
                underline='hover'
                sx={{ fontWeight: 'bold' }}
              >
                Política de privacidad
              </Link>{' '}
              de Firmaway.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}

export default Step1
