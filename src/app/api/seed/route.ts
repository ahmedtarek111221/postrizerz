// src/app/api/seed/route.ts
import { getCloudflareContext } from '@/lib/cloudflare';
import { seedProducts } from '@/lib/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { env } = getCloudflareContext();
  
  try {
    await seedProducts(env.DB);
    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
