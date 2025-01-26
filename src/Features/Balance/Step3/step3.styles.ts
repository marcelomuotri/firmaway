import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  step3Container: {
    background: 'white',
    padding: '45px 90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  step3Content: {
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    color: theme.palette.text.primary,
    maxWidth: '1200px',
    width: '100%',
  },
  step3Title: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: 4,
    lineHeight: '24px',
  },
  step3SubTitle: {
    color: ' #6F757B',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: 16,
    lineHeight: '18px',
  },
}))
