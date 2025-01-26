import { makeStyles } from 'tss-react/mui'
import { Box, Theme } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'

const StepContent = ({
  title,
  subTitle,
  textKey,
  currentIndex,
  totalSteps,
}: any) => {
  const { t } = useTranslation()
  const { classes: styles } = useStyles()

  return (
    <>
      <p className={styles.step3Title}>{t(title)}</p>
      <p className={styles.step3SubTitle}>
        {typeof currentIndex === 'number' ? (
          <>
            Paso {currentIndex + 1}/{totalSteps}: {t(subTitle)}
          </>
        ) : (
          t(subTitle)
        )}
      </p>
      <Box sx={{ marginBottom: 24 }}>
        <Trans i18nKey={textKey} components={{ strong: <strong /> }} />
      </Box>
    </>
  )
}

export default StepContent

export const useStyles = makeStyles()((theme: Theme) => ({
  step3Title: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '24px',
    marginBottom: 4,
  },
  step3SubTitle: {
    color: '#6F757B', // Eliminamos el espacio extra en el color
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '18px',
    marginBottom: 16,
  },
}))
