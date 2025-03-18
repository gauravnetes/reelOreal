import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if(!email || !password) {
            return NextResponse.json(
                {error: "email & password are required"}, 
                {status: 400}
            )
        }

        await connectToDB(); 

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return NextResponse.json(
                {error: "email is already registered"}, 
                {status: 400}
            )
        }

        await User.create({
            email, 
            password
        })

        return NextResponse.json(
            { message: "User registered successfullyy" }, 
            { status: 201 }
        ); 

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to register User" }, 
            { status: 500 }
        )
    }
}

// Handling this in Frontend
// const res = fetch("api/auth/register", {
//     method: "POST", 
//     headers: {"Content-Type": "appplication/json"}, 
//     body: JSON.stringify({ email, password })
// })

// res.json()