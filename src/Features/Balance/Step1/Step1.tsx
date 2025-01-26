import { Box, Link, Typography } from '@mui/material'
import { useStyles } from './step1.styles'
import { useTranslation } from 'react-i18next'
import FInput from '../../../components/FInput'
import FButton from '../../../components/FButton/FButton'
import Tick from '../../../assets/Tick'
import Info from '../../../assets/Info'

interface Step1Props {
  tokenControl: any
  isButtonTokenDisabled: boolean
  postTransactions: any
  handleTokenSubmit: any
  isLoadingTransactions: boolean
  setIsStep1Ready: any
}

const Step1 = ({
  tokenControl,
  isButtonTokenDisabled,
  postTransactions,
  handleTokenSubmit,
  isLoadingTransactions,
  setIsStep1Ready,
}: Step1Props) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()

  const onCheckToken = async (data: any) => {
    try {
      const response = await postTransactions({
        api_token: data.token,
        year: data.year,
      })
      if (response.data) setIsStep1Ready(true)
    } catch (error) {
      console.log(error)
    }
  }

  const getCopyConnectButton = () => {
    if (isLoadingTransactions) {
      return t('connecting')
    } else return t('connect_now')
  }

  return (
    <Box className={styles.step2Container}>
      <Box className={styles.step2Content}>
        <Typography className={styles.title}>{t('step2_title')}</Typography>
        <Typography className={styles.subTitle}>
          {t('step2_subtitle')}
        </Typography>
        <Box className={styles.tutorialContainer}>
          <Typography className={styles.tutorial}>
            {t('step2_dontKnowHow')}
          </Typography>
          <Typography className={styles.tutorialLink}>
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
            options={['2021', '2022', '2023', '2024', '2025'].map((year) => ({
              value: year,
              label: year,
            }))} // ✅ Años fiscales
          />
        </Box>

        <FButton
          title={getCopyConnectButton()}
          fullWidth
          endIcon={<Tick />}
          onClick={handleTokenSubmit(onCheckToken)}
          disabled={isButtonTokenDisabled}
          loading={isLoadingTransactions}
        />

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
            <Link href='/terms' underline='hover' sx={{ fontWeight: 'bold' }}>
              Términos de servicio
            </Link>{' '}
            y la{' '}
            <Link href='/privacy' underline='hover' sx={{ fontWeight: 'bold' }}>
              Política de privacidad
            </Link>{' '}
            de Firmaway.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Step1
