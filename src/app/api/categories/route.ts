// src/app/api/categories/route.ts
import { getCloudflareContext } from '@/lib/cloudflare';
import { getCategories } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { env } = getCloudflareContext();
  
  try {
    const categories = await getCategories(env.DB);
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
