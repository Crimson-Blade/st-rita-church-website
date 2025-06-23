import React from 'react';

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(139, 69, 19, 0.7), rgba(101, 67, 33, 0.8)), url("/outside.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: `translateY(${scrollY * 0.5}px)`
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/20 to-amber-900/40"></div>
        {/* Floating roses animation */}
        <div className="absolute top-20 left-10 animate-bounce delay-1000">
          <div className="w-8 h-8 bg-red-500 rounded-full opacity-70 transform rotate-45"></div>
        </div>
        <div className="absolute top-40 right-16 animate-bounce delay-2000">
          <div className="w-6 h-6 bg-pink-400 rounded-full opacity-60 transform rotate-12"></div>
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce delay-3000">
          <div className="w-10 h-10 bg-red-600 rounded-full opacity-50 transform -rotate-12"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="animate-fade-in-up">
          {/* Saint Rita's Symbol */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-amber-300 to-amber-600 p-2 shadow-2xl animate-pulse">
                <img 
                  src="/rita.png"
                  alt="St. Rita's Parish Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-ping delay-1000"></div>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
            Saint Rita of Cascia
          </h1>
          <p className="text-2xl lg:text-3xl text-amber-100 mb-4 font-light">
            "Saint of the Impossible" • 1381-1457
          </p>
          <p className="text-xl text-amber-200 max-w-4xl mx-auto leading-relaxed">
            Patron Saint of Abused and Heartbroken Wives • Lost Causes (with St. Jude) • Our Parish Protector
          </p>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-amber-200 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-200 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
