import { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import ConnecttoDb from "@/lib/dbConnect";
import UserModel from "@/app/model/UserModel";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await ConnecttoDb(); // ✅ Ensures DB is connected

        const user = await UserModel.findOne({
          $or: [
            { username: credentials?.identifier },
            { email: credentials?.identifier },
          ],
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.isverified) {
          throw new Error("Please verify before proceeding");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials.");
        }

        // ✅ Return shape used in jwt callback
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          isverified: user.isverified, // ✅ Include for jwt
          isAcceptingMessage: user.isAcceptingMessage, // ✅ Include for jwt
          username: user.username, // ✅ Include for jwt
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
       
        token._id = user.id;
        token.isverified = user.isverified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {

      session.user._id = token._id;
      session.user.isverified = token.isverified;
      session.user.isAcceptingMessage = token.isAcceptingMessage;
      session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in", // ✅ Custom sign-in route
  },
  session: {
    strategy: "jwt", // ✅ Using JWT session strategy
  },
 
};
