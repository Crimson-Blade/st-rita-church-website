import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from '../components/Icons';
import { strapiApi } from '../services/api';
import type { ParishInfo } from '../types';

// Google Maps component
const GoogleMap: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.5767037574565!2d74.00704305000001!3d15.290862899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb1f5541077a5%3A0x7811874231f77c38!2sSt%20Rita&#39;s%20Church%2C%20Maina%2C%20Curtorim%2C%20Shelvan%2C%20Goa%20403709!5e0!3m2!1sen!2sin!4v1749549521898!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="St. Rita's Church Location"
      ></iframe>
    </div>
  );
};

const Contact: React.FC = () => {
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchParishInfo = async () => {
      const info = await strapiApi.getParishInfo();
      setParishInfo(info);
    };
    fetchParishInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await strapiApi.submitContactForm(formData);
      if (success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-blue-900/80 to-blue-700/80 text-white py-16"
        style={{
          backgroundImage: 'url("/inside.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 mr-4">
                <img 
                  src="/rita.png"
                  alt="St. Rita's Parish Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">Contact Us</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We'd love to hear from you. Get in touch with our parish office or visit us in person.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Thank you for your message!
                  </h3>
                  <p className="text-green-700">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="mass">Mass Information</option>
                        <option value="baptism">Baptism</option>
                        <option value="marriage">Marriage</option>
                        <option value="funeral">Funeral Services</option>
                        <option value="ministry">Ministry Information</option>
                        <option value="volunteer">Volunteer Opportunities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please share your message or question..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                    <p className="text-gray-600">
                      {parishInfo?.address || 'St Rita\'s Church, Maina, Curtorim, Shelvan, Goa 403709'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600">
                      Parish Office: {parishInfo?.officePhone || '08326638644'}<br />
                      Emergency: {parishInfo?.parishPriestPhone || parishInfo?.officePhone || '08326638644'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600">
                      General: {parishInfo?.officeEmail || 'st.rita.maina1960@gmail.com'}<br />
                      Pastor: {parishInfo?.parishPriestEmail || 'st.rita.maina1960@gmail.com'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: {parishInfo?.officeWeekdayHours || '9:00 AM - 12:30 PM'}</p>
                      <p>Saturday: {parishInfo?.officeSaturdayHours || '9:00 AM - 12:30 PM'}</p>
                      <p>Sunday: {parishInfo?.officeSundayHours || 'Closed'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;