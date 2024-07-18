import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import moment, { now } from "moment-timezone";
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        nik: { label: "nik", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { nik, password } = credentials;
        try {
          const user = await prisma.user.findMany({
            where: {
              nik: nik,
            },
          });

          const matchPassword = await bcrypt.compare(
            password,
            user[0].password
          );

          if (!matchPassword) {
            return null;
          }

          if (user.length === 0) {
            return null;
          }
          console.log(user[0]);
          const log = await prisma.log.create({
            data: {
              log_action: "LOGIN",
              log_message: `${user[0].name} successfully logged in at ${moment(
                now()
              )
                .tz("Asia/Jakarta")
                .format("DD-MM-YYYY HH:mm:ss")}`,
              log_user: user[0].nik,
            },
          });
          return {
            id: user[0].id,
            nik: user[0].nik,
            name: user[0].name,
          };
        } catch (error) {
          const log = await prisma.log.create({
            data: {
              log_action: "LOGIN",
              log_message: `${user[0].name} failed to logged in at ${moment(
                now()
              )
                .tz("Asia/Jakarta")
                .format("DD-MM-YYYY HH:mm:ss")}`,
              log_user: user[0].nik,
            },
          });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
