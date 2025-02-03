import { makeStyles } from 'tss-react/mui'
import { Box, Theme, Typography } from '@mui/material'
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
      <p className={styles.step3Title}>
        {typeof currentIndex === 'number' ? (
          <>
            Paso {currentIndex + 1} de {totalSteps}: {t(subTitle)}
          </>
        ) : (
          t(subTitle)
        )}
      </p>
      <Typography sx={{ fontSize: 16, marginBottom: 12 }}>
        Identifica únicamente
      </Typography>
      <Box sx={{ marginBottom: 24 }}>
        <Trans i18nKey={textKey} components={{ strong: <strong /> }} />
      </Box>
      {currentIndex === 0 && (
        <Box sx={{ marginBottom: 24 }}>
          <Trans
            i18nKey={'step3_textBis'}
            components={{ strong: <strong /> }}
          />
        </Box>
      )}
      <Typography sx={{ fontSize: 16, marginBottom: 16, marginTop: 8 }}>
        Deja sin clasificar aquellas que no correspondan a estas categorías.
      </Typography>
    </>
  )
}

export default StepContent

export const useStyles = makeStyles()((theme: Theme) => ({
  step3Title: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '24px',
    marginBottom: 16,
    marginTop: 0,
  },
  step3SubTitle: {
    color: '#6F757B', // Eliminamos el espacio extra en el color
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '18px',
    marginBottom: 16,
  },
}))
