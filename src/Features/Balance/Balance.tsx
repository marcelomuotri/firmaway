import { Box } from '@mui/material'
import { useStyles } from './balance.styles'
import logoHeader from '../../assets/Logo Header.png'
import Stepper from '../../components/Stepper/Stepper'
import { useEffect, useState } from 'react'
import Step1 from './Step1/Step1'
import { useRegisterCompanyMutation } from '../../framework/state/services/hubspotApi'
import { usePostTransactionsMutation } from '../../framework/state/services/transactionsApi'
import { useBalanceForm } from './hooks/useBalanceForm'
import Step2 from './Step2/Step2'
import { useGetTagsQuery } from '../../framework/state/services/tagService'
import Step3 from './Step3/Step3'
import Step4 from './Step4/Step4'
import { usePostCSVMutation } from '../../framework/state/services/createCSV'
import { useNavigate } from 'react-router-dom'
import {
  useCheckStatusQuery,
  useStartProcessMutation,
} from '../../framework/state/services/generateAIv2'

export interface HubSpotUser {
  hubspot_id?: string
  supabase_id?: string
  company_name?: string
  ein?: string
  message?: string
  hubSpotData: HubSpotUser
}

const Balance = () => {
  const navigate = useNavigate()
  const { classes: styles } = useStyles()
  const [activeStep, setActiveStep] = useState(1)
  const [isButtonTokenDisabled, setIsButtonTokenDisabled] = useState(true)
  const { data: tags } = useGetTagsQuery({})
  const [isStep1Ready, setIsStep1Ready] = useState(false)
  const [isStep2Ready, setIsStep2Ready] = useState(false)
  const [isStep4Ready, setIsStep4Ready] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [currentIndex2, setCurrentIndex2] = useState(0)
  const [tableDatastep2, setTableDataStep2] = useState<any[]>([])
  const [tableDatastep3, setTableDataStep3] = useState<any[]>([])

  const [
    postTransactions,
    {
      data: transactions,
      isLoading: isLoadingTransactions,
      error: postTransactionsError,
    },
  ] = usePostTransactionsMutation()

  const [registerCompany, { isLoading: isRegisterLoading }] =
    useRegisterCompanyMutation()

  const [batchId, setBatchId] = useState('')
  const [stopPolling, setStopPolling] = useState(false)
  const [loadingStep3, setLoadingStep3] = useState(true)

  const [startProcess, { isLoading: isProcessLoading }] =
    useStartProcessMutation()
  const { data: statusData, isFetching: isChecking } = useCheckStatusQuery(
    batchId,
    {
      skip: !batchId || activeStep !== 3,
      pollingInterval: stopPolling ? 0 : 10000, // reintenta cada 10s si no hemos parado
    }
  )

  useEffect(() => {
    setBatchId(transactions?.[0]?.data?.[0]?.batchId)
  }, [transactions])

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
    if (tokenValues.token) {
      setIsButtonTokenDisabled(false)
    } else {
      setIsButtonTokenDisabled(true)
    }
  }, [tokenValues])

  useEffect(() => {
    if (isStep1Ready && activeStep === 1) {
      const timeout = setTimeout(() => {
        setActiveStep(activeStep + 1) // Pasa al siguiente paso después de 3 segundos
      }, 3000)

      return () => clearTimeout(timeout) // Limpia el timeout si el componente se desmonta
    }
  }, [isStep1Ready])

  useEffect(() => {
    if (statusData?.status === 'done') {
      setStopPolling(true)
      setLoadingStep3(false)
    }
  }, [statusData])

  const onNextStep = async () => {
    if (activeStep === 2 && !isStep2Ready) {
      setCurrentIndex2(currentIndex2 + 1)
    } else if (activeStep === 2 && isStep2Ready) {
      function filterTransactions(transactions: any) {
        return transactions.map(({ id, tag_id, tag_name, batchId }: any) => ({
          id,
          tag_id,
          tag_name,
          batchId,
        }))
      }
      const filteredTransactions = filterTransactions(tableDatastep2)
      startProcess(filteredTransactions)
      if (statusData?.status === 'done') {
        setStopPolling(true)
      }
      setActiveStep(activeStep + 1)
    } else if (activeStep === 4) {
      const batchId = transactions?.[0]?.data?.[0]?.batchId
      const companyResponse = await registerCompany({
        first_name: registerValues.name,
        last_name: registerValues.surname,
        email: registerValues.email,
        phone: registerValues.phone,
        ein: registerValues.ein.replace(/-/g, ''),
        company_name: registerValues.llcName,
        batchId,
      })
      const csvData = await postCSV([{ transacciones: tableDatastep3 }])

      // Crea un Blob con el contenido del CSV
      const blob = new Blob([csvData.data], { type: 'text/csv' })

      // Crea una URL para el archivo
      const url = URL.createObjectURL(blob)

      // Crea un enlace temporal y lo activa
      const a = document.createElement('a')
      a.href = url
      a.download = 'transacciones.csv'
      document.body.appendChild(a)
      a.click()

      // Limpieza del DOM
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      if (csvData) {
        setShowCongratulations(true)
        await new Promise((resolve) => setTimeout(resolve, 3000))

        window.location.href = companyResponse.data.redirect_URL
      }
    } else setActiveStep(activeStep + 1)
  }

  const stepperButtonDisabled =
    activeStep === 1 || (activeStep === 4 && !isStep4Ready)

  const isStepperLoading = isRegisterLoading || isCSVLoading

  return (
    <Box className={styles.balanceContainer}>
      <Box className={styles.headerContainer}>
        <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <img src={logoHeader} alt='logo' style={{ width: '123px' }} />
        </Box>
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
          isStep1Ready={isStep1Ready}
          postTransactionsError={postTransactionsError}
        />
      )}
      {activeStep === 2 && (
        <Step2
          transactions={transactions}
          tags={tags}
          currentIndex2={currentIndex2}
          setCurrentIndex2={setCurrentIndex2}
          setIsStep2Ready={setIsStep2Ready}
          tableDatastep2={tableDatastep2}
          setTableDataStep2={setTableDataStep2}
        />
      )}
      {activeStep === 3 && (
        <Step3
          transactions={statusData?.transacciones}
          isGenerateAiLoading={loadingStep3}
          tags={tags}
          tableDatastep3={tableDatastep3}
          setTableDataStep3={setTableDataStep3}
        />
      )}
      {activeStep === 4 && (
        <Step4
          registerControl={registerControl}
          registerErrors={registerErrors}
          showCongratulations={showCongratulations}
        />
      )}
    </Box>
  )
}

export default Balance
