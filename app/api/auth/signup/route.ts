import { NextResponse } from 'next/server'
import { signUp } from '../../../../lib/auth-service'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await signUp({ email, password, name })
    return NextResponse.json({ user })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create user' },
      { status: 500 }
    )
  }
}