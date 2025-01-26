import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStyles } from './stepper.styles'
import FButton from '../FButton/FButton'

interface StepperProps {
  activeStep: number
  onNextStep: () => void
  isRegisterLoading: boolean
  stepperButtonDisabled: boolean
}

const Stepper = ({
  activeStep,
  onNextStep,
  isRegisterLoading,
  stepperButtonDisabled,
}: StepperProps) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()

  const steps = [
    { label: t('connect') },
    { label: t('clasify') },
    { label: t('revise') },
    { label: t('finalize') },
  ]

  return (
    <Box className={styles.stepperContainer}>
      <Button className={styles.cancelButton}></Button>
      <Box className={styles.stepper}>
        {steps.map((step, index) => {
          const isCompleted = index + 1 < activeStep
          const isCurrent = index + 1 === activeStep
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
        title={t('continue')}
        loading={isRegisterLoading}
        size={'small'}
        textClassName={styles.continueButton}
      />
    </Box>
  )
}

export default Stepper
