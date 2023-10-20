import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { hash } from 'bcrypt'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "login",
            name: 'logowanie',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "sigma@basedeparment.com" },
                password: { label: "Hasło", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "Giga Chad B)", email: "sigma@basedeparment.com" }
                return user
            }
        }),
        CredentialsProvider({
            id: "register",
            name: 'rejstracja',
            credentials: {
                name: { label: "Nazwa", type: "string", placeholder: "sigma" },
                email: { label: "Email", type: "email", placeholder: "sigma@basedeparment.com" },
                password: { label: "Hasło", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.name || !credentials?.email || !credentials?.password) {
                    return null
                }

                const emailExists = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (emailExists) {
                    return null
                }
                const password: string = (await hash(credentials.password, 12)).toString()
                const user = await prisma.user.create({
                    data: {
                        name: credentials.name,
                        email: credentials.email,
                        password
                    },
                });

                return { id: user.id.toString(), name: user.name, email: user.email }
            }
        }),
    ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }