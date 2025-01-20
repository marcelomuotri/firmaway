import { useEffect, useState } from 'react'
import {
  useGetHubspotDataQuery,
  useRegisterCompanyMutation,
} from '../../../framework/state/services/hubspotApi'
import { usePostTransactionsMutation } from '../../../framework/state/services/transactionsApi'

export const useBalanceLogic = (watchRegister: any, watchToken: any) => {
  const [activeStep, setActiveStep] = useState(0)
  const [step1Status, setStep1Status] = useState(1)
  const [isStep1Ready, setIsStep1Ready] = useState(false)
  const [isStep2Ready, setIsStep2Ready] = useState(false)
  const [ein, setEin] = useState<string | null>(null)
  const [isButtonTokenDisabled, setIsButtonTokenDisabled] = useState(true)

  // 📌 Llamada a Hubspot API
  const { data: hubSpotData, isFetching: isFetchingHubspot } =
    useGetHubspotDataQuery(
      { ein: ein?.replace(/-/g, '') || '' },
      { skip: !ein }
    )

  // 📌 Mutaciones
  const [
    postTransactions,
    { data: transactions, isLoading: isLoadingTransactions },
  ] = usePostTransactionsMutation()
  const [registerCompany, { isLoading: isRegisterLoading }] =
    useRegisterCompanyMutation()

  // 📌 Validación Paso 1
  useEffect(() => {
    if (step1Status === 2) {
      setIsStep1Ready(true)
    } else if (step1Status === 4) {
      const allFieldsFilled = Object.values(watchRegister()).every(
        (value) => value && String(value).trim() !== ''
      )
      const noRegisterErrors =
        Object.keys(watchRegister().errors || {}).length === 0
      setIsStep1Ready(allFieldsFilled && noRegisterErrors)
    } else {
      setIsStep1Ready(false)
    }
  }, [step1Status, watchRegister])

  // 📌 Validación Paso 2
  useEffect(() => {
    setIsButtonTokenDisabled(!watchToken().token)
  }, [watchToken])

  const onNextStep = async () => {
    if (step1Status === 4) {
      const { llcName, ein, name, surname, email, phone } = watchRegister()
      const response = await registerCompany({
        first_name: name,
        last_name: surname,
        email,
        phone,
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

  const checkIfDisable = () => {
    if (activeStep === 0 && !isStep1Ready) return true
    if (activeStep === 1 && !isStep2Ready) return true
    return false
  }

  return {
    activeStep,
    setActiveStep,
    step1Status,
    setStep1Status,
    isStep1Ready,
    isStep2Ready,
    setIsStep2Ready,
    isButtonTokenDisabled,
    onNextStep,
    hubSpotData,
    isFetchingHubspot,
    registerCompany,
    isRegisterLoading,
    postTransactions,
    isLoadingTransactions,
    checkIfDisable,
    setEin,
    transactions, // ✅ Agregamos las transacciones para que los hijos las reciban
    ein,
  }
}
