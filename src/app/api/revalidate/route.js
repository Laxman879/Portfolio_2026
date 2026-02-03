import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Revalidate the home page and admin page
    revalidatePath('/');
    revalidatePath('/admin');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Revalidated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Revalidation failed' 
    }, { status: 500 });
  }
}