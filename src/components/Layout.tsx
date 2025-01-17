import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  return (
    <Box style={{ background: '#F7F7F7', minHeight: '100vh' }}>
      <Outlet />
    </Box>
  )
}
