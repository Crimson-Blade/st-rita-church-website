import React from 'react';
import OptimizedImage from '../OptimizedImage';

const LegacySection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Saint Rita's Eternal Legacy
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-amber-500 mx-auto mb-8"></div>
        </div>

        {/* Main Legacy Content */}
        <div className="max-w-6xl mx-auto">
          {/* Main Content - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Crown of Thorns Image - Left Side */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-400 to-amber-400 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="/saint-artwork/rita-crown-thorns.jpg"
                  alt="Saint Rita receiving the Crown of Thorns stigmata"
                  className="w-full h-auto"
                  objectFit="contain"
                />
              </div>
            </div>

            {/* Text Boxes - Right Side */}
            <div className="space-y-8">
              {/* Incorrupt Body */}
              <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    {/* Icon can be added here */}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Incorrupt Body</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Saint Rita's body remains incorrupt to this day, a miraculous sign of her holiness. 
                      Pilgrims from around the world come to venerate her relics at the Basilica in Cascia, Italy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feast Day */}
              <div className="bg-gradient-to-br from-red-600 to-amber-600 rounded-3xl shadow-xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    {/* Calendar icon can be added here */}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Feast Day - May 22</h3>
                    <p className="text-red-100 leading-relaxed mb-4">
                      Every year on May 22nd, Catholics worldwide celebrate Saint Rita's feast day with special devotions, 
                      blessing of roses, and prayers for impossible causes.
                    </p>
                    <p className="text-amber-200 font-medium italic">
                      "Rita of Cascia, pray for us!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basilica Shrine Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">The Sacred Shrine of Cascia</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-amber-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Where pilgrims gather from around the world to venerate our beloved saint
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-br from-amber-400 to-red-500 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5]">
                  <OptimizedImage
                    src="/saint-artwork/rita-shrine-artwork.jpg"
                    alt="Interior of Saint Rita's shrine showing the altar and ceiling paintings"
                    className="h-full w-full"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-br from-red-400 to-amber-500 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5]">
                  <OptimizedImage
                    src="/saint-artwork/rita-shrine-statue.jpg"
                    alt="Statue of Saint Rita holding a cross with an angel blessing her with roses"
                    className="h-full w-full"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
