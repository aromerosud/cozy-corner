import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";

import { getDb } from "@/src/db";
import { users } from "@/src/db/schema";
import { verifyPassword } from "@/src/lib/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: "/api/v1/auth",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        const db = getDb();

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user) {
          return null;
        }

        const isValidPassword = await verifyPassword(
          password,
          user.passwordHash,
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.displayName,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
});
