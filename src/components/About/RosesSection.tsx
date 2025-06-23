import React from 'react';
import OptimizedImage from '../OptimizedImage';

const RosesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-600/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-pink-500/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 left-16 w-40 h-40 bg-red-700/20 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-32 w-28 h-28 bg-pink-600/25 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">The Miracle of the Roses</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-red-300 mx-auto mb-8"></div>
          <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Saint Rita's roses have become a symbol of hope for the impossible, blooming even in winter's despair
          </p>
        </div>

        {/* Alternating Roses Layout */}
        <div className="max-w-6xl mx-auto space-y-20">
          {/* First Rose Image - Left aligned with content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-pink-400 to-red-500 rounded-3xl opacity-20 group-hover:opacity-40 transition-all duration-300 blur"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                <OptimizedImage
                  src="/saint-artwork/rita-rose.jpg"
                  alt="Saint Rita holding a rose and looking towards heaven"
                  className="w-full h-full"
                  objectFit="cover"
                />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="flex items-center mb-6">
                {/* Icon can be added here */}
              </div>
              <p className="text-red-100 text-lg leading-relaxed">
                Saint Rita holds a rose while looking toward heaven, symbolizing her unwavering faith 
                and trust in God's providence. Even in her darkest moments, she found beauty and hope, 
                teaching us that miracles can bloom in the most unlikely circumstances.
              </p>
            </div>
          </div>

          {/* Second Rose Image - Right aligned with content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="flex items-center mb-6">
                {/* Icon can be added here */}
              </div>
              <p className="text-red-100 text-lg leading-relaxed">
                Surrounded by roses in peaceful contemplation, Saint Rita shows us the serenity that 
                comes from complete surrender to God's will. Her closed eyes reflect deep prayer and 
                meditation, reminding us that true peace is found in communion with the Divine.
              </p>
            </div>
            
            <div className="order-1 lg:order-2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-40 transition-all duration-300 blur"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                <OptimizedImage
                  src="/saint-artwork/rita-rose-2.jpg"
                  alt="Saint Rita surrounded by roses in peaceful prayer"
                  className="w-full h-full"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:shadow-red-500/50">
              <div className="relative">
                {/* Rose icon can be added here */}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Winter Rose</h3>
            <p className="text-red-100 leading-relaxed">
              On her deathbed, Rita asked for a rose from her family garden. Though it was January, 
              her cousin found a blooming rose, defying the winter season - a sign of God's favor.
            </p>
          </div>

          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:shadow-red-500/50">
              <div className="relative">
                {/* Fragrance icon can be added here */}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Divine Fragrance</h3>
            <p className="text-red-100 leading-relaxed">
              The rose carried an extraordinary fragrance that filled the entire convent. 
              This divine scent was a heavenly sign of Rita's sanctity and God's approval of her life.
            </p>
          </div>

          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:shadow-red-500/50">
              <div className="relative">
                {/* Eternal symbol icon can be added here */}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Eternal Symbol</h3>
            <p className="text-red-100 leading-relaxed">
              Today, roses blessed on Saint Rita's feast day (May 22) are distributed worldwide, 
              continuing the tradition of seeking her intercession for impossible causes.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <blockquote className="text-2xl italic text-red-100 mb-4">
              "The rose that bloomed in winter became the symbol of hope for all who face impossible situations."
            </blockquote>
            <p className="text-red-200">— Saint Rita of Cascia</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RosesSection;
