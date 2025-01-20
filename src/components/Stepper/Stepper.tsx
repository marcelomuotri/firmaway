import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStyles } from './stepper.styles'
import FButton from '../FButton/FButton'

interface StepperProps {
  activeStep: number
  step1Status: number
  onNextStep: () => void
  isRegisterLoading: boolean
  stepperButtonDisabled: boolean
}

const Stepper = ({
  activeStep,
  step1Status,
  onNextStep,
  isRegisterLoading,
  stepperButtonDisabled,
}: StepperProps) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()

  const steps = [
    { label: t('start') },
    { label: t('connect') },
    { label: t('clasify') },
    { label: t('revise') },
  ]

  const getContinueButtonCopy = () => {
    if (activeStep === 0 && step1Status === 4) {
      return t('register')
    } else {
      return t('continue')
    }
  }

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
        disabled={stepperButtonDisabled}
        onClick={onNextStep}
        title={getContinueButtonCopy()}
        loading={isRegisterLoading}
        size={'small'}
        textClassName={styles.continueButton}
      />
    </Box>
  )
}

export default Stepper
