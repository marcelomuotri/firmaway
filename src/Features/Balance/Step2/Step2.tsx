import Table from '../../../components/Table/Table'
import { Box, Button, Fade, IconButton } from '@mui/material'
import { useStyles } from './step2.styles'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TransactionsModal from '../../../components/TransactionsModal/TransactionsModal'
import { Select, MenuItem } from '@mui/material'
import { useGenerateAiMutation } from '../../../framework/state/services/generateAIApi'
import { Trans, useTranslation } from 'react-i18next'
import CustomSelectCell from '../../../components/CustomSelectCell'
import StepTitle from '../../../components/StepTitle'
import ClipIcon from '../../../assets/Clip'

// ------------------ AGRUPADO DE TRANSACCIONES ------------------
function groupByCounterparty(transactions: any[], stepNumber, tableDataStep2) {
  const grouped = {}

  transactions.forEach((tx) => {
    const {
      counterpartyId,
      counterpartyName,
      amount,
      referenceUrl,
      kind,
      batchId,
      tag_id,
    } = tx

    if (stepNumber === 1 && (tag_id || kind === 'debitCardTransaction')) {
      return
    }

    // En los demás pasos, excluir las transacciones que tienen `tag_id`
    if (stepNumber !== 1 && tag_id) {
      return
    }

    if (!grouped[counterpartyId]) {
      grouped[counterpartyId] = {
        id: counterpartyId,
        counterpartyName,
        totalIncome: 0,
        totalExpenses: 0,
        tag_id: '',
        tag_name: '',
        tag_step: 0,
        referenceUrl,
        batchId,
      }
    }

    if (amount > 0) {
      grouped[counterpartyId].totalIncome += amount
    } else {
      grouped[counterpartyId].totalExpenses += amount
    }
  })

  // 🔹 Crear un array con los `counterpartyId` ya categorizados
  const categorizedAccounts = []
  tableDataStep2.forEach((row) => {
    if (row.tag_id) {
      categorizedAccounts.push(row.id)
    }
  })

  // 🔹 Filtrar `grouped` antes de retornarlo
  const filteredGrouped = []
  Object.values(grouped).forEach((account) => {
    if (!categorizedAccounts.includes(account.id)) {
      filteredGrouped.push(account)
    }
  })

  return filteredGrouped
}

