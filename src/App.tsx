import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import store from './framework/state/store'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from '../src/framework/lang/es.json'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import appTheme from './framework/theme/app-theme'
import Home from './Features/Home/Home'
import Layout from './components/Layout'
import Balance from './Features/Balance/Balance'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
      },
    },
    es: {
      translation: es,
    },
  },
  lng: 'es',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

const router = createBrowserRouter([
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
      {
        path: 'balance',
        element: <Balance />,
      },
    ],
  },
])
const AppRouter = () => {
  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  )
}

export default App
