import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { connectToDB } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials", 
            credentials: {
                email: { label: "Email", type: "text" }, 
                password: { label: "Password", type: "password" }
            }, 
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing Email or Password")
                }

                try {
                    await connectToDB(); 
                    const user = await User.findOne({
                        email: credentials.email
                    })
                    if (!user) {
                        throw new Error("No User Found")
                    }
                    // comparing the password stored in db and given in the 
                    // credentials
                    const isValid = await bcrypt.compare(
                        credentials.password, 
                        user.password
                    )
                    if (!isValid) {
                        throw new Error("Invalid Password")
                    }
                    return {
                        id: user._id.toString(), 
                        email: user.email, 
                    }

                } catch (error) {
                    throw error
                }
            }
        })
    ]
}