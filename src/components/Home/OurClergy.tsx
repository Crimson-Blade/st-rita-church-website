import React, { useState, useEffect } from 'react';
import { Mail, Cross, Heart } from '../Icons';
import { strapiApi } from '../../services/api';
import type { Priest } from '../../types';

const OurClergy: React.FC = () => {
  const [clergy, setClergy] = useState<Priest[]>([]);
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

    fetchClergy();
  }, []);

  // Mock data if no clergy from API
  const mockClergy: Priest[] = [
    {
      id: 1,
      name: 'Fr. Domnic Savio',
      title: 'Priest',
      bio: 'Served as our parish priest since XXXX, bringing XX years of pastoral experience and a heart for community outreach.',
      photo: '/Fr_Domnic_Savio_Face.jpg',
      email: ''
    },
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
          <div className={`${displayClergy.length === 1 ? 'flex justify-center' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-12`}>
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
            <div className="flex justify-center">
              <a
                href="/contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClergy;
