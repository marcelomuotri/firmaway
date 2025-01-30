import { Box, Modal, Typography } from '@mui/material'
import { useStyles } from './transactionModal.styles'
import { useTranslation } from 'react-i18next'
import FInput from '../FInput'
import FButton from '../FButton/FButton'

const conditions = [
  { value: true, label: 'Si' },
  { value: false, label: 'No' },
]

const TransactionsModal = ({
  modalOpen,
  setModalOpen,
  control,
  handleSubmit,
  setActiveSteps,
  setCurrentIndex2,
}: any) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()

  const handleClose = (event: any, reason: any) => {
    if (reason === 'backdropClick') return // Evita cerrar si se hace clic fuera
    setModalOpen(false)
  }

  const submitModal = (data) => {
    const { isStep2Active, isStep3Active, isStep4Active } = data
    const updatedSteps = [1] // Siempre incluir el paso 1

    if (isStep2Active === 'true') updatedSteps.push(2)
    if (isStep3Active === 'true') updatedSteps.push(3)
    if (isStep4Active === 'true') updatedSteps.push(4)

    setActiveSteps(updatedSteps)
    setModalOpen(false)
  }
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          borderRadius: '13px',
          padding: '40px 32px',
          backgroundColor: 'white',
        }}
      >
        <Typography className={styles.modalTitle}>
          {t('modal_title')}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            marginBottom: 66,
          }}
        >
          <Box>
            <Typography className={styles.radioTitle}>
              {t('modal_question1')}
            </Typography>
            <Typography className={styles.radioSubTitle}>
              {t('modal_aclaration3')}
            </Typography>
            <FInput
              type='radio'
              control={control}
              name='isStep2Active'
              options={conditions}
            />
          </Box>
          <Box>
            <Typography className={styles.radioTitle}>
              {t('modal_question2')}
            </Typography>
            <Typography className={styles.radioSubTitle}>
              {t('modal_aclaration1')}
            </Typography>
            <FInput
              type='radio'
              control={control}
              name='isStep3Active'
              options={conditions}
            />
          </Box>
          <Box>
            <Typography className={styles.radioTitle}>
              {t('modal_question3')}
            </Typography>
            <Typography className={styles.radioSubTitle}>
              {t('modal_aclaration2')}
            </Typography>
            <FInput
              type='radio'
              control={control}
              name='isStep4Active'
              options={conditions}
            />
          </Box>
        </Box>
        <Box className={styles.buttonContainer}>
          <FButton
            title='Continuar'
            fullWidth
            onClick={handleSubmit(submitModal)}
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default TransactionsModal
