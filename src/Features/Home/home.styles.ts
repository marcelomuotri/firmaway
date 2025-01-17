import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  homeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  homeContent: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '512px',
    height: '444px',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '32px',
    textAlign: 'center',
    color: '#231F20',
    marginBottom: 8,
  },
  text: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'center',
    color: '#131212',
    marginBottom: '32px',
  },
}))
