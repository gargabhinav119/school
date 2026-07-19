import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Notice from '@/models/Notice';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notices });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookie = request.headers.get('cookie');
    const token = cookie?.split('admin_token=')[1]?.split(';')[0];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const body = await request.json();
    const notice = await Notice.create(body);
    return NextResponse.json({ success: true, data: notice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create notice' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookie = request.headers.get('cookie');
    const token = cookie?.split('admin_token=')[1]?.split(';')[0];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const body = await request.json();
    const { id, ...updateData } = body;
    const notice = await Notice.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: notice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update notice' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookie = request.headers.get('cookie');
    const token = cookie?.split('admin_token=')[1]?.split(';')[0];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Notice.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete notice' }, { status: 500 });
  }
}