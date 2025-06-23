import React from 'react';
import { Cross, Heart } from '../Icons';

const IntercessionSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-900 via-amber-900 to-red-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Floating prayer intentions */}
        <div className="absolute top-16 left-16 animate-float">
          <div className="w-12 h-12 bg-yellow-300/30 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-32 right-20 animate-float delay-1000">
          <div className="w-8 h-8 bg-red-300/30 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-24 left-24 animate-float delay-2000">
          <div className="w-10 h-10 bg-amber-300/30 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Pray with Saint Rita</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-red-300 mx-auto mb-8"></div>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Join countless faithful who have found hope through Saint Rita's powerful intercession
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-yellow-300">Prayer to Saint Rita</h3>
            <blockquote className="text-lg italic text-center leading-relaxed text-red-100 mb-6">
              "O Holy Patroness of those in need, Saint Rita, whose pleadings before thy Divine Lord 
              are almost irresistible, who for thy lavishness in granting favors hast been called 
              the Advocate of the hopeless and even of the Impossible; Saint Rita, so humble, 
              so pure, so mortified, so patient and of such compassionate love for thy Crucified Jesus 
              that thou didst obtain from Him the rare privilege of being wounded by a thorn from His 
              sacred crown, we come to thee for help in our troubles and needs."
            </blockquote>
            <p className="text-center text-amber-200 font-medium">Amen.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-300" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-yellow-300">Abused Wives</h4>
              <p className="text-red-100 text-sm">
                Saint Rita, having endured an abusive marriage herself, is the special patron of heartbroken and abused wives
              </p>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cross className="h-8 w-8 text-amber-300" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-yellow-300">Lost Causes</h4>
              <p className="text-red-100 text-sm">
                Along with Saint Jude, Saint Rita is invoked for impossible situations and hopeless cases
              </p>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-yellow-300 rounded-full transform rotate-45"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-yellow-300">Family Healing</h4>
              <p className="text-red-100 text-sm">
                Broken families and wounded relationships are restored through her powerful prayers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntercessionSection;
