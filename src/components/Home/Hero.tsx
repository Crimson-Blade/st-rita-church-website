import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div 
      className="relative bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-blue-900/80 text-white"
      style={{
        backgroundImage: 'url("/outside.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-yellow-300">St. Rita's Church</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              A Catholic community where faith comes alive through worship, service, 
              and fellowship. Join us as we grow together in Christ's love.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link
                to="/mass-timings"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-center"
              >
                View Mass Timings
              </Link>
              <Link
                to="/about"
                className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">1,200+</div>
                  <div className="text-sm text-blue-200">Parishioners</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm text-blue-200">Weekly Events</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm text-blue-200">Ministries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image/Quote */}
          <div className="text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
              <blockquote className="text-2xl font-italic mb-6">
                "Come to me, all you who are weary and burdened, 
                and I will give you rest."
              </blockquote>
              <cite className="text-yellow-300 font-semibold">
                - Matthew 11:28
              </cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;