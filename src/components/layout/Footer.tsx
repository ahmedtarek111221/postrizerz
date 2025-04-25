export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Postrizerz</h3>
            <p className="text-gray-300">
              Handpicked wooden masterpieces to elevate your space. Discover quality craftsmanship and diverse designs that redefine your surroundings.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition">Home</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-blue-400 transition">Products</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition">About</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@postrizerz.com</li>
              <li>Phone: +20 123 456 7890</li>
              <li>Address: Cairo, Egypt</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Postrizerz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
