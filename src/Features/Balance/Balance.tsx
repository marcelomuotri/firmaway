import { Box } from '@mui/material'
import { useStyles } from './balance.styles'
import logoHeader from '../../assets/Logo Header.png'
import Stepper from '../../components/Stepper/Stepper'
import { useState } from 'react'
import Step1 from './Step1/Step1'

const Balance = () => {
  const { classes: styles } = useStyles()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Box className={styles.balanceContainer}>
      <Box className={styles.headerContainer}>
        <img src={logoHeader} alt='logo' />
      </Box>
      <Stepper activeStep={activeStep} />
      {activeStep === 0 && <Step1 />}
    </Box>
  )
}

export default Balance
