/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from '@/app/lib/db';
import User from '@/app/models/user.model';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check password
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json(
            {
                user: {
                    id: user.id,
                    email: user.email,
                },
                token,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
