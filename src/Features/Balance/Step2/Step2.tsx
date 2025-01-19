import { Box, Typography } from '@mui/material'
import { useStyles } from './step2.styles'
import { useTranslation } from 'react-i18next'

const Step2 = () => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  return (
    <Box className={styles.step2Container}>
      <Box className={styles.step2Content}>
        <Typography className={styles.title}>{t('step2_title')}</Typography>
        <Typography className={styles.subTitle}>
          {t('step2_subtitle')}
        </Typography>
      </Box>
    </Box>
  )
}

export default Step2
