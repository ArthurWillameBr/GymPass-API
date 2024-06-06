import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface registerUseCaseRequest {
    name: string,
    email: string
    password: string
}

export async function registerUseCase({email, name, password }: registerUseCaseRequest  ) {
    const password_hash = await hash(password, 6)

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if (userWithEmail) {
        throw new Error("Email already exists")
    }

    const prismaUsersRepository = new PrismaUsersRepository()

    await prismaUsersRepository.create({
        name,
        email,
        password_hash,
    })
}