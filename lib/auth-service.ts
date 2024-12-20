import { hash } from 'bcrypt'
import { prisma } from './prisma'

export async function signUp(data: { email: string; password: string; name?: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hash(data.password, 12)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name || null
    }
  })

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

