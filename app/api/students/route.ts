import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Student from '@/models/Student';
import jwt from 'jsonwebtoken';

// GET - Fetch all students (Public)
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const classType = searchParams.get('class');

    const query: any = {};
    if (year) query.year = year;
    if (classType) query.class = classType;

    const students = await Student.find(query).sort({ rank: 1 });
    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST - Add new student (Admin only)
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

    // 1. Check if admin is logged in
    const cookie = request.headers.get('cookie');
    const token = cookie?.split('admin_token=')[1]?.split(';')[0];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
    }

    // ✅ Verify token with proper secret
    try {
      jwt.verify(token, jwtSecret);
    } catch {
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }

    // 2. Connect to database
    await connectDB();

    // 3. Get form data
    const body = await request.json();
    console.log('Received data:', body); // Debug log

    const { name, photo, percentage, rank, classType, year } = body;

    // 4. Validate fields
    if (!name || !photo || !percentage || !rank || !classType || !year) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // 5. Create new student
    const student = new Student({
      name,
      photo,
      percentage,
      rank: parseInt(rank),
      class: classType,
      year,
    });

    // 6. Save to database
    await student.save();
    console.log('Student saved:', student); // Debug log

    return NextResponse.json({ success: true, data: student });
  } catch (error: any) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add student' },
      { status: 500 }
    );
  }
}

// ✅ PUT - Update student (Admin only)
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

    // 1. Check if admin is logged in
    const cookie = request.headers.get('cookie');
    const token = cookie?.split('admin_token=')[1]?.split(';')[0];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
    }

    // ✅ Verify token with proper secret
    try {
      jwt.verify(token, jwtSecret);
    } catch {
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }

    // 2. Connect to database
    await connectDB();

    // 3. Get form data
    const body = await request.json();
    console.log('Update data:', body); // Debug log

    const { id, ...updateData } = body;

    // 4. Validate ID
    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // 5. Update student
    const student = await Student.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    console.log('Student updated:', student); // Debug log
    return NextResponse.json({ success: true, data: student });
  } catch (error: any) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update student' },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Delete student (Admin only)
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

    // 1. Check if admin is logged in
    const cookie = request.headers.get('cookie');
    const token = cookie?.split('admin_token=')[1]?.split(';')[0];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
    }

    // ✅ Verify token with proper secret
    try {
      jwt.verify(token, jwtSecret);
    } catch {
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }

    // 2. Connect to database
    await connectDB();

    // 3. Get ID from URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // 4. Validate ID
    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // 5. Delete student
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    console.log('Student deleted:', student); // Debug log
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete student' },
      { status: 500 }
    );
  }
}