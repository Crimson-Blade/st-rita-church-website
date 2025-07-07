import React, { useState, useEffect } from 'react';
import { strapiApi } from '../../services/api';
import type { ParishInfo } from '../../types';

const ParishHistorySection: React.FC = () => {
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);

  useEffect(() => {
    const fetchParishInfo = async () => {
      const info = await strapiApi.getParishInfo();
      setParishInfo(info);
    };
    fetchParishInfo();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {parishInfo?.parishName || 'St. Rita\'s Parish'} History
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Following in the footsteps of our patron saint, our parish has been a sanctuary of hope and faith for over 75 years
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-red-500 via-amber-500 to-red-500"></div>

            {/* Timeline events */}
            <div className="space-y-16">
              {/* 1949 - Parish Foundation */}
              <div className="relative flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                  <div className="bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-3xl font-bold mb-4">1949</h3>
                    <h4 className="text-xl font-semibold mb-4">Parish Foundation</h4>
                    <p className="text-amber-100 leading-relaxed">
                      Saint Rita's Parish was established by Bishop Thomas K. Gorman to serve the growing Catholic community in our area.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="lg:w-1/2 lg:pl-12">
                  <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-red-100 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-600 text-center font-medium">Parish Foundation Image</p>
                  </div>
                </div>
              </div>

              {/* 1962 - Church Building */}
              <div className="relative flex flex-col lg:flex-row-reverse items-center">
                <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0">
                  <div className="bg-gradient-to-br from-blue-500 to-amber-500 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-3xl font-bold mb-4">1962</h3>
                    <h4 className="text-xl font-semibold mb-4">Sacred Heart Church Built</h4>
                    <p className="text-blue-100 leading-relaxed">
                      Our beautiful church was constructed, featuring stunning stained glass windows depicting the life of Saint Rita.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="lg:w-1/2 lg:pr-12">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-amber-100 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-600 text-center font-medium">Church Building Image</p>
                  </div>
                </div>
              </div>

              {/* 1985 - Parish Hall */}
              <div className="relative flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                  <div className="bg-gradient-to-br from-green-500 to-amber-500 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-3xl font-bold mb-4">1985</h3>
                    <h4 className="text-xl font-semibold mb-4">Parish Hall Addition</h4>
                    <p className="text-green-100 leading-relaxed">
                      The parish hall was added to accommodate our growing community and provide space for fellowship and events.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="lg:w-1/2 lg:pl-12">
                  <div className="w-full h-64 bg-gradient-to-br from-green-100 to-amber-100 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-600 text-center font-medium">Parish Hall Image</p>
                  </div>
                </div>
              </div>

              {/* Today */}
              <div className="relative flex flex-col lg:flex-row-reverse items-center">
                <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0">
                  <div className="bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-3xl font-bold mb-4">Today</h3>
                    <h4 className="text-xl font-semibold mb-4">Continuing the Mission</h4>
                    <p className="text-red-100 leading-relaxed">
                      Saint Rita's Parish continues to be a beacon of hope, serving over 1,200 families and growing stronger each day in faith and community.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-red-500 to-amber-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                <div className="lg:w-1/2 lg:pr-12">
                  <div className="w-full h-64 bg-gradient-to-br from-red-100 to-amber-100 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-600 text-center font-medium">Current Parish Image</p>
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

export default ParishHistorySection;
