import Table from '../../../components/Table/Table'
import { Box, Button, Fade, IconButton, Tooltip, tooltipClasses, Typography } from '@mui/material'
import { useStyles } from './step2.styles'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TransactionsModal from '../../../components/TransactionsModal/TransactionsModal'
import CustomSelectCell from '../../../components/CustomSelectCell'
import StepTitle from '../../../components/StepTitle'
import ClipIcon from '../../../assets/Clip'
import FTooltip from '../../../components/FTooltip'
import HelpIcon from '@mui/icons-material/Help';
import BoxOut from '../../../assets/BoxOut'



function groupByCounterparty(transactions) {
  const grouped = {}

  transactions.forEach((tx) => {
    const {
      counterpartyId,
      counterpartyName,
      amount,
      referenceUrl,
      batchId,
      tag_id,
    } = tx

    // ❌ Excluir transacciones que ya tienen un `tag_id`
    if (tag_id) return

    if (!grouped[counterpartyId]) {
      grouped[counterpartyId] = {
        id: counterpartyId,
        counterpartyName,
        totalIncome: 0,
        totalExpenses: 0,
        tag_id: '',
        tag_name: '',
        referenceUrl,
        batchId,
        transactions: [],
      }
    }

    grouped[counterpartyId].transactions.push(tx)

    if (amount > 0) {
      grouped[counterpartyId].totalIncome += amount
    } else {
      grouped[counterpartyId].totalExpenses += amount
    }
  })

  return Object.values(grouped)
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
  const [activeSteps, setActiveSteps] = useState<number[]>([1])

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
        flex: 0.7,
        valueFormatter: (params) => {
          const val = Number(params) || 0
          return `$ ${val.toFixed(2)}`
        }
      },
      {
        field: 'totalExpenses',
        headerName: 'Egresos totales',
        //valueGetter: (params) => '$ ' + params?.toFixed(2),
        flex: 0.7,
        valueFormatter: (params) => {
          // Mantenlo en número internamente y formatea la salida
          const val = Number(params) || 0
          return `$ ${val.toFixed(2)}`
        }
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
        renderHeader: (params) => (
          <Box display="flex" alignItems="center">
            <Typography sx={{ fontWeight: 'bold' }} >
              Ver en mercury
            </Typography>
            <Tooltip title={
              <FTooltip title="Accede al detalle de la transacción en Mercury con un solo clic" />
            }
              slotProps={{
                tooltip: {
                  sx: {
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    fontWeight: 'normal',
                    padding: '16px',
                  }
                }
              }}
            >
              <IconButton
                component='a'
                href={params.value}
                target='_blank'
                rel='noopener noreferrer'
                sx={{ color: '#6F757B' }}
              >
                <HelpIcon sx={{ width: '15px', height: '15px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        sortable: false,
        hideSortIcons: true,
        renderCell: (params) =>
          params.value ? (
            <IconButton
              component='a'
              href={params.value}
              target='_blank'
              rel='noopener noreferrer'
              sx={{ color: '#6F757B' }} // Color gris suave
            >
              <BoxOut />
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
    if (transactions && transactions.length > 0) {
      const grouped = groupByCounterparty(transactions[0]?.data || [])
      setTableDataStep2(grouped)
    }
  }, [transactions])

  /**
   * 5) Cuando el usuario selecciona una categoría
   */
  const handleSelectChange = (rowId, newTagName) => {
    const selectedCat = tags.find((cat) => cat.tag_name === newTagName)

    setTableDataStep2((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
            ...row,
            tag_name: newTagName,
            tag_id: selectedCat ? selectedCat.id : '',
            tag_step: currentStep, // Guardamos el paso en el que se asignó
          }
          : row
      )
    )
  }

  /**
   * 6) Filtramos las filas para mostrar solo las que no tengan tag o sean de este paso
   */
  // 📌 6️⃣ Filtramos las filas para mostrar solo las que deben verse en este paso
  const rowsToShow = tableDatastep2.filter((row) => {
    // ✅ Siempre permitir mostrar filas en el paso donde fueron categorizadas
    if (row.tag_step === currentStep) return true

    // ❌ Si ya tienen `tag_id` y fueron categorizadas en un paso anterior, ocultarlas
    if (row.tag_id && row.tag_step < currentStep) return false

    // 📌 En el PASO 1, excluir las transacciones `debitCardTransaction`
    if (currentStep === 1) {
      const validTransactions = row.transactions.filter(
        (tx) => tx.kind !== 'debitCardTransaction'
      )

      // ❌ Si después de filtrar no quedan transacciones, excluir la cuenta
      if (validTransactions.length === 0) return false

      // 🔹 Recalcular ingresos/egresos solo con las transacciones filtradas
      row.totalIncome = validTransactions.reduce(
        (sum, tx) => sum + (tx.amount > 0 ? tx.amount : 0),
        0
      )
      row.totalExpenses = validTransactions.reduce(
        (sum, tx) => sum + (tx.amount < 0 ? tx.amount : 0),
        0
      )
    }

    return true // ✅ Mantener la cuenta si pasa los filtros
  })

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
            setActiveSteps={setActiveSteps}
            setCurrentIndex2={setCurrentIndex2}
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
          //hideFooterPagination

          />
        </Box>
      </Box>
    </Fade>
  )
}
