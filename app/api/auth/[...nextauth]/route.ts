import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "sigma@basedeparment.com" },
                password: { label: "Hasło", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "Giga Chad B)", email: "sigma@basedeparment.com" }
                return user
            }
        })
    ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }