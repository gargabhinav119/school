import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Infrastructure from '@/models/Infrastructure';
import jwt from 'jsonwebtoken';

// GET - Fetch infrastructure data
export async function GET() {
  try {
    await connectDB();
    let data = await Infrastructure.findOne();
    
    if (!data) {
      data = await Infrastructure.create({});
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch infrastructure data' },
      { status: 500 }
    );
  }
}

// PUT - Update infrastructure data (Admin only)
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
    
    let data = await Infrastructure.findOne();
    
    if (!data) {
      data = await Infrastructure.create(body);
    } else {
      Object.assign(data, body);
      data.updatedAt = new Date();
      await data.save();
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update infrastructure data' },
      { status: 500 }
    );
  }
}