import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen, Search } from 'lucide-react';
import { strapiApi } from '../services/api';
import type { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await strapiApi.getBlogPosts();
        setBlogPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(blogPosts);
    }
  }, [searchTerm, blogPosts]);

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
    },
    {
      id: 4,
      title: 'Finding God in Daily Life',
      content: 'God is present in every moment of our lives, but sometimes we need to slow down and pay attention to recognize His presence...',
      excerpt: 'Practical ways to recognize God\'s presence in your everyday activities and strengthen your spiritual awareness.',
      publishedAt: '2024-02-10',
      author: 'Fr. David Martinez',
      slug: 'finding-god-daily-life',
      featuredImage: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      title: 'The Importance of Forgiveness',
      content: 'Forgiveness is at the heart of the Christian message. Jesus taught us to forgive others as we have been forgiven...',
      excerpt: 'Understanding the transformative power of forgiveness in our relationships and spiritual growth.',
      publishedAt: '2024-02-05',
      author: 'Fr. James Wilson',
      slug: 'importance-of-forgiveness',
      featuredImage: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      title: 'Building a Life of Service',
      content: 'Service to others is a fundamental aspect of Christian discipleship. Through serving, we follow Christ\'s example...',
      excerpt: 'Discover how serving others enriches our faith and creates meaningful connections in our community.',
      publishedAt: '2024-01-30',
      author: 'Deacon Robert Chen',
      slug: 'building-life-of-service',
      featuredImage: 'https://images.pexels.com/photos/8468/candle-light-prayer-church.jpg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const displayPosts = blogPosts.length > 0 ? filteredPosts : mockBlogPosts.filter(post =>
    searchTerm ? (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    ) : true
  );

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
              <BookOpen className="h-12 w-12 text-yellow-300 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">Parish Blog</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Spiritual reflections, teachings, and insights from our parish clergy to guide your faith journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
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
          ) : displayPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post) => (
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
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms.' : 'Check back soon for new content.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;