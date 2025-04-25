// src/lib/products.ts
import { slugify } from './utils';

export interface ProductData {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  stock: number;
}

// Sample product data to populate the database
export const productData: ProductData[] = [
  {
    id: 1,
    name: 'Marvel characters PACKAGE',
    slug: 'marvel-characters-package',
    description: 'A collection of 4 high-quality wooden posters featuring popular Marvel characters including Spider-Man, Yoda, Iron Man, and Hulk. Perfect for Marvel fans who want to decorate their space with their favorite superheroes.',
    price: 749.00,
    image_url: '/images/marvel-package.jpg',
    category_id: 1, // Movies
    stock: 15
  },
  {
    id: 2,
    name: 'Batman Poster',
    slug: 'batman-poster',
    description: 'High-quality wooden poster featuring Batman on a striking red background. Perfect for fans of DC comics and movies. This poster is made from premium wood with vibrant colors that won\'t fade over time.',
    price: 199.00,
    image_url: '/images/batman-poster.jpg',
    category_id: 1, // Movies
    stock: 25
  },
  {
    id: 3,
    name: 'Venom Movie Poster',
    slug: 'venom-movie-poster',
    description: 'Stunning wooden poster featuring Venom from the popular Sony/Marvel movie. This high-quality poster showcases the iconic symbiote character with vibrant colors on durable wooden material.',
    price: 199.00,
    image_url: '/images/venom-poster.jpg',
    category_id: 1, // Movies
    stock: 20
  },
  {
    id: 4,
    name: 'Blade Runner Posters bundle',
    slug: 'blade-runner-posters-bundle',
    description: 'A bundle of two high-quality wooden posters featuring scenes from the iconic Blade Runner films. This set includes posters from both the original Blade Runner and Blade Runner 2049, perfect for sci-fi enthusiasts.',
    price: 375.00,
    image_url: '/images/blade-runner-bundle.jpg',
    category_id: 1, // Movies
    stock: 10
  },
  {
    id: 5,
    name: 'Joker Movie Poster',
    slug: 'joker-movie-poster',
    description: 'Vibrant wooden poster featuring the Joker from the award-winning 2019 film. This high-quality poster captures the haunting essence of Joaquin Phoenix\'s character with stunning detail on premium wooden material.',
    price: 199.00,
    image_url: '/images/joker-poster.jpg',
    category_id: 1, // Movies
    stock: 30
  },
  {
    id: 6,
    name: 'Stranger Things Poster',
    slug: 'stranger-things-poster',
    description: 'Wooden poster featuring the iconic imagery from the hit Netflix series Stranger Things. Perfect for fans of the show, this high-quality poster captures the 80s nostalgia and supernatural elements of the series.',
    price: 199.00,
    image_url: '/images/stranger-things-poster.jpg',
    category_id: 2, // TV Shows
    stock: 25
  },
  {
    id: 7,
    name: 'Breaking Bad Poster',
    slug: 'breaking-bad-poster',
    description: 'High-quality wooden poster featuring Walter White from the critically acclaimed series Breaking Bad. This poster showcases the transformation of the main character with vibrant colors and detailed artwork.',
    price: 199.00,
    image_url: '/images/breaking-bad-poster.jpg',
    category_id: 2, // TV Shows
    stock: 20
  },
  {
    id: 8,
    name: 'Game of Thrones Bundle',
    slug: 'game-of-thrones-bundle',
    description: 'A collection of three wooden posters featuring iconic imagery from Game of Thrones. This bundle includes House Stark, House Targaryen, and House Lannister sigils, perfect for fans of the epic fantasy series.',
    price: 499.00,
    image_url: '/images/got-bundle.jpg',
    category_id: 2, // TV Shows
    stock: 15
  },
  {
    id: 9,
    name: 'The Witcher Poster',
    slug: 'the-witcher-poster',
    description: 'Wooden poster featuring Geralt of Rivia from the popular game and Netflix series The Witcher. This high-quality poster showcases the White Wolf in stunning detail on premium wooden material.',
    price: 199.00,
    image_url: '/images/witcher-poster.jpg',
    category_id: 3, // Games
    stock: 25
  },
  {
    id: 10,
    name: 'God of War Poster',
    slug: 'god-of-war-poster',
    description: 'High-quality wooden poster featuring Kratos and Atreus from the acclaimed God of War series. This poster captures the epic father-son journey with vibrant colors and detailed artwork on premium wooden material.',
    price: 199.00,
    image_url: '/images/god-of-war-poster.jpg',
    category_id: 3, // Games
    stock: 20
  },
  {
    id: 11,
    name: 'Cyberpunk 2077 Poster',
    slug: 'cyberpunk-2077-poster',
    description: 'Vibrant wooden poster featuring the futuristic world of Cyberpunk 2077. This high-quality poster showcases the neon-lit streets of Night City with stunning detail on premium wooden material.',
    price: 199.00,
    image_url: '/images/cyberpunk-poster.jpg',
    category_id: 3, // Games
    stock: 25
  },
  {
    id: 12,
    name: 'Demon Slayer Poster',
    slug: 'demon-slayer-poster',
    description: 'Wooden poster featuring Tanjiro and Nezuko from the popular anime series Demon Slayer. This high-quality poster showcases the main characters with vibrant colors and detailed artwork on premium wooden material.',
    price: 199.00,
    image_url: '/images/demon-slayer-poster.jpg',
    category_id: 4, // Anime
    stock: 30
  },
  {
    id: 13,
    name: 'Attack on Titan Poster',
    slug: 'attack-on-titan-poster',
    description: 'High-quality wooden poster featuring Eren Yeager from the acclaimed anime series Attack on Titan. This poster captures the intensity of the series with vibrant colors and detailed artwork.',
    price: 199.00,
    image_url: '/images/attack-on-titan-poster.jpg',
    category_id: 4, // Anime
    stock: 25
  },
  {
    id: 14,
    name: 'My Hero Academia Bundle',
    slug: 'my-hero-academia-bundle',
    description: 'A collection of three wooden posters featuring popular characters from My Hero Academia. This bundle includes Deku, All Might, and Bakugo, perfect for fans of the superhero anime series.',
    price: 499.00,
    image_url: '/images/mha-bundle.jpg',
    category_id: 4, // Anime
    stock: 15
  },
  {
    id: 15,
    name: 'One Piece Poster',
    slug: 'one-piece-poster',
    description: 'Wooden poster featuring the Straw Hat crew from the long-running anime series One Piece. This high-quality poster showcases the main characters with vibrant colors and detailed artwork on premium wooden material.',
    price: 199.00,
    image_url: '/images/one-piece-poster.jpg',
    category_id: 4, // Anime
    stock: 30
  }
];

// Function to insert all products into the database
export async function seedProducts(db: D1Database): Promise<void> {
  const insertProductStmt = db.prepare(`
    INSERT INTO products (name, slug, description, price, image_url, category_id, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const product of productData) {
    await insertProductStmt
      .bind(
        product.name,
        product.slug,
        product.description,
        product.price,
        product.image_url,
        product.category_id,
        product.stock
      )
      .run();
  }
}
