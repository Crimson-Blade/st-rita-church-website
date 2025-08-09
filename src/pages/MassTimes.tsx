import React, { useState, useEffect } from 'react';
import { 
  Cross, 
  Clock, 
  MapPin, 
  Heart,
  Info,
  Phone,
  Mail
} from '../components/Icons';
import { strapiApi } from '../services/api';
import type { MassTime, AdorationTime, ConfessionTime, ParishInfo } from '../types';
import SEO from '../components/SEO';

const MassTimes: React.FC = () => {
  const [massTimes, setMassTimes] = useState<MassTime[]>([]);
  const [adorationTimes, setAdorationTimes] = useState<AdorationTime[]>([]);
  const [confessionTimes, setConfessionTimes] = useState<ConfessionTime[]>([]);
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [masses, adorations, confessions, parish] = await Promise.all([
          strapiApi.getMassTimes(),
          strapiApi.getAdorationTimes(),
          strapiApi.getConfessionTimes(),
          strapiApi.getParishInfo()
        ]);
        
        setMassTimes(masses);
        setAdorationTimes(adorations);
        setConfessionTimes(confessions);
        setParishInfo(parish);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Mock data for demonstration (matching the reference image style)
  const mockMassTimes: MassTime[] = [
    // Saturday
    { id: 1, day: 'SATURDAY', time: '6:00 PM', type: 'Sunday', location: 'Church', celebrant: '' },
    
    // Sunday
    { id: 2, day: 'SUNDAY', time: '6:30 AM', type: 'Sunday', location: 'Church', celebrant: '' },
    { id: 3, day: 'SUNDAY', time: '8:15 AM', type: 'Sunday', location: 'Church', celebrant: '' },
    { id: 4, day: 'SUNDAY', time: '9:30 AM', type: 'Sunday', location: 'Church (English)', celebrant: '' },

    // Daily Masses
    { id: 5, day: 'MONDAY', time: '6:45 AM', type: 'Daily', location: 'Church', celebrant: '' },
    { id: 6, day: 'TUESDAY', time: '6:45 AM', type: 'Daily', location: 'Church', celebrant: '' },
    { id: 7, day: 'WEDNESDAY', time: '6:45 AM', type: 'Daily', location: 'Church', celebrant: '' },
    { id: 8, day: 'THURSDAY', time: '6:45 AM', type: 'Daily', location: 'Church', celebrant: '' },
    { id: 9, day: 'FRIDAY', time: '6:45 AM', type: 'Daily', location: 'Church', celebrant: '' },
  ];

  const mockAdorationTimes: AdorationTime[] = [];

  const mockConfessionTimes: ConfessionTime[] = [
    { id: 1, day: 'MON-SAT', startTime: '6:30 AM', endTime: '6:45 AM', location: 'Church' },
    { id: 2, day: '', startTime: '', endTime: '', location: 'Confession is also available by appointment.', notes: '+91 98239 82767', availableByAppointment: true },
  ];

  const displayMassTimes = massTimes.length > 0 ? massTimes : mockMassTimes;
  const displayAdorationTimes = adorationTimes.length > 0 ? adorationTimes : mockAdorationTimes;
  const displayConfessionTimes = confessionTimes.length > 0 ? confessionTimes : mockConfessionTimes;

  // Group mass timings by day for better organization
  const groupedMassTimes = displayMassTimes.reduce((acc, mass) => {
    if (!acc[mass.day]) {
      acc[mass.day] = [];
    }
    acc[mass.day].push(mass);
    return acc;
  }, {} as Record<string, MassTime[]>);

  const weekendMasses = [...(groupedMassTimes['SATURDAY'] || []), ...(groupedMassTimes['SUNDAY'] || [])];
  const dailyMasses = Object.entries(groupedMassTimes).filter(([day]) => 
    !['SATURDAY', 'SUNDAY'].includes(day)
  );

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the Sunday Mass timings at St. Rita\'s Church, Maina (Curtorim)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sunday Masses are at 6:30 AM, 8:15 AM, and 9:30 AM (English). Saturday evening anticipated Mass is at 6:00 PM.'
        }
      },
      {
        '@type': 'Question',
        name: 'What time is daily Mass at St. Rita\'s Church, Maina?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Daily Mass (Monday to Friday) is at 6:45 AM.'
        }
      },
      {
        '@type': 'Question',
        name: 'When are confessions heard at St. Rita\'s Church, Maina?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Confessions are available daily at 6:30 AM (except Sundays) and by appointment.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where is St. Rita\'s Church located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Address: St Rita\'s Church Maina, Curtorim, Goa 403709.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <SEO
        title="Mass Timings – St. Rita Parish, Maina (Curtorim)"
        description="Find Sunday and daily Mass times, confession schedules, and adoration at St. Rita's Church, Maina, Curtorim, South Goa."
        canonical="https://saintritamaina.org/mass-timings"
        keywords={['mass times curtorim', 'st rita mass timings', 'curtorim church mass', 'confession timings curtorim', 'maina parish mass']}
        jsonLd={faqJsonLd}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Cross className="h-12 w-12 text-yellow-300 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">Mass Timings</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join us for the celebration of the Eucharist. All are welcome to worship with our parish family.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-96 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Mass Times Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <Cross className="h-8 w-8 text-blue-200 mr-3" />
                    <h2 className="text-2xl font-bold">MASS TIMINGS</h2>
                  </div>
                </div>

                <div className="p-6">
                  {/* Sunday Mass Schedule */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2">
                      Sunday Mass Schedule
                    </h3>
                    <div className="space-y-3">
                      {weekendMasses.length > 0 ? (
                        <div className="space-y-3">
                          {/* Saturday Masses */}
                          {groupedMassTimes['SATURDAY'] && (
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-blue-700 text-sm">SATURDAY:</span>
                              <div className="text-right text-sm space-y-1">
                                {groupedMassTimes['SATURDAY'].map((mass) => (
                                  <div key={mass.id} className="text-gray-900 font-medium">
                                    {mass.time} {mass.location}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Sunday Masses */}
                          {groupedMassTimes['SUNDAY'] && (
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-blue-700 text-sm">SUNDAY:</span>
                              <div className="text-right text-sm space-y-1">
                                {groupedMassTimes['SUNDAY'].map((mass) => (
                                  <div key={mass.id} className="text-gray-900">
                                    {mass.time} {mass.location}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-4">
                          No weekend masses scheduled
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Daily Mass Schedule */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2">
                      Daily Mass Schedule
                    </h3>
                    <div className="space-y-3">
                      {dailyMasses.map(([day, masses]) => (
                        <div key={day} className="flex justify-between items-start">
                          <span className="font-medium text-blue-700 text-sm">{day}:</span>
                          <div className="text-right text-sm space-y-1">
                            {masses.map((mass) => (
                              <div key={mass.id} className="text-gray-900">
                                {mass.time} {mass.location}
                                {mass.celebrant && (
                                  <div className="text-gray-600 text-xs">{mass.celebrant}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Adoration Times Card */}
              {displayAdorationTimes.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                    <div className="flex items-center mb-2">
                      <Heart className="h-8 w-8 text-orange-200 mr-3" />
                      <h2 className="text-2xl font-bold">ADORATION TIMES</h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {displayAdorationTimes.map((adoration) => (
                        <div key={adoration.id}>
                          {adoration.day && (
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-orange-700 text-sm">{adoration.day}:</span>
                              <div className="text-right text-sm">
                                {adoration.startTime && adoration.endTime && (
                                  <div className="text-gray-900 font-medium">
                                    {adoration.startTime} to {adoration.endTime}
                                  </div>
                                )}
                                {adoration.location && (
                                  <div className="text-gray-600 text-xs mt-1">
                                    {adoration.location}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          {adoration.location && !adoration.day && (
                            <div className="text-sm text-gray-700 italic bg-orange-50 p-3 rounded-lg">
                              {adoration.location}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Confession Times Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <Cross className="h-8 w-8 text-purple-200 mr-3" />
                    <h2 className="text-2xl font-bold">CONFESSION TIMES</h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {displayConfessionTimes.map((confession) => (
                      <div key={confession.id}>
                        {confession.day && confession.startTime && (
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-purple-700 text-sm">{confession.day}:</span>
                            <div className="text-right text-sm">
                              <div className="text-gray-900 font-medium">
                                {confession.startTime} to {confession.endTime}
                              </div>
                              {confession.location && (
                                <div className="text-gray-600 text-xs">{confession.location}</div>
                              )}
                            </div>
                          </div>
                        )}
                        {confession.availableByAppointment && (
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="text-sm text-purple-800 font-medium mb-1">
                              {confession.location}
                            </div>
                            {confession.notes && (
                              <div className="text-xs text-purple-600">
                                Call {confession.notes}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Important Information
              </h2>
              <p className="text-gray-600">
                Please note these important details about our liturgical schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Special Occasions</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Holy Day schedules may vary</li>
                  <li>• Christmas and Easter have special times</li>
                  <li>• Check bulletin for holiday changes</li>
                  <li>• First Friday devotions after evening Mass</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Location</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Church:</strong> St. Rita Church, Maina</li>
                  <li>• All Masses and Confessions held at the main church</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Arrival Time</h3>
                </div>
                <p className="text-gray-600">
                  Please arrive 10-15 minutes before Mass begins to allow time for 
                  prayer and preparation. Late arrivals should wait for an appropriate 
                  moment to be seated.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Contact</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{parishInfo?.officePhone || '08326638644'}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{parishInfo?.officeEmail || 'st.rita.maina1960@gmail.com'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us for Worship
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Whether you're a longtime parishioner or visiting for the first time, 
            we welcome you to celebrate the Eucharist with our faith community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact Parish Office
            </a>
            <a
              href="/about"
              className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MassTimes;