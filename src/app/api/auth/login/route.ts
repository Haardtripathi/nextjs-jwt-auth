/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/models/user.model';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        // Find user
        const user = await User.findOne({ email });
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

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({
            user: {
                id: user._id,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

