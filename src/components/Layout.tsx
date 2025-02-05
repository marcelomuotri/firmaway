import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  return (
    <Box style={{ background: '#F8F8FA', minHeight: '100vh', overflowX: 'hidden', overflowY: 'hidden' }}>
      <Outlet />
    </Box>
  )
}
