import { Box, Fade, Typography } from '@mui/material'
import { useStyles } from './step4.styles'
import { useTranslation } from 'react-i18next'
import FInput from '../../../components/FInput'
import Info from '../../../assets/Info'
import FTooltip from '../../../components/FTooltip'

interface Step1Props {
  registerControl: any
  registerErrors: any
  showCongratulations: any
}

const Step4 = ({
  registerControl,
  registerErrors,
  showCongratulations,
}: Step1Props) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()

  return (
    <Fade in={true} timeout={500}>
      <Box className={styles.step4Container}>
        <Box className={styles.step4Content}>
          <Fade in={true}>
            {showCongratulations ? (
              <Box sx={{ maxWidth: 450, height: '60vh', marginTop: 80 }}>
                <Typography className={styles.title}>
                  🎉 ¡Tu descarga está lista!
                </Typography>
                <Typography sx={{ marginBottom: 24, textAlign: 'center' }}>
                  ¡Genial! Ya tienes el balance clasificado de todas tus
                  transacciones del año en Mercury.
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>
                  En breve, te redirigiremos a nuestro sitio web para más
                  información.
                </Typography>
              </Box>
            ) : (
              <Box>
                <Box>
                  <Typography className={styles.title}>
                    {t('step4_balanceReady')}
                  </Typography>
                </Box>
                <Typography className={styles.subTitle}>
                  {t('step4_subtitle')}
                </Typography>

                <Box className={styles.step4InputContainer}>
                  <FInput
                    type='text'
                    control={registerControl}
                    name='llcName'
                    label={t('llcName')}
                    placeholder={t('llc_placeholder')}
                  />
                  <FInput
                    type='ein'
                    control={registerControl}
                    name='ein'
                    label={t('EIN')}
                    placeholder={t('ein_placeholder')}
                    tooltip="El número de identificación del empleador o EIN se usa para identificar a una entidad comercial."
                  />
                  <FInput
                    type='text'
                    control={registerControl}
                    name='name'
                    label={t('names')}
                    placeholder={t('name_placeholder')}
                  />
                  <FInput
                    type='text'
                    control={registerControl}
                    name='surname'
                    label={t('surnames')}
                    placeholder={t('surname_placeholder')}
                  />
                  <FInput
                    type='text'
                    control={registerControl}
                    name='email'
                    label={t('email')}
                    validationType='email'
                    error={registerErrors.email}
                    placeholder={t('email_placeholder')}
                  />
                  <FInput
                    type='phone'
                    control={registerControl}
                    name='phone'
                    label={t('phone')}
                    placeholder={t('phone_placeholder')}
                  />
                </Box>
                <Box className={styles.footerContainer}>
                  <Info color='#4B4E51' />
                  <Typography className={styles.footer}>
                    {t('step4_footer')}
                  </Typography>
                </Box>
              </Box>
            )}
          </Fade>
        </Box>
      </Box>
    </Fade>
  )
}

export default Step4
