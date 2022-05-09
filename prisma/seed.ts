import { prisma } from "../src/config/prisma";
import bcrypt from 'bcryptjs'

(async () => {

    const salt = await bcrypt.genSalt(10)
    await prisma.user.create({
        data: {
            email: 'seed@mail.com',
            password: await bcrypt.hash('123', salt),
            name: 'seed',
            unity: 'Contagem',
            profile: 'Admin',
        }
    })
    console.log('Added user seed')
})()