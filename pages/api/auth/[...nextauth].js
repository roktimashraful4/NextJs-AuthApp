import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from '../../../database/connection';
import Users from '../../../model/Schema';
import {compare} from 'bcryptjs'
export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.NEXT_GOOGLE_ID,
          clientSecret: process.env.NEXT_GOOGLE_SECRET
        }), 
        GitHubProvider({
          clientId: process.env.NEXT_GITHUB_ID,
          clientSecret: process.env.NEXT_GITHUB_SECRET
        }), 
        CredentialsProvider({ 
          name: "Credentials", 
          async authorize( credentials, req){ 
            connectMongo().catch(error =>{error:"Connection Failed"})

            // check the user exist
            const result = await Users.findOne({ email:credentials.email})
            if(!result){ 
              throw new Error("No user exist in the email")
            }

            // compare()
            const chackPassword = await compare(credentials.password, result.password)

            // incorrect password
            if(!chackPassword || result.email !== credentials.email){ 
              throw new Error('Username or Password dose not match')
            }
            return result;
          }
        })
      ]
})