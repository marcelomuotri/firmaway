import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Features/Login/Login'
import store from './framework/state/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import appTheme from './framework/theme/app-theme'
import { SupabaseProvider } from './framework/providers/SupabaseProvider'
import Home from './Features/Home/Home'
import Layout from './components/Layout'

const router = createBrowserRouter([
  //{
  //   path: '/',
  //   element: <AuthGuard />, // AuthGuard como ruta superior
  //   children: [
  //     {
  //       path: '/',
  //       element: <Layout />, // Layout como hijo de AuthGuard
  //       children: [
  //         {
  //           index: true,
  //           element: <Navigate to='/home' replace />,
  //         },
  //         {
  //           path: 'home',
  //           element: <Home />,
  //         },
  //         {
  //       ],
  //     },
  //   ],
  // },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to='/home' replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
  // {
  //   path: '/login',
  //   element: <Login />,
  // },
  // {
  //   path: '/register',
  //   element: <Register />,
  // },
  // {
  //   path: 'resetPassword',
  //   element: <ResetPassword />,
  // },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
])
const AppRouter = () => {
  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <SupabaseProvider>
      <Provider store={store}>
        <ThemeProvider theme={appTheme}>
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </SupabaseProvider>
  )
}

export default App
