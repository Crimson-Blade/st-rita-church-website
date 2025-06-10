import React from 'react';
import { Cross, Heart, Users, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About St. Rita's Parish</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              For over 75 years, we have been a beacon of faith, hope, and love in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="bg-blue-50 rounded-lg p-8">
              <blockquote className="text-xl text-gray-700 italic mb-4">
                "To be a welcoming Catholic community that proclaims the Gospel of Jesus Christ, 
                celebrates the sacraments, and serves those in need with love and compassion."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide our community and shape how we live out our Catholic faith together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cross className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Faith</h3>
              <p className="text-gray-600">
                Growing deeper in our relationship with Jesus Christ through prayer, scripture, and sacraments.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Love</h3>
              <p className="text-gray-600">
                Showing Christ's love to all people through compassion, kindness, and service to others.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Building strong relationships and supporting one another as the Body of Christ.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Learning</h3>
              <p className="text-gray-600">
                Continuously growing in our understanding of Catholic teaching and tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parish History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our History</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                St. Rita's Parish was established in 1948 by Father Michael O'Sullivan, who saw the need 
                for a Catholic church to serve the growing community. What began as a small congregation 
                meeting in a converted storefront has grown into a vibrant parish of over 1,200 families.
              </p>
              <p className="text-gray-700 mb-6">
                Our current church building was dedicated in 1962, with its beautiful stained glass windows 
                and sacred art donated by parish families over the years. The parish hall was added in 1985, 
                providing space for religious education, community events, and fellowship.
              </p>
              <p className="text-gray-700">
                Throughout our history, St. Rita's has been committed to serving not only our parish family 
                but the broader community through various outreach programs, food drives, and charitable works. 
                We continue this tradition today as we look toward the future with hope and faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clergy */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Clergy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the priests and deacons who shepherd our parish community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fr. David Martinez</h3>
              <p className="text-blue-600 font-medium mb-3">Pastor</p>
              <p className="text-gray-600 text-sm">
                Fr. Martinez has served as our pastor since 2018, bringing 15 years of pastoral experience 
                and a heart for community outreach.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fr. James Wilson</h3>
              <p className="text-blue-600 font-medium mb-3">Associate Pastor</p>
              <p className="text-gray-600 text-sm">
                Fr. Wilson joined our parish in 2020 and oversees our youth ministry and religious 
                education programs.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Deacon Robert Chen</h3>
              <p className="text-blue-600 font-medium mb-3">Permanent Deacon</p>
              <p className="text-gray-600 text-sm">
                Deacon Chen assists with liturgical celebrations and coordinates our social justice 
                and outreach ministries.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;