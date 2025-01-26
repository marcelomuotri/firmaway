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
  const [isStep1Ready, setIsStep1Ready] = useState(false)
  const [isButtonTokenDisabled, setIsButtonTokenDisabled] = useState(true)
  const { data: tags } = useGetTagsQuery({})
  const [isStep2Ready, setIsStep2Ready] = useState(false)
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

  const { watchRegister, handleTokenSubmit, tokenControl, watchToken } =
    useBalanceForm()

  const registerValues = watchRegister()
  const tokenValues = watchToken()

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
    } else setActiveStep(activeStep + 1)
  }

  const stepperButtonDisabled = !isStep1Ready

  return (
    <Box className={styles.balanceContainer}>
      <Box className={styles.headerContainer}>
        <img src={logoHeader} alt='logo' />
      </Box>
      <Stepper
        activeStep={activeStep}
        onNextStep={onNextStep}
        isRegisterLoading={isRegisterLoading}
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
    </Box>
  )
}

export default Balance
