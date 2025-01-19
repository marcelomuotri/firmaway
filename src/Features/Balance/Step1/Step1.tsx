import { Box, Fade, Typography } from '@mui/material'
import { useStyles } from './step1.styles'
import { useTranslation } from 'react-i18next'
import FInput from '../../../components/FInput'
import { Control, FieldErrorsImpl, useForm } from 'react-hook-form'
import FButton from '../../../components/FButton/FButton'
import SearchIcon from '../../../assets/SearchIcon'
import { useEffect } from 'react'
import { HubSpotUser } from '../Balance'

interface Step1Props {
  step1Status: number
  setStep1Status: (value: number) => void
  setIsStep1Ready: (ready: boolean) => void
  hubSpotData: HubSpotUser | undefined
  setEin: any
  isFetchingHubspot: boolean
  registerControl: Control<any>
  registerErrors: any
}

const Step1 = ({
  step1Status,
  setStep1Status,
  hubSpotData,
  setEin,
  isFetchingHubspot,
  registerControl,
  registerErrors,
}: Step1Props) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  //1: start //2 success // 3 error // 4 register

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ein: '',
    },
  })

  useEffect(() => {
    if (hubSpotData) {
      if (hubSpotData?.hubspot_id) {
        setStep1Status(2)
      } else {
        setStep1Status(3)
      }
    }
  }, [hubSpotData])

  const onSearchCompany = (data: any) => {
    setEin(data.ein)
  }

  const onRegisterCompany = () => {
    setStep1Status(4)
  }

  const goToStep1 = () => {
    setStep1Status(1)
  }

  return (
    <Box className={styles.step1Container}>
      <Box className={styles.step1Content}>
        {step1Status === 1 && (
          <Fade in={step1Status === 1} timeout={500}>
            <Box>
              <Typography className={styles.title}>
                {t('step1_enterEin')}
              </Typography>
              <Typography className={styles.subTitle}>
                {t('step1_subtitle')}
              </Typography>
              <Box className={styles.inputContainer}>
                <FInput type='ein' control={control} name='ein' />
              </Box>
              <Box className={styles.buttonContainer}>
                <FButton
                  fullWidth
                  title={t('step1_searchCompany')}
                  endIcon={<SearchIcon />}
                  onClick={handleSubmit(onSearchCompany)}
                  loading={isFetchingHubspot}
                />
              </Box>
              <Box className={styles.footerContainer}>
                <Typography className={styles.footer}>
                  {t('step1_noUser')}
                </Typography>
                <Typography
                  onClick={onRegisterCompany}
                  className={styles.footerLink}
                >
                  {t('step1_register')}
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}
        {step1Status === 2 && (
          <Fade in={step1Status === 2}>
            <Box>
              <Typography className={styles.title}>
                {t('step1_resultTitle')}
              </Typography>
              <Typography className={styles.subTitle}>
                {t('ste1_resultSubtitle')}
              </Typography>
              <Typography className={styles.company}>
                {hubSpotData?.company_name}
              </Typography>
              <Typography className={styles.ein}>
                EIN: {hubSpotData?.ein}
              </Typography>
              <Box className={styles.inputContainer}>
                <FInput type='text' control={control} name='ein' />
              </Box>
              <Box className={styles.buttonContainer}>
                <FButton
                  fullWidth
                  title={t('step1_resultsButton')}
                  endIcon={<SearchIcon />}
                  onClick={handleSubmit(onSearchCompany)}
                  loading={isFetchingHubspot}
                />
              </Box>
              <Box className={styles.footerContainer}>
                <Typography className={styles.footer}>
                  {t('step1_noUser')}
                </Typography>
                <Typography
                  onClick={onRegisterCompany}
                  className={styles.footerLink}
                >
                  {t('step1_register')}
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}
        {step1Status === 3 && (
          <Fade in={step1Status === 3}>
            <Box>
              <Typography className={styles.title}>
                {t('step1_noResultsTitle')}
              </Typography>
              <Typography className={styles.subTitle}>
                {t('step1_noResultsSubtitle')}
              </Typography>
              <Box className={styles.inputContainer}>
                <FInput type='ein' control={control} name='ein' />
              </Box>
              <Box className={styles.buttonContainer}>
                <FButton
                  fullWidth
                  title={t('step1_noResultsButton')}
                  endIcon={<SearchIcon />}
                  onClick={handleSubmit(onSearchCompany)}
                  loading={isFetchingHubspot}
                />
              </Box>
              <Box className={styles.footerContainer}>
                <Typography className={styles.footer}>
                  {t('step1_noUser')}
                </Typography>
                <Typography
                  onClick={onRegisterCompany}
                  className={styles.footerLink}
                >
                  {t('step1_register')}
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}
        {step1Status === 4 && (
          <Fade in={step1Status === 4}>
            <Box>
              <Box>
                <Typography className={styles.title}>
                  {t('step1_registerCompany')}
                </Typography>
              </Box>
              <Typography className={styles.subTitle}>
                {t('step1_completeData')}
              </Typography>

              <Box className={styles.step4InputContainer}>
                <FInput
                  type='text'
                  control={registerControl}
                  name='llcName'
                  label={t('llcName')}
                />
                <FInput
                  type='ein'
                  control={registerControl}
                  name='ein'
                  label={t('EIN')}
                />
                <FInput
                  type='text'
                  control={registerControl}
                  name='name'
                  label={t('names')}
                />
                <FInput
                  type='text'
                  control={registerControl}
                  name='surname'
                  label={t('surnames')}
                />
                <FInput
                  type='text'
                  control={registerControl}
                  name='email'
                  label={t('email')}
                  validationType='email'
                  error={registerErrors.email}
                />
                <FInput
                  type='text'
                  control={registerControl}
                  name='phone'
                  label={t('phone')}
                />
                {/* <FInput
                  type='text'
                  control={registerControl}
                  name='year'
                  label={t('year')}
                /> */}
              </Box>
              <Box className={styles.footerContainer}>
                <Typography className={styles.footer}>
                  {t('step1_areYouUser')}
                </Typography>
                <Typography onClick={goToStep1} className={styles.footerLink}>
                  {t('step1_searchCompany')}
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  )
}

export default Step1
