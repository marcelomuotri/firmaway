import { ReactElement } from 'react'
import { Button } from '@mui/material'
import { useStyles } from './fbutton.styles'
import { Typography } from '@mui/material'

type SharedBtnProps = {
  onClick: () => void
  title?: string
  titleTypography?: ReactElement
  startIcon?: ReactElement
  endIcon?: ReactElement
  variant?: 'contained' | 'outlined' | 'text'
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
  size?: 'small' | 'medium' | 'large'
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  href?: string
  textTransform?: 'inherit' | 'initial' | 'none' | 'lowercase' | 'uppercase'
  padding?: string
}

const FButton = (props: SharedBtnProps) => {
  const { classes: styles, cx } = useStyles()

  return (
    <Button
      href={props.href}
      disabled={props.disabled || false}
      className={cx(props.className, styles.button)}
      variant={props.variant || 'contained'}
      color={props.color || 'primary'}
      size={props.size || 'medium'}
      onClick={(e) => {
        e.preventDefault()
        props.onClick()
      }}
      startIcon={props.startIcon}
      fullWidth={props.fullWidth}
      endIcon={props.endIcon}
    >
      {props.title ? (
        <Typography
          color={props.variant !== 'outlined' ? 'common.white' : 'primary.main'}
          variant={'bodyRegular'}
          className={styles.title}
        >
          {props.title}
        </Typography>
      ) : (
        props.titleTypography
      )}
    </Button>
  )
}

export default FButton
