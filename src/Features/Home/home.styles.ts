import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  homeContainer: {
    padding: '25px 48px 44px 52px',
  },
  bodyContainer: {
    padding: '45px 90px',
    display: 'flex',
    gap: 213,
    maxWidth: 860,
    '@media (max-width: 1200px)': {
      padding: '30px 20px', // Ajusta según sea necesario
    },
  },
  leftSide: {
    width: '524px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#231F20',
    lineHeight: '32px',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#4B4E51',
    lineHeight: '18px',
    marginBottom: 24,
  },
  stepsContainer: {
    display: 'flex',
    gap: 8,
  },
  stepNumber: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#231F20',
    lineHeight: '18px',
  },
  stepText: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#231F20',
    lineHeight: '16px',
  },
  rightSide: {
    minWidth: 336,
    maxWidth: 336,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
}))
