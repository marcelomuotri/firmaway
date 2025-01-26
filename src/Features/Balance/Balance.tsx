import { Box } from '@mui/material'
import { useStyles } from './balance.styles'
import logoHeader from '../../assets/Logo Header.png'
import Stepper from '../../components/Stepper/Stepper'
import { useEffect, useState } from 'react'
//import Step1 from './Step4/Step1'
import Step1 from './Step1/Step1'
import { useRegisterCompanyMutation } from '../../framework/state/services/hubspotApi'
import { usePostTransactionsMutation } from '../../framework/state/services/transactionsApi'
import { useBalanceForm } from './hooks/useBalanceForm'
import Step2 from './Step2/Step2'
import { useGetTagsQuery } from '../../framework/state/services/tagService'
import {
  useGenerateAiMutation,
  usePostGenerateAiMutation,
} from '../../framework/state/services/generateAIApi'
import Step3 from './Step3/Step3'
import Step4 from './Step4/Step4'
import { usePostCSVMutation } from '../../framework/state/services/createCSV'

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
  const [activeStep, setActiveStep] = useState(1)
  //const [step1Status, setStep1Status] = useState(1)
  //const [isStep1Ready, setIsStep1Ready] = useState(false)
  const [isButtonTokenDisabled, setIsButtonTokenDisabled] = useState(true)
  const { data: tags } = useGetTagsQuery({})
  const [isStep1Ready, setIsStep1Ready] = useState(false)
  const [isStep2Ready, setIsStep2Ready] = useState(false)
  const [isStep4Ready, setIsStep4Ready] = useState(false)
  const [currentIndex2, setCurrentIndex2] = useState(0)
  const [tableDatastep2, setTableDataStep2] = useState<any[]>([])
  const [tableDatastep3, setTableDataStep3] = useState<any[]>([])

  // const { data: hubSpotData, isFetching: isFetchingHubspot } =
  //   useGetHubspotDataQuery(
  //     { ein: ein?.replace(/-/g, '') || '' },
  //     { skip: !ein }
  //   )

  const [
    postTransactions,
    { data: transactions, isLoading: isLoadingTransactions },
  ] = usePostTransactionsMutation()

  const [registerCompany, { isLoading: isRegisterLoading }] =
    useRegisterCompanyMutation()

  const [
    generateAi,
    { data: transactionsWithDesciption, isLoading: isGenerateAiLoading },
  ] = usePostGenerateAiMutation()

  const [postCSV, { data: csvData, isLoading: isCSVLoading }] =
    usePostCSVMutation()

  const {
    watchRegister,
    registerControl,
    registerErrors,
    handleTokenSubmit,
    tokenControl,
    watchToken,
  } = useBalanceForm()

  const registerValues = watchRegister()
  const tokenValues = watchToken()

  useEffect(() => {
    const allFieldsFilled = Object.values(registerValues).every(
      (value) => value !== '' && value !== null && value !== undefined
    )
    const hasErrors = Object.keys(registerErrors).length > 0

    setIsStep4Ready(allFieldsFilled && !hasErrors)
  }, [registerValues, registerErrors])

  useEffect(() => {
    if (tokenValues.token && tokenValues.year) {
      setIsButtonTokenDisabled(false)
    } else {
      setIsButtonTokenDisabled(true)
    }
  }, [tokenValues])

  const onNextStep = async () => {
    if (activeStep === 2 && !isStep2Ready) {
      setCurrentIndex2(currentIndex2 + 1)
    } else if (activeStep === 2 && isStep2Ready) {
      //generat
      function filterTransactions(transactions) {
        return transactions.map(({ id, tag_id, tag_name, batchId }) => ({
          id,
          tag_id,
          tag_name,
          batchId,
        }))
      }
      const filteredTransactions = filterTransactions(tableDatastep2)
      generateAi(filteredTransactions)
      setActiveStep(activeStep + 1)
    } else if (activeStep === 4) {
      registerCompany({
        first_name: registerValues.name,
        last_name: registerValues.surname,
        email: registerValues.email,
        phone: registerValues.phone,
        ein: registerValues.ein.replace(/-/g, ''),
        company_name: registerValues.llcName,
      })
      const data = await postCSV([{ transacciones: tableDatastep3 }])
      if (data) window.location.href = 'https://www.google.com'
    } else setActiveStep(activeStep + 1)
  }

  const stepperButtonDisabled =
    (activeStep === 1 && !isStep1Ready) || (activeStep === 4 && !isStep4Ready)

  const isStepperLoading = isRegisterLoading || isCSVLoading

  return (
    <Box className={styles.balanceContainer}>
      <Box className={styles.headerContainer}>
        <img src={logoHeader} alt='logo' />
      </Box>
      <Stepper
        activeStep={activeStep}
        onNextStep={onNextStep}
        isStepperLoading={isStepperLoading}
        stepperButtonDisabled={stepperButtonDisabled}
      />

      {activeStep === 1 && (
        <Step1
          tokenControl={tokenControl}
          isButtonTokenDisabled={isButtonTokenDisabled}
          postTransactions={postTransactions}
          handleTokenSubmit={handleTokenSubmit}
          isLoadingTransactions={isLoadingTransactions}
          setIsStep1Ready={setIsStep1Ready}
        />
      )}
      {activeStep === 2 && (
        <Step2
          transactions={transactions}
          tags={tags}
          currentIndex2={currentIndex2}
          setCurrentIndex2={setCurrentIndex2}
          setIsStep2Ready={setIsStep2Ready}
          generateAi={generateAi}
          tableDatastep2={tableDatastep2}
          setTableDataStep2={setTableDataStep2}
        />
      )}
      {activeStep === 3 && (
        <Step3
          transactions={transactionsWithDesciption}
          isGenerateAiLoading={isGenerateAiLoading}
          tags={tags}
          tableDatastep3={tableDatastep3}
          setTableDataStep3={setTableDataStep3}
        />
      )}
      {activeStep === 4 && (
        <Step4
          registerControl={registerControl}
          registerErrors={registerErrors}
        />
      )}
    </Box>
  )
}

export default Balance
