import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    // ✅ Get JWT secret from environment
    const jwtSecret = process.env.JWT_SECRET;

    // ✅ CRITICAL FIX: Check if JWT secret is set
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET environment variable is missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // ✅ Extract token from cookie
    const cookie = request.headers.get('cookie');
    const token = cookie?.split('admin_token=')[1]?.split(';')[0];

    if (!token) {
      return NextResponse.json({ isAdmin: false });
    }

    // ✅ Verify token with proper secret
    try {
      jwt.verify(token, jwtSecret);
      return NextResponse.json({ isAdmin: true });
    } catch {
      return NextResponse.json({ isAdmin: false });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isAdmin: false });
  }
}