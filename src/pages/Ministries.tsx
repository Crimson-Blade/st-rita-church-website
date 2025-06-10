import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  BookOpen, 
  Music, 
  Baby, 
  GraduationCap,
  Utensils,
  HandHeart,
  Cross,
  Globe,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
  UserPlus,
  Clock,
  MapPin
} from 'lucide-react';
import { strapiApi } from '../services/api';
import type { Ministry } from '../types';

const Ministries: React.FC = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const data = await strapiApi.getMinistries();
        setMinistries(data);
      } catch (error) {
        console.error('Error fetching ministries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinistries();
  }, []);

  // Comprehensive mock data for Catholic parish ministries
  const mockMinistries: Ministry[] = [
    // Liturgical Ministries
    {
      id: 1,
      name: 'Altar Servers',
      description: 'Young people who assist the priest during Mass and other liturgical celebrations. Training provided for ages 8 and up.',
      leader: 'Deacon Robert Chen',
      meetingTime: 'Training: Saturdays 10:00 AM',
      contactEmail: 'altarservers@stritaparish.org',
      slug: 'altar-servers',
      category: 'liturgical',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Ages 8+, completed First Communion',
      timeCommitment: '1-2 Masses per month',
      benefits: 'Deepen understanding of Mass, serve God directly'
    },
    {
      id: 2,
      name: 'Extraordinary Ministers of Holy Communion',
      description: 'Lay ministers who assist in distributing Holy Communion during Mass and bring communion to the sick and homebound.',
      leader: 'Maria Rodriguez',
      meetingTime: 'Monthly meeting: First Sunday after 10:30 AM Mass',
      contactEmail: 'eucharisticministers@stritaparish.org',
      slug: 'eucharistic-ministers',
      category: 'liturgical',
      image: 'https://images.pexels.com/photos/208315/pexels-photo-208315.jpeg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Confirmed Catholics in good standing',
      timeCommitment: '2-3 Masses per month',
      benefits: 'Serve the Eucharistic Lord, minister to the sick'
    },
    {
      id: 3,
      name: 'Lectors',
      description: 'Proclaim the Word of God during Mass by reading the first and second readings and leading the Prayers of the Faithful.',
      leader: 'James Thompson',
      meetingTime: 'Training sessions quarterly',
      contactEmail: 'lectors@stritaparish.org',
      slug: 'lectors',
      category: 'liturgical',
      image: 'https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Strong public speaking skills, faithful Catholics',
      timeCommitment: '1-2 Masses per month',
      benefits: 'Proclaim Gods Word, enhance liturgical participation'
    },
    {
      id: 4,
      name: 'Music Ministry',
      description: 'Lead the congregation in song during Mass and special celebrations. Multiple choirs for different ages and Mass times.',
      leader: 'Sarah Mitchell',
      meetingTime: 'Rehearsals: Thursdays 7:00 PM',
      contactEmail: 'music@stritaparish.org',
      slug: 'music-ministry',
      category: 'liturgical',
      image: 'https://images.pexels.com/photos/7428096/pexels-photo-7428096.jpeg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Ability to carry a tune, commitment to regular attendance',
      timeCommitment: 'Weekly rehearsal + 1-2 Masses',
      benefits: 'Use musical gifts for worship, build community'
    },
    {
      id: 5,
      name: 'Ushers and Greeters',
      description: 'Welcome parishioners and visitors, assist with seating, take up collections, and help maintain order during Mass.',
      leader: 'Robert Johnson',
      meetingTime: 'Monthly meeting: Second Saturday 9:00 AM',
      contactEmail: 'ushers@stritaparish.org',
      slug: 'ushers-greeters',
      category: 'liturgical',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Friendly demeanor, punctuality',
      timeCommitment: '1 Mass per month',
      benefits: 'Create welcoming environment, serve community'
    },

    // Faith Formation
    {
      id: 6,
      name: 'Religious Education Teachers',
      description: 'Teach children and teens about Catholic faith, preparing them for sacraments and deepening their relationship with Christ.',
      leader: 'Catherine Walsh',
      meetingTime: 'Classes: Sundays 9:15 AM, Teacher meetings monthly',
      contactEmail: 'religiouseducation@stritaparish.org',
      slug: 'religious-education',
      category: 'formation',
      image: 'https://images.pexels.com/photos/8926553/pexels-photo-8926553.jpeg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Love for children, knowledge of Catholic faith',
      timeCommitment: 'Sunday mornings during school year',
      benefits: 'Share faith with next generation, grow in knowledge'
    },
    {
      id: 7,
      name: 'RCIA Team',
      description: 'Guide adults through the process of becoming Catholic or completing their initiation into the Church.',
      leader: 'Fr. James Wilson',
      meetingTime: 'Sessions: Wednesdays 7:00 PM (Sept-May)',
      contactEmail: 'rcia@stritaparish.org',
      slug: 'rcia-team',
      category: 'formation',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Strong Catholic foundation, patience, compassion',
      timeCommitment: 'Weekly sessions during program year',
      benefits: 'Witness faith journeys, deepen own understanding'
    },
    {
      id: 8,
      name: 'Youth Ministry',
      description: 'Engage teenagers in faith-based activities, service projects, and social events to build strong Catholic identity.',
      leader: 'Michael Davis',
      meetingTime: 'Fridays 7:00 PM (High School), Sundays 6:00 PM (Middle School)',
      contactEmail: 'youth@stritaparish.org',
      slug: 'youth-ministry',
      category: 'formation',
      image: 'https://images.pexels.com/photos/8926553/pexels-photo-8926553.jpeg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Heart for young people, energy, flexibility',
      timeCommitment: 'Weekly meetings + monthly events',
      benefits: 'Impact young lives, stay young at heart'
    },
    {
      id: 9,
      name: 'Adult Faith Formation',
      description: 'Facilitate Bible studies, book clubs, and educational programs for adults seeking to deepen their Catholic faith.',
      leader: 'Dr. Patricia Lee',
      meetingTime: 'Various times - multiple groups',
      contactEmail: 'adultfaith@stritaparish.org',
      slug: 'adult-faith-formation',
      category: 'formation',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Desire to learn and share faith',
      timeCommitment: 'Weekly or bi-weekly meetings',
      benefits: 'Grow in faith knowledge, build friendships'
    },

    // Service & Outreach
    {
      id: 10,
      name: 'St. Vincent de Paul Society',
      description: 'Provide direct assistance to those in need in our community through food, clothing, and financial aid.',
      leader: 'Thomas Anderson',
      meetingTime: 'Second and fourth Tuesdays 7:00 PM',
      contactEmail: 'svdp@stritaparish.org',
      slug: 'st-vincent-de-paul',
      category: 'service',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Compassionate heart, confidentiality',
      timeCommitment: 'Bi-weekly meetings + home visits',
      benefits: 'Serve Christ in the poor, make real difference'
    },
    {
      id: 11,
      name: 'Food Pantry Ministry',
      description: 'Collect, organize, and distribute food to families in need. Includes monthly food drives and weekly distribution.',
      leader: 'Linda Martinez',
      meetingTime: 'Distribution: Saturdays 9:00 AM - 12:00 PM',
      contactEmail: 'foodpantry@stritaparish.org',
      slug: 'food-pantry',
      category: 'service',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Physical ability to lift boxes, servant heart',
      timeCommitment: '3-4 hours per week',
      benefits: 'Feed the hungry, work as team'
    },
    {
      id: 12,
      name: 'Prison Ministry',
      description: 'Visit incarcerated individuals, provide spiritual support, and assist with reintegration into society.',
      leader: 'Deacon Robert Chen',
      meetingTime: 'Monthly preparation meeting + weekly visits',
      contactEmail: 'prison@stritaparish.org',
      slug: 'prison-ministry',
      category: 'service',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Background check, special training required',
      timeCommitment: 'Weekly visits + monthly meetings',
      benefits: 'Bring hope to forgotten, live Gospel mercy'
    },
    {
      id: 13,
      name: 'Nursing Home Ministry',
      description: 'Visit elderly residents, lead prayer services, and provide companionship to those in care facilities.',
      leader: 'Margaret O\'Brien',
      meetingTime: 'Visits: Sundays 2:00 PM',
      contactEmail: 'nursinghome@stritaparish.org',
      slug: 'nursing-home-ministry',
      category: 'service',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Patience, compassion, reliability',
      timeCommitment: '2-3 hours per week',
      benefits: 'Honor elderly, share Gods love'
    },

    // Family & Life
    {
      id: 14,
      name: 'Pro-Life Ministry',
      description: 'Advocate for the dignity of human life from conception to natural death through prayer, education, and action.',
      leader: 'Dr. Jennifer Walsh',
      meetingTime: 'First Thursday 7:00 PM',
      contactEmail: 'prolife@stritaparish.org',
      slug: 'pro-life-ministry',
      category: 'family',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Commitment to Church teaching on life',
      timeCommitment: 'Monthly meetings + events',
      benefits: 'Defend vulnerable, promote culture of life'
    },
    {
      id: 15,
      name: 'Marriage Preparation',
      description: 'Help engaged couples prepare for the sacrament of marriage through mentoring and educational programs.',
      leader: 'John and Mary Stevens',
      meetingTime: 'By appointment + monthly team meetings',
      contactEmail: 'marriage@stritaparish.org',
      slug: 'marriage-preparation',
      category: 'family',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Married couples in good standing, training provided',
      timeCommitment: 'Flexible schedule',
      benefits: 'Strengthen marriages, guide new couples'
    },
    {
      id: 16,
      name: 'Mothers\' Group',
      description: 'Support group for mothers of all ages, providing fellowship, prayer, and practical parenting resources.',
      leader: 'Susan Garcia',
      meetingTime: 'Wednesdays 9:30 AM (childcare provided)',
      contactEmail: 'mothers@stritaparish.org',
      slug: 'mothers-group',
      category: 'family',
      image: 'https://images.pexels.com/photos/8926553/pexels-photo-8926553.jpeg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Mothers of children of any age',
      timeCommitment: 'Weekly meetings',
      benefits: 'Build friendships, share parenting journey'
    },
    {
      id: 17,
      name: 'Bereavement Ministry',
      description: 'Provide comfort and support to families who have lost loved ones, including funeral assistance and grief support.',
      leader: 'Patricia Murphy',
      meetingTime: 'Support groups: Thursdays 7:00 PM',
      contactEmail: 'bereavement@stritaparish.org',
      slug: 'bereavement-ministry',
      category: 'family',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Compassion, good listening skills, training provided',
      timeCommitment: 'As needed + monthly meetings',
      benefits: 'Comfort grieving, provide hope'
    },

    // Prayer & Spiritual
    {
      id: 18,
      name: 'Adoration Ministry',
      description: 'Coordinate perpetual adoration of the Blessed Sacrament and recruit adorers for weekly holy hours.',
      leader: 'Rose Martinez',
      meetingTime: 'Adoration available 24/7, coordinators meet monthly',
      contactEmail: 'adoration@stritaparish.org',
      slug: 'adoration-ministry',
      category: 'prayer',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Commitment to regular holy hour',
      timeCommitment: '1 hour per week',
      benefits: 'Deepen prayer life, spend time with Jesus'
    },
    {
      id: 19,
      name: 'Prayer Shawl Ministry',
      description: 'Knit or crochet prayer shawls for those who are ill, grieving, or in need of comfort and prayer.',
      leader: 'Dorothy Chen',
      meetingTime: 'Second Saturday 10:00 AM',
      contactEmail: 'prayershawl@stritaparish.org',
      slug: 'prayer-shawl-ministry',
      category: 'prayer',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Basic knitting or crocheting skills',
      timeCommitment: 'Monthly meetings + home crafting',
      benefits: 'Pray while creating, comfort others'
    },
    {
      id: 20,
      name: 'Rosary Group',
      description: 'Gather weekly to pray the rosary together, including special devotions during May and October.',
      leader: 'Maria Santos',
      meetingTime: 'Wednesdays 6:30 PM before evening Mass',
      contactEmail: 'rosary@stritaparish.org',
      slug: 'rosary-group',
      category: 'prayer',
      image: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      requirements: 'Love for the Blessed Mother',
      timeCommitment: '30 minutes weekly',
      benefits: 'Deepen Marian devotion, community prayer'
    }
  ];

  const displayMinistries = ministries.length > 0 ? ministries : mockMinistries;

  const categories = [
    { id: 'all', name: 'All Ministries', icon: Users },
    { id: 'liturgical', name: 'Liturgical', icon: Cross },
    { id: 'formation', name: 'Faith Formation', icon: BookOpen },
    { id: 'service', name: 'Service & Outreach', icon: HandHeart },
    { id: 'family', name: 'Family & Life', icon: Heart },
    { id: 'prayer', name: 'Prayer & Spiritual', icon: Heart }
  ];

  const filteredMinistries = selectedCategory === 'all' 
    ? displayMinistries 
    : displayMinistries.filter(ministry => ministry.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-yellow-300 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">Parish Ministries</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover your calling and use your gifts to serve God and our parish community. 
              Every ministry is an opportunity to grow in faith and make a difference.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Get Involved Today
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Serve? We're Here to Help!
              </h3>
              <p className="text-gray-700">
                Not sure which ministry is right for you? Contact us and we'll help you find the perfect fit for your gifts and schedule.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMinistries.map((ministry) => (
                <div
                  key={ministry.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                >
                  {/* Ministry Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {ministry.image ? (
                      <img
                        src={ministry.image}
                        alt={ministry.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <Users className="h-12 w-12 text-blue-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 right-4">
                      <Link
                        to="/contact"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                      >
                        Join Now
                      </Link>
                    </div>
                  </div>

                  {/* Ministry Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {ministry.name}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {ministry.description}
                    </p>

                    {/* Ministry Details */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="font-medium">Leader:</span>
                        <span className="ml-1">{ministry.leader}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">When:</span>
                        <span className="ml-1">{ministry.meetingTime}</span>
                      </div>

                      {ministry.timeCommitment && (
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="font-medium">Commitment:</span>
                          <span className="ml-1">{ministry.timeCommitment}</span>
                        </div>
                      )}

                      {ministry.requirements && (
                        <div className="flex items-start text-gray-500">
                          <UserPlus className="h-4 w-4 mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium">Requirements:</span>
                            <span className="ml-1">{ministry.requirements}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Benefits */}
                    {ministry.benefits && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-start">
                          <Heart className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium text-blue-800">Benefits:</span>
                            <p className="text-sm text-blue-700">{ministry.benefits}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2">
                      <Link
                        to="/contact"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center flex items-center justify-center"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join This Ministry
                      </Link>
                      
                      <a
                        href={`mailto:${ministry.contactEmail}`}
                        className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center flex items-center justify-center"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Leader
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join a Ministry */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join a Ministry?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ministry involvement is more than volunteering—it's a way to live out your faith, 
              use your God-given talents, and build meaningful relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Grow in Faith</h3>
              <p className="text-gray-600">
                Deepen your relationship with God through service and discover new aspects of your faith.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Community</h3>
              <p className="text-gray-600">
                Form lasting friendships with fellow parishioners who share your values and commitment.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Use Your Gifts</h3>
              <p className="text-gray-600">
                Put your talents and skills to work in service of God and your parish community.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Make a Difference</h3>
              <p className="text-gray-600">
                See the direct impact of your service on individuals and the broader community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Taking the first step is easy. Here's how you can begin your ministry journey with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pray & Reflect</h3>
                <p className="text-gray-600 mb-4">
                  Ask God to guide you in discerning where He is calling you to serve.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h3>
                <p className="text-gray-600 mb-4">
                  Reach out to learn more about ministries that interest you or get personalized recommendations.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact Parish Office
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Serving</h3>
                <p className="text-gray-600 mb-4">
                  Attend an orientation, meet your ministry team, and begin making a difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Your Parish Needs You!
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Every ministry depends on dedicated volunteers like you. Whether you have 30 minutes a week 
            or several hours, there's a place for you to serve and grow in faith.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Join a Ministry Today
            </Link>
            <a
              href="tel:+918788653451"
              className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Us: +91 8788653451
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ministries;