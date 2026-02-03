import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    revalidatePath('/');
    return NextResponse.json({ success: true, message: 'Page revalidated' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Revalidation failed' });
  }
}