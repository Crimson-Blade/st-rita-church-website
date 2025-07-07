import React, { useState, useEffect } from 'react';
import { Mail, Phone, Cross, Heart } from '../Icons';
import { strapiApi } from '../../services/api';
import type { Priest, ParishInfo } from '../../types';

const OurClergy: React.FC = () => {
  const [clergy, setClergy] = useState<Priest[]>([]);
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClergy = async () => {
      try {
        const data = await strapiApi.getPriests();
        setClergy(data);
      } catch (error) {
        console.error('Error fetching clergy:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchParishInfo = async () => {
      const info = await strapiApi.getParishInfo();
      setParishInfo(info);
    };

    fetchClergy();
    fetchParishInfo();
  }, []);

  // Mock data if no clergy from API
  const mockClergy: Priest[] = [
    {
      id: 1,
      name: 'Fr. David Martinez',
      title: 'Pastor',
      bio: 'Fr. Martinez has served as our pastor since 2018, bringing 15 years of pastoral experience and a heart for community outreach.',
      photo: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=400',
      email: 'pastor@stritaparish.org'
    },
    {
      id: 2,
      name: 'Fr. James Wilson',
      title: 'Associate Pastor',
      bio: 'Fr. Wilson joined our parish in 2020 and oversees our youth ministry and religious education programs.',
      photo: 'https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'associate@stritaparish.org'
    },
    {
      id: 3,
      name: 'Deacon Robert Chen',
      title: 'Permanent Deacon',
      bio: 'Deacon Chen assists with liturgical celebrations and coordinates our social justice and outreach ministries.',
      photo: 'https://images.pexels.com/photos/208315/pexels-photo-208315.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'deacon@stritaparish.org'
    }
  ];

  const displayClergy = clergy.length > 0 ? clergy : mockClergy;

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Cross className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Clergy</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the priests and deacons who shepherd our parish community.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse text-center">
                <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <div className="h-6 bg-gray-300 rounded mb-2 w-48 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-64 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-56 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {displayClergy.map((member) => (
              <div 
                key={member.id} 
                className="text-center"
              >
                {/* Round Photo */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full border-4 border-gray-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-4 border-gray-200 flex items-center justify-center">
                      <Cross className="h-16 w-16 text-blue-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-yellow-300 mr-3" />
              <h3 className="text-2xl font-bold">Pastoral Care</h3>
            </div>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our clergy are here to support you in your spiritual journey. Whether you need counseling, 
              spiritual direction, or simply want to talk, our doors are always open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${parishInfo?.parishPriestEmail || 'st.rita.maina1960@gmail.com'}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Pastor
              </a>
              <a
                href={`tel:${parishInfo?.officePhone || '08326638644'}`}
                className="border-2 border-white hover:bg-white hover:text-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Parish Office
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClergy;
