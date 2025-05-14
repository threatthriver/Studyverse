import { NextRequest, NextResponse } from 'next/server';

// This is a simple in-memory store for demonstration
// In production, you would use a database
const userPreferences = new Map<string, any>();

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Missing userId parameter' },
      { status: 400 }
    );
  }

  const preferences = userPreferences.get(userId) || {
    theme: 'library',
    accentColor: '#7C3AED',
    soundSettings: {
      ambientVolume: 0.5,
      musicVolume: 0.3,
      rainVolume: 0.4,
    },
    pomodoroSettings: {
      workDuration: 25 * 60,
      breakDuration: 5 * 60,
    }
  };

  return NextResponse.json(preferences);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, preferences } = body;

    if (!userId || !preferences) {
      return NextResponse.json(
        { error: 'Missing userId or preferences in request body' },
        { status: 400 }
      );
    }

    // Store the preferences
    userPreferences.set(userId, preferences);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving preferences:', error);
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    );
  }
}
