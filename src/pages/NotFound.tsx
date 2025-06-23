import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Cross, BookOpen } from '../components/Icons';

const NotFound: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative py-16"
      style={{
        backgroundImage: 'url("/inside.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 text-center text-white px-4 py-8 max-w-2xl mx-auto">
        {/* Parish Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm p-2">
            <img 
              src="/rita.png"
              alt="St. Rita's Parish Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-8xl lg:text-9xl font-bold text-white/90 mb-4 tracking-tight">
            404
          </h1>
          <div className="flex items-center justify-center mb-6">
            <Cross className="h-8 w-8 text-blue-300 mr-3" />
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Page Not Found
            </h2>
            <Cross className="h-8 w-8 text-blue-300 ml-3" />
          </div>
        </div>

        {/* Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8 border border-white/20">
          <BookOpen className="h-12 w-12 text-blue-300 mx-auto mb-4" />
          <p className="text-xl text-blue-100 mb-4 leading-relaxed">
            Like a lost sheep, this page has wandered away from the flock.
          </p>
          <p className="text-lg text-white/80">
            "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."
          </p>
          <p className="text-sm text-blue-200 mt-2 italic">
            - Psalm 23:1-2
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Home className="h-5 w-5 mr-3" />
            Return Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 border border-white/30"
          >
            <ArrowLeft className="h-5 w-5 mr-3" />
            Go Back
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 mb-4">Perhaps you were looking for:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              to="/mass-timings" 
              className="text-blue-300 hover:text-blue-100 transition-colors duration-200"
            >
              Mass Times
            </Link>
            <span className="text-white/40">•</span>
            <Link 
              to="/blog" 
              className="text-blue-300 hover:text-blue-100 transition-colors duration-200"
            >
              Blog
            </Link>
            <span className="text-white/40">•</span>
            <Link 
              to="/ministries" 
              className="text-blue-300 hover:text-blue-100 transition-colors duration-200"
            >
              Ministries
            </Link>
            <span className="text-white/40">•</span>
            <Link 
              to="/about" 
              className="text-blue-300 hover:text-blue-100 transition-colors duration-200"
            >
              About Us
            </Link>
            <span className="text-white/40">•</span>
            <Link 
              to="/contact" 
              className="text-blue-300 hover:text-blue-100 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
