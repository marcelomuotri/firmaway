import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  step2Container: {
    background: 'white',
    padding: '45px 90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  step2Content: {
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
  subTitle: {
    textAlign: 'center',
    lineHeight: '20px',
    marginBottom: 16,
  },
  tutorialContainer: {
    display: 'flex',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  tutorial: {},
  tutorialLink: {
    lineHeight: '16px',
    color: theme.palette.primary.main,
    fontWeight: 600,
    cursor: 'pointer',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '26px',
    marginBottom: 16,
  },
  modalSubTitle: {
    lineHeight: '20px',
    marginBottom: 24,
  },
}))
