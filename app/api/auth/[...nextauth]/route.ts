import NextAuth, { type NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { hash, compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "login",
            name: 'logowanie',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "sigma@basedeparment.com" },
                password: { label: "Hasło", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email.toLowerCase()
                    }
                })

                if (!user) {
                    throw new Error("Upewnij się że podałeś poprawnego maila i hasło");
                }

                const isPasswordValid = await compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordValid) {
                    throw new Error("Upewnij się że podałeś poprawnego maila i hasło");
                }

                return {
                    id: user.id.toString(),
                    user_id: user.id,
                    name: user.name,
                    email: user.email.toLowerCase(),

                }
            }
        }),
        CredentialsProvider({
            id: "register",
            name: 'rejstracja',
            credentials: {
                username: { label: "Nazwa", type: "string", placeholder: "sigma" },
                email: { label: "Email", type: "email", placeholder: "sigma@basedeparment.com" },
                password: { label: "Hasło", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.email || !credentials?.password) {
                    return null
                }

                const emailExists = await prisma.user.findUnique({
                    where: {
                        email: credentials.email.toLowerCase()
                    }
                })

                if (emailExists) {
                    throw new Error("email jest zajęty");
                }

                const nameExists = await prisma.user.findFirst({
                    where: {
                        name: credentials.username
                    }
                })
                if (nameExists) {
                    throw new Error("nazwa użytkownika jest zajęta");
                }
                const password: string = (await hash(credentials.password, 12)).toString()
                const user = await prisma.user.create({
                    data: {
                        name: credentials.username,
                        email: credentials.email.toLowerCase(),
                        password
                    },
                });

                return { id: user.id.toString(), username: user.name, email: user.email }
            }
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: parseInt(token.id)
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id
                }
            }
            return token
        }
    },
    pages: {
        "signIn": "/login"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }