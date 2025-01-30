import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  modalTitle: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '26px',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    lineHeight: '22px',
    textAlign: 'center',
    marginBottom: 24,
  },
  radioTitle: {
    fontWeight: 600,
    marginBottom: 4,
  },
  radioSubTitle: {
    color: '#59626D',
    marginBottom: 16,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}))
