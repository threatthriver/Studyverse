import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// In-memory store for rooms (would use a database in production)
const rooms = new Map<string, any>();

// Get all rooms or a specific room
export async function GET(request: NextRequest) {
  const roomId = request.nextUrl.searchParams.get('roomId');
  
  // If roomId is provided, return that specific room
  if (roomId) {
    const room = rooms.get(roomId);
    
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(room);
  }
  
  // Otherwise return all rooms (with pagination in a real app)
  return NextResponse.json(Array.from(rooms.values()));
}

// Create a new room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, theme, createdBy } = body;
    
    if (!name || !createdBy) {
      return NextResponse.json(
        { error: 'Missing required fields: name, createdBy' },
        { status: 400 }
      );
    }
    
    const roomId = randomUUID();
    const createdAt = new Date().toISOString();
    
    const room = {
      id: roomId,
      name,
      theme: theme || 'library',
      createdBy,
      createdAt,
      participants: [createdBy],
      isPublic: body.isPublic || false,
    };
    
    rooms.set(roomId, room);
    
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}

// Update a room
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId, updates } = body;
    
    if (!roomId || !updates) {
      return NextResponse.json(
        { error: 'Missing roomId or updates' },
        { status: 400 }
      );
    }
    
    const room = rooms.get(roomId);
    
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }
    
    // Update the room
    const updatedRoom = { ...room, ...updates, updatedAt: new Date().toISOString() };
    rooms.set(roomId, updatedRoom);
    
    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json(
      { error: 'Failed to update room' },
      { status: 500 }
    );
  }
}
