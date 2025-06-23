import React from 'react';
import { Heart, Cross } from '../Icons';
import OptimizedImage from '../OptimizedImage';

interface LifeStoryProps {
  isVisible: boolean;
}

const LifeStorySection: React.FC<LifeStoryProps> = ({ isVisible }) => {
  return (
    <section id="saint-rita-story" className="py-20 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 rounded-full -translate-x-32 -translate-y-32 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full translate-x-48 translate-y-48 opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The Life of Saint Rita
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-amber-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born Margherita Lotti in 1381 into a noble and pious family at Roccaporena, Italy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-red-200 to-amber-200 rounded-lg transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Early Life & Marriage</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Born into a noble and pious family, Rita deeply desired to join a religious order from youth. 
                  However, she was dissuaded by her parents and entered into an arranged marriage at age 12 - 
                  not unusual for that time. Her wealthy husband was very abusive, with many enemies, and Rita 
                  had her first child when she was still only 12 years old. She endured his insults, physical 
                  abuse, and infidelities with patience and prayer, slowly helping him change over time.
                </p>
              </div>
            </div>
          </div>

          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-amber-200 to-yellow-200 rounded-lg transform -rotate-3"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cross className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Tragedy & Faith</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Despite a historical family feud, Rita's husband believed peace had been finally agreed. 
                  However, he was tricked and stabbed to death by his enemies. Rita feared her two sons, 
                  now in their mid-teens, would seek revenge. Though they had no such intention, fate 
                  dealt them an unfortunate hand - about a year later, both sons died from dysentery. 
                  After great persistence and public reconciliation with her husband's murderers, 
                  Rita was finally allowed to enter the Augustinian Order at age 36.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="relative bg-gradient-to-br from-amber-50 to-red-50 rounded-3xl p-8 lg:p-12 shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-red-500/10 rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 bg-amber-500/10 rounded-full"></div>
                
                <div className="relative">
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-4 h-10 bg-white rounded-full"></div>
                      <div className="w-10 h-4 bg-white rounded-full absolute"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
                    The Sacred Stigmata
                  </h3>
                  
                  {/* Image container - designed for portrait orientation */}
                  <div className="flex justify-center mb-12">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-br from-red-400 to-amber-400 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur"></div>
                      <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                        <div className="w-80 lg:w-96 h-auto">
                          <OptimizedImage
                            src="/saint-artwork/rita-potrait.jpg"
                            alt="Beautiful statue portrait of Saint Rita"
                            className="w-full h-auto"
                            objectFit="contain"
                            priority={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content below image */}
                  <div className="max-w-4xl mx-auto">
                    <p className="text-xl text-gray-700 leading-relaxed mb-6">
                      In the convent, Rita lived a life of penance and prayer. When she was about 60 years old, 
                      while praying in front of a crucifix during Good Friday meditation, she received partial 
                      stigmata - a miraculous wound appeared on her forehead as if from a thorn of Christ's crown.
                    </p>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                      This wound remained with her for the rest of her life until her death in 1457. She became 
                      known for her intercession for impossible cases and countless miracles.
                    </p>
                    
                    <div className="flex justify-center space-x-6 mb-8">
                      <div className="text-center">
                        <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                        <p className="text-sm text-gray-600">Faith</p>
                      </div>
                      <div className="text-center">
                        <div className="w-6 h-6 bg-amber-500 rounded-full mx-auto mb-2 animate-pulse delay-75"></div>
                        <p className="text-sm text-gray-600">Suffering</p>
                      </div>
                      <div className="text-center">
                        <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-2 animate-pulse delay-150"></div>
                        <p className="text-sm text-gray-600">Miracles</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-600 to-amber-600 rounded-xl p-6 text-white">
                      <p className="text-lg italic text-center">
                        "Through her sacred wounds, Saint Rita shares in the passion of Christ, 
                        making her intercession especially powerful for those who suffer."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeStorySection;
