import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Heart, 
  BookOpen, 
  Users, 
  Phone, 
  Bell
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: Calendar,
      title: 'Mass Timings',
      description: 'View our weekly mass schedule',
      link: '/mass-timings',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Bell,
      title: 'Notice Board',
      description: 'Latest announcements & photos',
      link: '/notice-board',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Heart,
      title: 'Donate',
      description: 'Support our parish community',
      link: '/donate',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: BookOpen,
      title: 'Faith Formation (Coming Soon)',
      description: 'Religious education resources',
      link: '/faith-formation',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Users,
      title: 'Join Ministry',
      description: 'Get involved in parish life',
      link: '/ministries',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      icon: Phone,
      title: 'Contact Us',
      description: 'Get in touch with parish office',
      link: '/contact',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to connect with our parish community and grow in your faith.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="group bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 leading-tight">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;