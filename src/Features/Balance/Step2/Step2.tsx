import { Box, Link, Typography } from '@mui/material'
import { useStyles } from './step2.styles'
import { useTranslation } from 'react-i18next'
import FInput from '../../../components/FInput'
import FButton from '../../../components/FButton/FButton'
import Tick from '../../../assets/Tick'
import Info from '../../../assets/Info'

interface Step2Props {
  tokenControl: any
  isButtonTokenDisabled: boolean
}

const Step2 = ({ tokenControl, isButtonTokenDisabled }: Step2Props) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()

  const onCheckToken = () => {
    console.log('onCheckToken')
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
        <Box style={{ width: '100%', marginBottom: 27 }}>
          <FInput
            type='text'
            control={tokenControl}
            name='token'
            placeholder='Ingresa tu API Key'
          />
        </Box>

        <FButton
          title={t('connect_now')}
          fullWidth
          endIcon={<Tick />}
          onClick={onCheckToken}
          disabled={isButtonTokenDisabled}
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

export default Step2
