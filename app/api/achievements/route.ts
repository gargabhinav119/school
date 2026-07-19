import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Achievement from '@/models/Achievement';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    await connectDB();
    const achievements = await Achievement.find({ isActive: true }).sort({ year: -1 });
    return NextResponse.json({ success: true, data: achievements });
  } catch (error) {
    console.error('GET Achievements Error:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
    const achievement = await Achievement.create(body);
    return NextResponse.json({ success: true, data: achievement });
  } catch (error: any) {
    console.error('POST Achievement Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create achievement' }, { status: 500 });
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
    const { id, ...updateData } = body;
    const achievement = await Achievement.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: achievement });
  } catch (error: any) {
    console.error('PUT Achievement Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update achievement' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Achievement.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE Achievement Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete achievement' }, { status: 500 });
  }
}