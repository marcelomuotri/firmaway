import { Box, Fade, Typography } from '@mui/material'
import { useStyles } from './step1.styles'
import { useTranslation } from 'react-i18next'
import FInput from '../../../components/FInput'
import { useForm } from 'react-hook-form'
import FButton from '../../../components/FButton/FButton'
import SearchIcon from '../../../assets/SearchIcon'
import { useGetHubspotDataQuery } from '../../../framework/state/services/hubspotApi'
import { useEffect, useState } from 'react'

const Step1 = () => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const [ein, setEin] = useState<string | null>(null)
  const [status, setStatus] = useState(1) //0//1ok/2noexiste
  const [companyData, setCompanyData] = useState<{
    hubspot_id?: string
    supabase_id?: string
    company_name?: string
    ein?: string
    message?: string
  } | null>(null)
  const { data, error, isFetching, refetch } = useGetHubspotDataQuery(
    { ein: ein || '' },
    { skip: !ein }
  )
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
    console.log(isFetching)
  }, [isFetching])

  useEffect(() => {
    if (data) {
      if (data?.hubspot_id) {
        setStatus(2)
      } else {
        setStatus(3)
      }
    }
  }, [data])

  const onSearchCompany = (data) => {
    setEin(data.ein)
  }

  return (
    <Box className={styles.step1Container}>
      <Box className={styles.step1Content}>
        {status === 1 && (
          <Fade in={status === 1} timeout={500}>
            <Box>
              <Typography className={styles.title}>
                {t('step1_enterEin')}
              </Typography>
              <Typography className={styles.subTitle}>
                {t('step1_subtitle')}
              </Typography>
              <Box className={styles.inputContainer}>
                <FInput type='text' control={control} name='ein' />
              </Box>
              <Box className={styles.buttonContainer}>
                <FButton
                  fullWidth
                  title={t('step1_searchCompany')}
                  endIcon={<SearchIcon />}
                  onClick={handleSubmit(onSearchCompany)}
                  loading={isFetching}
                />
              </Box>
              <Box className={styles.footerContainer}>
                <Typography className={styles.footer}>
                  {t('step1_noUser')}
                </Typography>
                <Typography className={styles.footerLink}>
                  {t('step1_register')}
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}
        {status === 2 && (
          <Fade in={status === 2}>
            <Box>
              <Typography className={styles.title}>
                {t('step1_resultTitle')}
              </Typography>
              <Typography className={styles.subTitle}>
                {t('ste1_resultSubtitle')}
              </Typography>
              <Typography className={styles.company}>
                {data?.company_name}
              </Typography>
              <Typography className={styles.ein}>EIN: {data?.ein}</Typography>
              <Box className={styles.inputContainer}>
                <FInput type='text' control={control} name='ein' />
              </Box>
              <Box className={styles.buttonContainer}>
                <FButton
                  fullWidth
                  title={t('step1_resultsButton')}
                  endIcon={<SearchIcon />}
                  onClick={handleSubmit(onSearchCompany)}
                  loading={isFetching}
                />
              </Box>
              <Box className={styles.footerContainer}>
                <Typography className={styles.footer}>
                  {t('step1_noUser')}
                </Typography>
                <Typography className={styles.footerLink}>
                  {t('step1_register')}
                </Typography>
              </Box>
            </Box>
          </Fade>
        )}
        {status === 3 && (
          <Fade in={status === 3}>
            <Box>
              <Typography className={styles.title}>
                {t('step1_noResultsTitle')}
              </Typography>
              <Typography className={styles.subTitle}>
                {t('step1_noResultsSubtitle')}
              </Typography>

              <Box className={styles.inputContainer}>
                <FInput type='text' control={control} name='ein' />
              </Box>
              <Box className={styles.buttonContainer}>
                <FButton
                  fullWidth
                  title={t('step1_noResultsButton')}
                  endIcon={<SearchIcon />}
                  onClick={handleSubmit(onSearchCompany)}
                  loading={isFetching}
                />
              </Box>
              <Box className={styles.footerContainer}>
                <Typography className={styles.footer}>
                  {t('step1_noUser')}
                </Typography>
                <Typography className={styles.footerLink}>
                  {t('step1_register')}
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
