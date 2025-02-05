import { makeStyles } from 'tss-react/mui'
import logo from '../assets/Logo Header.png'
import logoBalancito from '../assets/balancitoChar.png'
import { Box, TextField, Typography } from '@mui/material'
import FButton from './FButton/FButton'
import RightChevron from '../assets/RightChevron'
import { useState } from 'react'
const MobileComponent = () => {
    const { classes: styles } = useStyles()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const handleSendLink = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailRegex.test(email)) {
            setError('')
            console.log(email)
        } else {
            setError('El formato del correo electrónico es inválido')
        }
    }


    return (
        <Box className={styles.mobileContainer}>
            <img src={logo} alt="logo" />
            <img src={logoBalancito} alt="logoBalancito" className={styles.logoBalancito} />
            <Typography className={styles.title}>Oops... Balancito es solo para computadoras</Typography>
            <Typography className={styles.subtitle}>Por ahora, Balancito solo funciona en computadoras. Déjanos tu correo y te enviamos el enlace directo para que accedas desde tu PC o laptop.</Typography>
            <TextField label="" fullWidth className={styles.textField} placeholder='Correo electrónico' onChange={(e) => setEmail(e.target.value)} />
            <FButton title='Enviar enlace' onClick={handleSendLink} fullWidth startIcon={<RightChevron />} />
            {error && <Typography className={styles.error}>{error}</Typography>}
        </Box>
    )
}

export default MobileComponent


export const useStyles = makeStyles()((theme: Theme) => ({
    mobileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoBalancito: {
        marginTop: 120,
        width: '54px',
        marginBottom: 24,
    },
    title: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '26px',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '22px',
        marginBottom: 32,
    },
    textField: {
        marginBottom: 8,
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: 8,
    },
}))