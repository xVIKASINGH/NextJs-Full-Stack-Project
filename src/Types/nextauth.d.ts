// types/next-auth.d.ts or anywhere in your `types` folder
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      name?: string;
      email?: string;
      isverified: boolean;
      isAcceptingMessage: boolean;
      username?: string;
    };
  }

  interface User {
    _id?: string;
    isverified: boolean;
    isAcceptingMessage: boolean;
    username?: string;
  }

  interface JWT {
    _id?: string;
    name?: string;
    email?: string;
    isverified: boolean;
    isAcceptingMessage: boolean;
    username?: string;
  }
}
