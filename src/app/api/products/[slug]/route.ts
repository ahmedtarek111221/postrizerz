// src/app/api/products/[slug]/route.ts
import { getCloudflareContext } from '@/lib/cloudflare';
import { getProductBySlug, getRelatedProducts } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const { env } = getCloudflareContext();
  
  try {
    const product = await getProductBySlug(env.DB, slug);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Get related products
    const relatedProducts = await getRelatedProducts(env.DB, product.id, product.category_id);
    
    return NextResponse.json({ product, relatedProducts });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
