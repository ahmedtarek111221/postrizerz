// src/app/api/products/route.ts
import { getCloudflareContext } from '@/lib/cloudflare';
import { getProducts, getProductsByCategory, getProductsByCategorySlug } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get('category');
  const categoryId = searchParams.get('categoryId');
  const limit = parseInt(searchParams.get('limit') || '100');
  const offset = parseInt(searchParams.get('offset') || '0');
  
  const { env } = getCloudflareContext();
  
  try {
    let products;
    
    if (categorySlug) {
      products = await getProductsByCategorySlug(env.DB, categorySlug);
    } else if (categoryId) {
      products = await getProductsByCategory(env.DB, parseInt(categoryId));
    } else {
      products = await getProducts(env.DB, limit, offset);
    }
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
