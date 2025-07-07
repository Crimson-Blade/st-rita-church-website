import React, { useState, useEffect } from 'react';
import { Cross } from '../Icons';
import { strapiApi } from '../../services/api';
import type { ParishInfo } from '../../types';

const VisitParishSection: React.FC = () => {
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);

  useEffect(() => {
    const fetchParishInfo = async () => {
      const info = await strapiApi.getParishInfo();
      setParishInfo(info);
    };
    fetchParishInfo();
  }, []);

  return (
    <section 
      className="py-20 relative text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(139, 69, 19, 0.8), rgba(101, 67, 33, 0.9)), url("/inside.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Experience Saint Rita's Presence</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-red-300 mx-auto mb-8"></div>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Come and feel the peace that has blessed our sanctuary for over 25 years
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-6 text-yellow-300">Sacred Spaces</h3>
              <ul className="space-y-4 text-amber-100">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full mr-4 mt-1 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">Saint Rita Chapel:</strong> A quiet space for personal prayer and devotion to our patron saint
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-amber-500 rounded-full mr-4 mt-1 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">Rose Garden:</strong> Beautiful garden inspired by Saint Rita's miraculous winter rose
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full mr-4 mt-1 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">Stained Glass Windows:</strong> Depicting the life and miracles of Saint Rita
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-600 rounded-full mr-4 mt-1 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">Adoration Chapel:</strong> Perpetual adoration before the Blessed Sacrament
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-red-600 to-amber-600 rounded-3xl p-8 mb-8">
              <h3 className="text-3xl font-bold mb-6">Join Our Parish Family</h3>
              <p className="text-red-100 mb-6 leading-relaxed">
                Whether you're facing an impossible situation, seeking spiritual growth, or looking for a 
                welcoming community, Saint Rita's Parish welcomes you with open arms.
              </p>
              <div className="space-y-4">
                <p className="text-amber-200"><strong>Weekend Masses:</strong> {parishInfo?.saturdayMass && parishInfo?.sundayMass ? `Saturday ${parishInfo.saturdayMass}, Sunday ${parishInfo.sundayMass}` : 'Saturday 6:00 PM, Sunday 6:30 AM, 8:15 AM, 9:30 AM (English)'}</p>
                <p className="text-amber-200"><strong>Daily Mass:</strong> {parishInfo?.weekdayMass || '6:45 AM'}</p>
                <p className="text-amber-200"><strong>Confession:</strong> {parishInfo?.confessionTimings || 'Daily 6:30 AM (Except Sundays)'}</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xl text-yellow-300 mb-4 italic">
                "Come to me, all you who are weary and burdened, and I will give you rest." - Matthew 11:28
              </p>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-red-400 rounded-full flex items-center justify-center animate-pulse">
                  <Cross className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitParishSection;
