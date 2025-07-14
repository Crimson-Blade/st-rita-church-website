import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from '../Icons';
import { strapiApi } from '../../services/api';
import type { ParishInfo } from '../../types';

const Footer: React.FC = () => {
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);

  useEffect(() => {
    const fetchParishInfo = async () => {
      const info = await strapiApi.getParishInfo();
      setParishInfo(info);
    };
    fetchParishInfo();
  }, []);

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Parish Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 p-1">
              <img 
                src="/rita.png"
                alt="St. Rita's Parish Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
              <div>
                <h3 className="text-xl font-bold">{parishInfo?.parishName || 'St. Rita\'s Parish'}</h3>
                <p className="text-sm text-blue-200">{parishInfo?.parishSubtitle || 'Catholic Church'}</p>
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
                  {parishInfo?.address || 'St Rita\'s Church, Maina, Curtorim, Shelvan, Goa 403709'}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-sm text-blue-200">{parishInfo?.officePhone || '08326638644'}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-sm text-blue-200">{parishInfo?.officeEmail || 'st.rita.maina1960@gmail.com'}</span>
              </div>
            </div>
          </div>

          {/* Mass Times */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Mass Timings</h4>
            <div className="space-y-2 text-sm text-blue-200">
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>{parishInfo?.sundayMass || '6:30 AM, 8:15 AM, 9:30 AM (English)'}</span>
              </div>
              <div className="flex justify-between">
                <span>Weekdays:</span>
                <span>{parishInfo?.weekdayMass || '6:45 AM'}</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>{parishInfo?.saturdayMass || '6:00 PM'}</span>
              </div>
              {parishInfo?.confessionTimings && (
                <div className="flex justify-between">
                  <span>Confession:</span>
                  <span>{parishInfo.confessionTimings}</span>
                </div>
              )}
              <div className="mt-3">
                <Link
                  to="/mass-timings"
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
                to="/notice-board"
                className="block text-sm text-blue-200 hover:text-white transition-colors"
              >
                Weekly Bulletins
              </Link>
              <Link
                to="/mass-timings"
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
                to="/contact"
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
              <div>© {new Date().getFullYear()} {parishInfo?.parishName || 'St. Rita\'s Parish'}. All rights reserved.</div>
              <div className="text-xs text-blue-300 mt-1">
                Made with ❤️ by{' '}
                <a
                  href="https://in.linkedin.com/in/lance-barreto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors underline"
                >
                  Lance Barreto
                </a>
              </div>
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