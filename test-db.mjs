// test-db.mjs
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        // Test the connection
        await prisma.$connect()
        console.log('✅ Database successfully connected')
        
        // Perform a simple query
        const userCount = await prisma.user.count()
        console.log(`Number of users in database: ${userCount}`)
        
    } catch (error) {
        console.error('❌ Database connection failed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()