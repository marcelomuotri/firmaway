import { useForm } from 'react-hook-form'

export const useBalanceForm = () => {
  // 📌 Formulario de Registro de Compañía
  const {
    handleSubmit: handleRegisterSubmit,
    control: registerControl,
    watch: watchRegister,
    formState: { errors: registerErrors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      llcName: '',
      ein: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
    },
  })

  // 📌 Formulario de Token
  const {
    handleSubmit: handleTokenSubmit,
    control: tokenControl,
    watch: watchToken,
    formState: { errors: tokenErrors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      token: '',
    },
  })

  return {
    handleRegisterSubmit,
    registerControl,
    registerErrors,
    watchRegister,
    handleTokenSubmit,
    tokenControl,
    watchToken,
    tokenErrors,
  }
}
