import React from 'react';
import { Link } from 'react-router-dom';
import { Cross, MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Parish Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-blue-700 to-blue-600 p-2 rounded-full">
                <Cross className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">St. Mary's Parish</h3>
                <p className="text-sm text-blue-200">Catholic Church</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              A welcoming Catholic community dedicated to faith, fellowship, and service.
              Join us in worship and grow in your relationship with Christ.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-sm text-blue-200">
                  123 Church Street<br />
                  Anytown, ST 12345
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-sm text-blue-200">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-sm text-blue-200">office@stmaryparish.org</span>
              </div>
            </div>
          </div>

          {/* Mass Times */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Mass Times</h4>
            <div className="space-y-2 text-sm text-blue-200">
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>8:00 AM, 10:30 AM, 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Weekdays:</span>
                <span>7:00 AM, 12:10 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>8:00 AM, 5:30 PM</span>
              </div>
              <div className="mt-3">
                <Link
                  to="/mass-times"
                  className="text-blue-300 hover:text-white text-sm underline"
                >
                  View Full Schedule
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                to="/bulletins"
                className="block text-sm text-blue-200 hover:text-white transition-colors"
              >
                Weekly Bulletins
              </Link>
              <Link
                to="/confession"
                className="block text-sm text-blue-200 hover:text-white transition-colors"
              >
                Confession Times
              </Link>
              <Link
                to="/baptism"
                className="block text-sm text-blue-200 hover:text-white transition-colors"
              >
                Baptism Information
              </Link>
              <Link
                to="/marriage"
                className="block text-sm text-blue-200 hover:text-white transition-colors"
              >
                Marriage Preparation
              </Link>
              <Link
                to="/feedback"
                className="block text-sm text-blue-200 hover:text-white transition-colors"
              >
                Parish Feedback
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-blue-200 mb-4 md:mb-0">
              © {new Date().getFullYear()} St. Mary's Parish. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-blue-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-blue-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;