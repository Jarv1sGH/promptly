import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import User from "@models/userModel";
import { connectToDataBase } from "@utils/database";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDataBase();
        // check if user already exists
        const doesUserExist = await User.findOne({ email: profile.email });

        // if not, creating a new user
        if (!doesUserExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error.message );
        return false;
      }
    },
  },
});

export { authHandler as GET, authHandler as POST };
