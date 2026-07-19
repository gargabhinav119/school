import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // ✅ Input validation
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Invalid password format' },
        { status: 400 }
      );
    }

    // ✅ CRITICAL FIX: No fallback defaults - environment variables must be set
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    // ✅ Check if environment variables are set
    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD environment variable is missing');
      return NextResponse.json(
        { error: 'Server configuration error - Missing admin password' },
        { status: 500 }
      );
    }

    if (!jwtSecret) {
      console.error('❌ JWT_SECRET environment variable is missing');
      return NextResponse.json(
        { error: 'Server configuration error - Missing JWT secret' },
        { status: 500 }
      );
    }

    // ✅ Check password
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // ✅ Generate JWT token with proper payload
    const token = jwt.sign(
      { 
        role: 'admin',
        timestamp: Date.now()
      },
      jwtSecret,
      { expiresIn: '1h' } // ✅ CHANGED: 7 days to 1 hour
    );

    // ✅ Create response
    const response = NextResponse.json(
      { success: true, message: 'Login successful' }
    );

    // ✅ Set cookie with proper security
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // ✅ CHANGED: 7 days (604800) to 1 hour (3600 seconds)
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}