// ------------------ COMPONENTE PRINCIPAL ------------------
export default function Step2({
  transactions,
  tags,
  currentIndex2,
  setCurrentIndex2,
  setIsStep2Ready,
  generateAi,
  tableDatastep2,
  setTableDataStep2,
}: any) {
  const { classes: styles } = useStyles()

  // currentIndex: posición actual dentro del array "activeSteps"
  const [modalOpen, setModalOpen] = useState(true)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      isStep2Active: false,
      isStep3Active: false,
      isStep4Active: false,
    },
  })

  // Obtenemos en tiempo real si el user activó el paso 2, 3 o 4
  const { isStep2Active, isStep3Active, isStep4Active } = watch()

  /**
   * 1) Generamos el array de pasos activos: [1] + los que el user haya habilitado
   */
  const activeSteps = [1]
  if (isStep2Active) activeSteps.push(2)
  if (isStep3Active) activeSteps.push(3)
  if (isStep4Active) activeSteps.push(4)

  // Paso "real" actual => ej: si activeSteps = [1, 3, 4] y currentIndex=1 => currentStep=3
  const currentStep: keyof typeof stepTitles = activeSteps[currentIndex2] || 1
  /**
   * 2) categoriesByStep: Para cada paso, definimos qué tag(s) queremos mostrar
   *    Filtramos por nombre en 'tags'
   */
  const categoriesByStep = {
    1: tags
      .filter((cat) => cat.id === 1 || cat.id === 2)
      .map((cat) => cat.tag_name),

    2: tags.filter((cat) => cat.id === 3).map((cat) => cat.tag_name),

    3: tags.filter((cat) => cat.id === 4).map((cat) => cat.tag_name),

    4: tags.filter((cat) => cat.id === 5).map((cat) => cat.tag_name),
  }

  // 3) Definimos nuestras columnas
  function getColumns(stepNumber, onSelectChange) {
    return [
      {
        field: 'counterpartyName',
        headerName: 'Cuenta',
        width: 150,
        flex: 1,
      },
      {
        field: 'totalIncome',
        headerName: 'Ingresos totales',
        width: 150,
        valueGetter: (params) => params.toFixed(2),
        flex: 0.7,
      },
      {
        field: 'totalExpenses',
        headerName: 'Egresos totales',
        valueGetter: (params) => params.toFixed(2),
        flex: 0.7,
      },
      {
        field: 'tag_name',
        headerName: 'Categoría',
        width: 220,
        renderCell: (params) => (
          <CustomSelectCell
            params={params}
            currentStep={stepNumber}
            onSelectChange={onSelectChange}
            categoriesByStep={categoriesByStep}
          />
        ),
        flex: 1,
      },
      {
        field: 'referenceUrl',
        headerName: 'Referencia',
        renderCell: (params) =>
          params.value ? (
            <IconButton
              component='a'
              href={params.value}
              target='_blank'
              rel='noopener noreferrer'
              sx={{ color: '#6F757B' }} // Color gris suave
            >
              <ClipIcon />
            </IconButton>
          ) : null,
        flex: 0.7,
      },
    ]
  }

  /**
   * 4) Carga inicial de transacciones agrupadas
   */
  useEffect(() => {
    console.log('holis')
    if (transactions && transactions.length > 0) {
      const grouped = groupByCounterparty(
        transactions[0]?.data || [],
        currentIndex2 + 1,
        tableDatastep2
      )
      console.log(grouped)
      setTableDataStep2(grouped)
    }
  }, [transactions, currentIndex2])

  /**
   * 5) Cuando el usuario selecciona una categoría
   */
  const handleSelectChange = useCallback(
    (rowId, newTagName) => {
      const selectedCat = tags.find((cat) => cat.tag_name === newTagName)
      setTableDataStep2((prev) =>
        prev.map((row) => {
          if (row.id === rowId) {
            return {
              ...row,
              tag_name: newTagName,
              tag_id: selectedCat ? selectedCat.id : '',
              tag_step: currentStep, // Guardamos el número real de paso
            }
          }
          return row
        })
      )
    },
    [currentStep, tags]
  )

  /**
   * 6) Filtramos las filas para mostrar solo las que no tengan tag o sean de este paso
   */
  const rowsToShow = tableDatastep2.filter((row) => {
    if (row.tag_step === currentStep) {
      return true
    }
    if (currentStep === 1) {
      // Excluye si ya tiene tag o si es de tarjeta de débito
      return !row.tag_id
    }

    // Para los pasos 2, 3, 4 ...
    return !row.tag_id
    //!row.tag_id || row.tag_step === currentStep
  })
  console.log(rowsToShow)

  useEffect(() => {
    if (currentIndex2 === activeSteps.length - 1) {
      setIsStep2Ready(true)
    } else {
      setIsStep2Ready(false)
    }
  }, [modalOpen, isStep2Active, isStep3Active, isStep4Active, currentIndex2])

  const stepTitles: { [key: number]: { subTitle: string; textKey: string } } = {
    1: { subTitle: 'step3_subTitle', textKey: 'step3_text' },
    2: { subTitle: 'step3_subTitle2', textKey: 'step3_text2' },
    3: { subTitle: 'step3_subTitle3', textKey: 'step3_text3' },
    4: { subTitle: 'step3_subTitle4', textKey: 'step3_text4' },
  }

  return (
    <Fade in={true} timeout={500} key={currentIndex2}>
      <Box className={styles.step3Container}>
        <Box className={styles.step3Content}>
          {/*  El modal que setea isStep2Active, isStep3Active, isStep4Active  */}
          <TransactionsModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            control={control}
            handleSubmit={handleSubmit}
          />
          {stepTitles[currentStep] && (
            <StepTitle
              title={'step3_title'}
              subTitle={stepTitles[currentStep].subTitle}
              textKey={stepTitles[currentStep].textKey}
              currentIndex={currentIndex2}
              totalSteps={activeSteps.length}
            />
          )}
          <Table
            rows={rowsToShow}
            columns={getColumns(currentStep, handleSelectChange)}
            disableRowSelectionOnClick
            //hideFooterPagination
            disableColumnMenu
          />
        </Box>
      </Box>
    </Fade>
  )
}
