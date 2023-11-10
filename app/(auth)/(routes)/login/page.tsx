'use client'

import { useLoginModal } from '@/hooks/use-login-modal'

const LoginPage = () => {
  const { onOpen } = useLoginModal()
  onOpen()

  return <></>
}

export default LoginPage
