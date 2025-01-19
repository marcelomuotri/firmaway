import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  step1Container: {
    background: 'white',
    padding: '45px 90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  step1Content: {
    width: '336px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.text.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '18px',
    marginBottom: 8,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 27,
  },
  subTitle: {
    textAlign: 'center',
    lineHeight: '20px',
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 12,
  },
  footerContainer: {
    display: 'flex',
    gap: 4,
    justifyContent: 'center',
  },
  company: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '32px',
    textAlign: 'center',
  },
  ein: {
    fontSize: 12,
    textAlign: 'center',
    color: '#4B4E51',
    marginBottom: 12,
  },
  footer: {
    fontSize: 12,
    lineHeight: '16px',
  },
  footerLink: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.primary.main,
    fontWeight: 600,
    cursor: 'pointer',
  },
  step4InputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 32,
  },
}))
