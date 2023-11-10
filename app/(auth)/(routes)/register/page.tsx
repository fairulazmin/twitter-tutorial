'use client'

import { useRegisterModal } from '@/hooks/use-register-modal'

const RegisterPage = () => {
  const { onOpen } = useRegisterModal()
  onOpen()

  return <></>
}

export default RegisterPage
