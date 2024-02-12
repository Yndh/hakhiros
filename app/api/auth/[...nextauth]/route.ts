import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { hash, compare } from 'bcrypt'
import isValidEmail from "@/lib/isValidEmail";
import { IUser } from "@/types/next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "login",
            name: 'logowanie',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "sigma@basedeparment.com" },
                password: { label: "Hasło", type: "password" }
            },
            async authorize(credentials): Promise<IUser | null> {
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
                    id: user.id,
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
            async authorize(credentials): Promise<IUser | null> {
                if (!credentials?.username || !credentials?.email || !credentials?.password) {
                    return null
                }
                if (!isValidEmail(credentials.email)) {
                    throw new Error("wprowadź poprawny email");
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
                        password: password
                    },
                });

                return { id: user.id, user_id: user.id, name: user.name, email: user.email }
            }
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
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