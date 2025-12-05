import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-50 border-t mt-10 w-full">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Brand */}
        <h2 className="text-3xl font-bold text-pink-600 text-center">
          Sweet Bites
        </h2>
        <p className="text-center text-gray-600 text-sm mt-1">
          Freshly baked happiness delivered to your doorstep 🎂✨
        </p>

        {/* Sections */}
        <div
          className="
            grid grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            gap-8 mt-10 text-sm
          "
        >
          {/* About */}
          <div>
            <h3 className="font-semibold mb-3 text-pink-600 text-lg">
              About
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-pink-600 cursor-pointer transition">Fresh Cakes</li>
              <li className="hover:text-pink-600 cursor-pointer transition">Custom Designs</li>
              <li className="hover:text-pink-600 cursor-pointer transition">Fast Delivery</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3 text-pink-600 text-lg">
              Categories
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li><Link to="/category/Birthday Cakes" className="hover:text-pink-600 transition">Birthday Cakes</Link></li>
              <li><Link to="/category/Anniversary Cakes" className="hover:text-pink-600 transition">Anniversary Cakes</Link></li>
              <li><Link to="/category/Kids Cakes" className="hover:text-pink-600 transition">Kids Cakes</Link></li>
              <li><Link to="/category/Designer Cakes" className="hover:text-pink-600 transition">Designer Cakes</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-pink-600 text-lg">
              Contact
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>📞 +91 91008 94542</li>
              <li>📍 Hyderabad, India</li>
              <li>✉️ sweetbites@gmail.com</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3 text-pink-600 text-lg">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl text-pink-600">
              <span className="cursor-pointer hover:scale-125 transition">📷</span>
              <span className="cursor-pointer hover:scale-125 transition">👍</span>
              <span className="cursor-pointer hover:scale-125 transition">▶️</span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-4 border-t text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Sweet Bites. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
