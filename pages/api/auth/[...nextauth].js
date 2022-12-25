import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.NEXT_GOOGLE_ID,
          clientSecret: process.env.NEXT_GOOGLE_SECRET
        }), 
        GitHubProvider({
          clientId: process.env.NEXT_GITHUB_ID,
          clientSecret: process.env.NEXT_GITHUB_SECRET
        })
      ]
})