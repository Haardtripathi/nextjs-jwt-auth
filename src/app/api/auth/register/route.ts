/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/models/user.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Create new user
        const user = await User.create({ email, password });

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

