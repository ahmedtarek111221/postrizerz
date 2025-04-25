// src/lib/db.ts
import { D1Database } from '@cloudflare/workers-types';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  stock: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

export async function getCategories(db: D1Database): Promise<Category[]> {
  const { results } = await db.prepare('SELECT * FROM categories ORDER BY name').all();
  return results as Category[];
}

export async function getCategoryBySlug(db: D1Database, slug: string): Promise<Category | null> {
  const result = await db.prepare('SELECT * FROM categories WHERE slug = ?').bind(slug).first();
  return result as Category | null;
}

export async function getProducts(db: D1Database, limit = 100, offset = 0): Promise<Product[]> {
  const { results } = await db.prepare(
    'SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).bind(limit, offset).all();
  return results as Product[];
}

export async function getProductsByCategory(db: D1Database, categoryId: number): Promise<Product[]> {
  const { results } = await db.prepare(
    'SELECT * FROM products WHERE category_id = ? ORDER BY created_at DESC'
  ).bind(categoryId).all();
  return results as Product[];
}

export async function getProductsByCategorySlug(db: D1Database, slug: string): Promise<Product[]> {
  const { results } = await db.prepare(`
    SELECT p.* FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.slug = ?
    ORDER BY p.created_at DESC
  `).bind(slug).all();
  return results as Product[];
}

export async function getProductBySlug(db: D1Database, slug: string): Promise<Product | null> {
  const result = await db.prepare('SELECT * FROM products WHERE slug = ?').bind(slug).first();
  return result as Product | null;
}

export async function getRelatedProducts(db: D1Database, productId: number, categoryId: number, limit = 4): Promise<Product[]> {
  const { results } = await db.prepare(`
    SELECT * FROM products 
    WHERE category_id = ? AND id != ? 
    ORDER BY RANDOM() 
    LIMIT ?
  `).bind(categoryId, productId, limit).all();
  return results as Product[];
}

export async function getPaymentMethods(db: D1Database): Promise<PaymentMethod[]> {
  const { results } = await db.prepare('SELECT * FROM payment_methods WHERE is_active = 1').all();
  return results as PaymentMethod[];
}
