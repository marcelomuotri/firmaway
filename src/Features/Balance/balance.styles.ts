import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  balanceContainer: {
    paddingLeft: '52px',
    paddingRight: '48px',
    paddingTop: '25px',
  },
  headerContainer: {
    marginBottom: '21px',
  },
}))
