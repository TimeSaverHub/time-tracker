import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { prisma } from "../../../../lib/prisma"
import type { NextAuthConfig } from 'next-auth'

const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('=== AUTH DEBUG START ===')
        console.log('Credentials received:', credentials) // in authorize

        if (!credentials?.email || !credentials?.password) {
          console.log('[AUTH] Missing email or password')
          console.log('=== AUTH DEBUG END ===')
          return null
        }

        try {
          const { email, password } = credentials as { email: string; password: string }
          
          console.log('[AUTH] Looking up user:', email)
          const user = await prisma.user.findUnique({
            where: { email: email }
          })
          console.log('User found:', user) // after findUnique

          if (!user || !user.password) {
            console.log('[AUTH] User not found or no password set')
            console.log('=== AUTH DEBUG END ===')
            return null
          }

          const isValid = await compare(password, user.password)
          console.log('Password valid:', isValid) // after compare

          if (!isValid) {
            console.log('[AUTH] Invalid password')
            console.log('=== AUTH DEBUG END ===')
            return null
          }

          console.log('[AUTH] Login successful:', user.email)
          console.log('=== AUTH DEBUG END ===')
          return {
            id: user.id,
            email: user.email,
            name: user.name
          }
        } catch (error) {
          console.error('[AUTH] Error:', error)
          console.log('=== AUTH DEBUG END ===')
          throw error // Changed to throw error instead of returning null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string || null
      }
      return session
    }
  }
}

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }