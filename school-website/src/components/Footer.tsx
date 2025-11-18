import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">About School</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              +2 Hari Shankar Singh High School, Sharmapur is committed to providing quality education
              and nurturing young minds for a better tomorrow.
            </p>
            <div className="mt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl">
                HSS
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-secondary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-gray-300 hover:text-secondary transition">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="text-gray-300 hover:text-secondary transition">
                  Faculty
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-gray-300 hover:text-secondary transition">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-gray-300 hover:text-secondary transition">
                  Notice Board
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-secondary transition">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Portal */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Student Portal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-secondary transition">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/test-reports" className="text-gray-300 hover:text-secondary transition">
                  Test Reports
                </Link>
              </li>
              <li>
                <Link to="/attendance" className="text-gray-300 hover:text-secondary transition">
                  Attendance
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-gray-300 hover:text-secondary transition">
                  Downloads
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-secondary transition">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>Sharmapur, District - Example<br />State - Bihar, PIN - 123456</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <span>school@harishankar.edu.in</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕐</span>
                <span>Mon - Sat: 8:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © 2025 +2 Hari Shankar Singh High School, Sharmapur. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-secondary transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-secondary transition">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
