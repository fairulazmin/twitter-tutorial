'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useRegisterModal } from '@/hooks/use-register-modal'
import { useLoginModal } from '@/hooks/use-login-modal'
import { useCallback, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const formSchema = z.object({
  email: z.string().email().min(8, {
    message: 'Email must be at least 8 characters',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
})

export const RegisterModal = () => {
  const [loading, setLoading] = useState(false)
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onToggle = useCallback(() => {
    if (loading) {
      return
    }
    registerModal.onClose()
    loginModal.onOpen()
  }, [loading, registerModal, loginModal])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      // TODO ADD REGISTER
      await axios.post('/api/register', values)
      toast.success('User registered')
      registerModal.onClose()
    } catch (error) {
      toast.error('Unable to register user')
      console.log(error)
    } finally {
      setLoading(false)
    }
    console.log(values)
  }

  return (
    <Dialog open={registerModal.isOpen} onOpenChange={registerModal.onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 mt-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className='w-full rounded-full'
              type='submit'
            >
              Register
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <div className='w-full text-sm text-neutral-400 text-center mt-4'>
            <p>
              Already have an account?{' '}
              <span
                onClick={onToggle}
                className='text-white cursor-pointer hover:underline'
              >
                Sign in
              </span>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
