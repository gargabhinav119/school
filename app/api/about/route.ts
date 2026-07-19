import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import About from '@/models/About';
import jwt from 'jsonwebtoken';

// GET - Fetch About data
export async function GET() {
  try {
    await connectDB();
    let about = await About.findOne();
    
    if (!about) {
      about = await About.create({});
    }
    
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error('GET About Error:', error);
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

// PUT - Update About data (Admin only)
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

    // Extract token from cookie
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
    
    let about = await About.findOne();
    
    if (!about) {
      about = await About.create(body);
    } else {
      Object.assign(about, body);
      about.updatedAt = new Date();
      await about.save();
    }
    
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error('PUT About Error:', error);
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}