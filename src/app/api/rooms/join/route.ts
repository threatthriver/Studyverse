import { NextRequest, NextResponse } from 'next/server';

// In-memory store for rooms (would use a database in production)
// This should be the same store as in the main rooms API
const rooms = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId, userId, userName } = body;
    
    if (!roomId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: roomId, userId' },
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
    
    // Check if user is already in the room
    if (!room.participants.includes(userId)) {
      room.participants.push(userId);
      
      // Add to participants list with user info
      if (!room.participantsInfo) {
        room.participantsInfo = [];
      }
      
      room.participantsInfo.push({
        userId,
        userName: userName || `User-${userId.substring(0, 4)}`,
        joinedAt: new Date().toISOString(),
        status: 'active'
      });
      
      // Update the room
      rooms.set(roomId, room);
    }
    
    return NextResponse.json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Error joining room:', error);
    return NextResponse.json(
      { error: 'Failed to join room' },
      { status: 500 }
    );
  }
}
