import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen } from '../Icons';
import { strapiApi } from '../../services/api';
import type { BlogPost } from '../../types';

const FeaturedBlogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await strapiApi.getBlogPosts();
        setBlogPosts(data.slice(0, 3)); // Show only first 3 for homepage
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Mock data if no blog posts from API
  const mockBlogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Preparing Our Hearts for Lent',
      content: 'As we approach the season of Lent, it is important to prepare our hearts and minds for this sacred time of reflection, prayer, and penance...',
      excerpt: 'Discover meaningful ways to observe Lent and grow closer to God through prayer, fasting, and almsgiving.',
      publishedAt: '2024-02-28',
      author: 'Fr. David Martinez',
      slug: 'preparing-hearts-for-lent',
      featuredImage: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'The Power of Community Prayer',
      content: 'When we gather together in prayer, something beautiful happens. The collective voices of our parish family create a powerful bond...',
      excerpt: 'Explore how praying together as a community strengthens our faith and deepens our relationship with God.',
      publishedAt: '2024-02-20',
      author: 'Fr. James Wilson',
      slug: 'power-of-community-prayer',
      featuredImage: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Living the Beatitudes Today',
      content: 'The Beatitudes offer us a roadmap for Christian living in the modern world. Each blessing shows us how to find true happiness...',
      excerpt: 'Learn how to apply Jesus\' teachings from the Beatitudes to our daily lives and find true spiritual fulfillment.',
      publishedAt: '2024-02-15',
      author: 'Deacon Robert Chen',
      slug: 'living-beatitudes-today',
      featuredImage: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const displayBlogPosts = blogPosts.length > 0 ? blogPosts : mockBlogPosts;

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Reflections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative py-16 bg-white"
      style={{
        backgroundImage: 'url("/inside.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/85"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Recent Reflections</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Spiritual insights, reflections, and teachings from our parish clergy to nourish your faith journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayBlogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl"
            >
              {/* Featured Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-blue-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            View All Posts
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;