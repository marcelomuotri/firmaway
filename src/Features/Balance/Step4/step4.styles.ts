import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  step4Container: {
    background: 'white',
    padding: '45px 90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 1200px)': {
      padding: '30px 20px', // Ajusta según sea necesario
    },
  },
  step4Content: {
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.text.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '26px',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    lineHeight: '22px',
    marginBottom: 40,
  },
  footerContainer: {
    display: 'flex',
    gap: 8,
  },
  footer: {
    fontSize: 12,
    lineHeight: '16px',
    color: '#4B4E51',
  },
  step4InputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 32,
  },
}))
