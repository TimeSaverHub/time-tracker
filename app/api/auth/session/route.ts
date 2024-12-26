import { NextResponse } from 'next/server';
import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';
import { initAdmin } from '@/lib/firebase-admin';

// Initialize Firebase Admin
initAdmin();

export async function POST(request: Request) {
  try {
    console.log('Session creation started');
    
    const { idToken } = await request.json();
    console.log('Received idToken');

    // Verify the ID token
    const decodedToken = await auth().verifyIdToken(idToken);
    console.log('Token verified:', decodedToken.uid);
    
    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth().createSessionCookie(idToken, { expiresIn });
    console.log('Session cookie created');
    
    // Set the cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    console.log('Cookie set');

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session', details: error }, 
      { status: 500 }
    );
  }
}

