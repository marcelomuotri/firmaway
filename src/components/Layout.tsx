import { Box, Link, Typography } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  return (
    <Box
      style={{
        background: '#F8F8FA',
        minHeight: '100vh',
        overflowX: 'hidden',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Outlet />
      <footer
        style={{
          padding: '0px 48px 24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ color: '#6F757B', fontWeight: 400, fontSize: 12 }}>
          © 2025 Balancito, un producto de Firmaway.
        </Typography>
        <Box
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <Link
            sx={{
              textDecoration: 'none',
              color: '#6F757B',
              fontWeight: 400,
              fontSize: 12,
            }}
            href='https://firmaway.us/terms-balancito/'
            target='_blank'
          >
            Términos de servicio
          </Link>
          <Link
            sx={{
              textDecoration: 'none',
              color: '#6F757B',
              fontWeight: 400,
              fontSize: 12,
            }}
            target='_blank'
            href='https://firmaway.us/privacy-balancito/'
          >
            Declaración de privacidad
          </Link>
        </Box>
      </footer>
    </Box>
  )
}
