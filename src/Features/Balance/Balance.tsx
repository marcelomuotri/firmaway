import { Box } from '@mui/material'
import { useStyles } from './balance.styles'
import logoHeader from '../../assets/Logo Header.png'
import Stepper from '../../components/Stepper/Stepper'
import { useEffect, useState } from 'react'
import Step1 from './Step1/Step1'
import {
  useGetHubspotDataQuery,
  useRegisterCompanyMutation,
} from '../../framework/state/services/hubspotApi'
import { useForm } from 'react-hook-form'
import Step2 from './Step2/Step2'

export interface HubSpotUser {
  hubspot_id?: string
  supabase_id?: string
  company_name?: string
  ein?: string
  message?: string
  hubSpotData: HubSpotUser
}

const Balance = () => {
  const { classes: styles } = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [step1Status, setStep1Status] = useState(1)
  const [isStep1Ready, setIsStep1Ready] = useState(false)
  const [ein, setEin] = useState<string | null>(null)
  const [isButtonTokenDisabled, setIsButtonTokenDisabled] = useState(true)
  const { data: hubSpotData, isFetching: isFetchingHubspot } =
    useGetHubspotDataQuery(
      { ein: ein?.replace(/-/g, '') || '' }, // ✅ Remueve el guion antes de enviar
      { skip: !ein }
    )

  const [registerCompany, { isLoading: isRegisterLoading }] =
    useRegisterCompanyMutation()

  const {
    handleSubmit: handleRegisterSubmit,
    control: registerControl,
    watch,
    formState: { errors: registerErrors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      llcName: '',
      ein: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
    },
  })

  const {
    handleSubmit: handleTokenSubmit,
    control: tokenControl,
    formState: { errors: tokenErrors },
    watch: watchToken,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      token: '',
    },
  })

  const registerValues = watch()
  const tokenValues = watchToken()

  //////step1 check
  useEffect(() => {
    if (step1Status === 2) {
      // Paso 2: EIN encontrado → habilitamos directamente
      setIsStep1Ready(true)
    } else if (step1Status === 4) {
      // Paso 4: Registro → campos completos y sin errores
      const allFieldsFilled = Object.values(registerValues).every(
        (value) => value && String(value).trim() !== ''
      )
      const noRegisterErrors = Object.keys(registerErrors).length === 0

      setIsStep1Ready(allFieldsFilled && noRegisterErrors)
    } else {
      setIsStep1Ready(false)
    }
  }, [step1Status, registerValues, registerErrors, setIsStep1Ready])

  ////step2check
  useEffect(() => {
    if (tokenValues.token) {
      setIsButtonTokenDisabled(false)
    }
  }, [tokenValues])

  const onNextStep = async () => {
    if (step1Status === 4) {
      const { llcName, ein, name, surname, email, phone } = registerValues
      const response = await registerCompany({
        first_name: name,
        last_name: surname,
        email: email,
        phone: phone,
        ein: ein?.replace(/-/g, ''),
        company_name: llcName,
      })
      if (response.data.company_name) {
        setActiveStep(activeStep + 1)
      }
    } else {
      setActiveStep(activeStep + 1)
    }
  }

  return (
    <Box className={styles.balanceContainer}>
      <Box className={styles.headerContainer}>
        <img src={logoHeader} alt='logo' />
      </Box>
      <Stepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        isStep1Ready={isStep1Ready}
        step1Status={step1Status}
        onNextStep={onNextStep}
        isRegisterLoading={isRegisterLoading}
      />
      {activeStep === 0 && (
        <Step1
          step1Status={step1Status}
          setStep1Status={setStep1Status}
          setIsStep1Ready={setIsStep1Ready}
          hubSpotData={hubSpotData}
          isFetchingHubspot={isFetchingHubspot}
          setEin={setEin}
          registerControl={registerControl}
          registerErrors={registerErrors}
        />
      )}
      {activeStep === 1 && (
        <Step2
          tokenControl={tokenControl}
          isButtonTokenDisabled={isButtonTokenDisabled}
        />
      )}
    </Box>
  )
}

export default Balance
