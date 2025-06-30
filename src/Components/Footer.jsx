import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900  text-gray-300 py-4 px-6 w-full ">
      <div className="max-w-7xl mx-auto">
        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          {/* About PlantHub */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">🌿 PlantHub</h3>
            <p className="text-sm leading-relaxed">
              PlantHub is your green companion — subscribe, grow, and flourish with personalized care plans and
              expert advice.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['Home', 'Plans', 'Services', 'FAQ', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {['Plant Library', 'Care Tips', 'Blog', 'Support'].map((resource) => (
                <li key={resource}>
                  <a href="#" className="hover:text-white transition-colors">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@planthub.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Kottakkal, Kerala</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-green-700 pt-4 text-center text-xs sm:text-sm text-gray-400">
          © {new Date().getFullYear()} PlantHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
