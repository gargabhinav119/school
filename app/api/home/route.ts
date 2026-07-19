import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Home from '@/models/Home';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    await connectDB();
    let data = await Home.findOne();
    if (!data) {
      data = await Home.create({});
    }
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('GET Home Error:', error);
    return NextResponse.json({ error: 'Failed to fetch home data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // ✅ Get JWT secret from environment
    const jwtSecret = process.env.JWT_SECRET;
    
    // ✅ CRITICAL FIX: No fallback - check if secret exists
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET environment variable is missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const cookie = request.headers.get('cookie');
    const token = cookie?.split('admin_token=')[1]?.split(';')[0];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // ✅ Verify token with proper secret
    try {
      jwt.verify(token, jwtSecret);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const body = await request.json();
    let data = await Home.findOne();
    
    if (!data) {
      data = await Home.create(body);
    } else {
      Object.assign(data, body);
      data.updatedAt = new Date();
      await data.save();
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('PUT Home Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 500 });
  }
}