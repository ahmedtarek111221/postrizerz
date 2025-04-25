import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  // Sample product data
  const featuredProducts = [
    {
      id: 1,
      name: 'Marvel characters PACKAGE',
      price: 749.00,
      image: '/images/marvel-package.jpg',
      slug: 'marvel-characters-package'
    },
    {
      id: 2,
      name: 'Batman Poster',
      price: 199.00,
      image: '/images/batman-poster.jpg',
      slug: 'batman-poster'
    },
    {
      id: 3,
      name: 'Venom Movie Poster',
      price: 199.00,
      image: '/images/venom-poster.jpg',
      slug: 'venom-movie-poster'
    },
    {
      id: 4,
      name: 'Blade Runner Posters bundle',
      price: 375.00,
      image: '/images/blade-runner-bundle.jpg',
      slug: 'blade-runner-posters-bundle'
    },
    {
      id: 5,
      name: 'Joker Movie Poster',
      price: 199.00,
      image: '/images/joker-poster.jpg',
      slug: 'joker-movie-poster'
    }
  ];

  const categories = [
    { id: 1, name: 'Movies', slug: 'movies', image: '/images/category-movies.jpg' },
    { id: 2, name: 'TV Shows', slug: 'tv-shows', image: '/images/category-tv.jpg' },
    { id: 3, name: 'Games', slug: 'games', image: '/images/category-games.jpg' },
    { id: 4, name: 'Anime', slug: 'anime', image: '/images/category-anime.jpg' }
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-20">
          <h1 className="text-5xl font-bold mb-4">New in Store</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Transform your space with our curated wooden poster collection. Explore movie, TV show, game, and anime designs.
          </p>
          <Link href="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">New in Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {featuredProducts.map((product) => (
              <Link 
                href={`/products/${product.slug}`} 
                key={product.id}
                className="bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition group"
              >
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                  <div className="h-full w-full bg-gray-800"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-blue-400 transition">{product.name}</h3>
                  <p className="text-2xl font-bold">{product.price.toFixed(2)}EGP</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wall Art Wonderland Banner */}
      <section className="py-16 bg-[url('/images/wall-art-bg.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-8">Wall Art Wonderland</h2>
          <Link href="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition">
            تسوق الآن
          </Link>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-8">WELCOME</h2>
          <p className="text-lg leading-relaxed">
            "Welcome to Postrizerz, where art meets simplicity. Explore our handpicked wooden masterpieces to elevate your space. Discover quality craftsmanship and diverse designs that redefine your surroundings. Welcome to a world of artistic expression at Postrizerz!"
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link 
                href={`/products/category/${category.slug}`} 
                key={category.id}
                className="bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition group"
              >
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                  <div className="h-full w-full bg-gray-800"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-medium group-hover:text-blue-400 transition">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-blue-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🛒</span>
                الدفع عند الاستلام
              </h3>
              <p className="text-gray-300">يمكنك الدفع نقدا أو باستخدام بطاقة الائتمان عند تسليم طلبك</p>
            </div>
            <div className="border border-amber-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🚚</span>
                التوصيل السريع
              </h3>
              <p className="text-gray-300">استمتع براحة التسوق واحصل على منتجاتك بأسرع وقت ممكن مع خدمة التوصيل السريعة لدينا</p>
            </div>
            <div className="border border-purple-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">↩️</span>
                إرجاع مجاني
              </h3>
              <p className="text-gray-300">إذا كان العنصر لا يناسبك، نحن نوفر خدمة إرجاع مجانية لضمان راحة تامة لعملائنا</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
