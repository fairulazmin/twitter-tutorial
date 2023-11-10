import prisma from '@/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { email, name, username, password } = body
  const hashedPassword = await bcrypt.hash(password, 12)

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser)
    return NextResponse.json(
      'An account is already registered with your email',
      { status: 422 },
    )

  const user = await prisma.user.create({
    data: {
      email,
      name,
      username,
      hashedPassword,
      emailVerified: new Date(),
    },
  })

  return NextResponse.json(user, { status: 201 })
}
