import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStyles } from './stepper.styles'
import FButton from '../FButton/FButton'

interface StepperProps {
  activeStep: number
  setActiveStep: (activeStep: number) => void
  isStep1Ready: boolean
  step1Status: number
  onNextStep: () => void
  isRegisterLoading: boolean
}

const Stepper = ({
  activeStep,
  setActiveStep,
  isStep1Ready,
  step1Status,
  onNextStep,
  isRegisterLoading,
}: StepperProps) => {
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
          const isCompleted = index < activeStep
          const isCurrent = index === activeStep
          const isActiveOrCompleted = isCompleted || isCurrent
          return (
            <Box
              key={step.label}
              className={`${styles.step} ${isActiveOrCompleted ? styles.active : ''}`}
            >
              <Box
                className={`${styles.stepConnector} ${
                  isActiveOrCompleted ? styles.activeConnector : ''
                }`}
              />
              <Typography className={styles.stepText}>{step.label}</Typography>
            </Box>
          )
        })}
      </Box>
      <FButton
        disabled={!isStep1Ready}
        //className={styles.continueButton}
        onClick={onNextStep}
        title={step1Status === 4 ? t('register') : t('continue')}
        loading={isRegisterLoading}
        size={'small'}
        textClassName={styles.continueButton}
      />
    </Box>
  )
}

export default Stepper
