import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStyles } from './stepper.styles'

interface StepperProps {
  activeStep: number
}

const Stepper = ({ activeStep }: StepperProps) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()

  const steps = [
    { label: t('start') },
    { label: t('connect') },
    { label: t('clasify') },
    { label: t('revise') },
  ]

  return (
    <Box className={styles.stepperContainer}>
      <Button className={styles.cancelButton}>Cancelar</Button>
      <Box className={styles.stepper}>
        {steps.map((step, index) => {
          const isActive = index === activeStep
          return (
            <Box
              key={step.label}
              className={`${styles.step} ${isActive ? styles.active : ''}`}
            >
              <Box
                className={`${styles.stepConnector} ${isActive ? styles.activeConnector : ''}`}
              ></Box>
              <Typography className={styles.stepText}>{step.label}</Typography>
            </Box>
          )
        })}
      </Box>
      <Button disabled className={styles.continueButton}>
        Continuar
      </Button>
    </Box>
  )
}

export default Stepper
