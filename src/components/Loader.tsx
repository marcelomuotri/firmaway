import React from 'react'
import { Box, CircularProgress, Backdrop } from '@mui/material'

interface LoaderProps {
  open: boolean
}

const Loader: React.FC<LoaderProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={open}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CircularProgress color='inherit' />
      </Box>
    </Backdrop>
  )
}

export default Loader
