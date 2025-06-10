import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, BookOpen, ImageIcon } from '../components/Icons';
import { strapiApi } from '../services/api';
import type { BlogPost } from '../types';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      try {
        const data = await strapiApi.getBlogPost(slug);
        setBlogPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Mock data if no blog post from API
  const mockBlogPost: BlogPost = {
    id: 1,
    title: 'Preparing Our Hearts for Lent',
    content: `
      <p>As we approach the season of Lent, it is important to prepare our hearts and minds for this sacred time of reflection, prayer, and penance. Lent is not merely a period of giving up certain luxuries or habits; it is a profound spiritual journey that calls us to conversion and renewal.</p>

      <h3>The Three Pillars of Lent</h3>
      <p>The Church teaches us that Lent is built upon three fundamental practices:</p>
      
      <h4>1. Prayer</h4>
      <p>During Lent, we are called to deepen our prayer life. This might mean setting aside additional time for personal prayer, attending daily Mass more frequently, or participating in special Lenten devotions like the Stations of the Cross. Prayer opens our hearts to God's grace and helps us discern His will for our lives.</p>

      <h4>2. Fasting</h4>
      <p>Fasting is not just about abstaining from food; it's about creating space in our lives for God. When we fast, we acknowledge our dependence on God rather than on material things. This practice helps us develop self-discipline and reminds us of those who go without by necessity rather than choice.</p>

      <h4>3. Almsgiving</h4>
      <p>Giving to those in need is an essential part of Lenten observance. Through acts of charity and service, we live out Christ's commandment to love our neighbor as ourselves. Almsgiving transforms our hearts and helps us see Christ in the faces of those we serve.</p>

      <h3>Making Lent Meaningful</h3>
      <p>To make this Lent truly transformative, consider these practical suggestions:</p>
      
      <ul>
        <li>Choose one specific area of your spiritual life to focus on throughout the season</li>
        <li>Participate in parish Lenten programs and retreats</li>
        <li>Read spiritual books or Scripture passages that challenge and inspire you</li>
        <li>Volunteer for parish ministries or community service projects</li>
        <li>Practice acts of kindness and forgiveness in your daily relationships</li>
      </ul>

      <h3>The Journey to Easter</h3>
      <p>Remember that Lent is not an end in itself, but a preparation for the great celebration of Easter. Every sacrifice we make, every prayer we offer, and every act of charity we perform during these forty days prepares us to celebrate more fully the resurrection of our Lord.</p>

      <p>As we begin this Lenten journey together as a parish family, let us support one another in prayer and encourage each other in our efforts to grow closer to Christ. May this season be a time of true conversion and spiritual renewal for all of us.</p>

      <p><em>May God bless you abundantly during this holy season.</em></p>
    `,
    excerpt: 'Discover meaningful ways to observe Lent and grow closer to God through prayer, fasting, and almsgiving.',
    publishedAt: '2024-02-28',
    author: 'Fr. David Martinez',
    slug: 'preparing-hearts-for-lent',
    featuredImage: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=1200',
    gallery: [
      'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/208315/pexels-photo-208315.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  };

  const displayPost = blogPost || mockBlogPost;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-64 bg-gray-300 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!displayPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: 'url("/inside.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/90"></div>
      
      {/* Navigation */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {displayPost.title}
            </h1>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span className="mr-6 font-medium">{displayPost.author}</span>
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(displayPost.publishedAt)}</span>
              </div>
              
              <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
          </header>

          {/* Featured Image */}
          {displayPost.featuredImage && (
            <div className="mb-8">
              <img
                src={displayPost.featuredImage}
                alt={displayPost.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: displayPost.content }}
            />
          </div>

          {/* Image Gallery */}
          {displayPost.gallery && displayPost.gallery.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <ImageIcon className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">Gallery</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayPost.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity duration-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;