import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen, Search } from '../components/Icons';
import { strapiApi } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';
import Pagination from '../components/Pagination';
import type { BlogPost } from '../types';
import axios from 'axios';

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 3,
    pageCount: 1,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await strapiApi.getBlogPosts(pagination.page, pagination.pageSize, debouncedSearchTerm);
        setBlogPosts(response.data);
        setPagination(response.meta.pagination);
        setError(null);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const noResponse = !err.response;
          if (status === 502 || noResponse) {
            setError('Service under maintenence. Come back later');
          }
        }
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [pagination.page, pagination.pageSize, debouncedSearchTerm]);

  // Reset to first page when search term changes
  useEffect(() => {
    setPagination(prev => {
      if (prev.page !== 1) {
        return { ...prev, page: 1 };
      }
      return prev;
    });
  }, [debouncedSearchTerm]);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const displayPosts = blogPosts;

  if (loading) {
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

        {/* Search and Skeletons */}
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
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
          </div>
        </section>
      </div>
    );
  }

  if (error) {
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service under maintenence. Come back later</h3>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
          {displayPosts.length > 0 ? (
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
                        src={getImageUrl(post.featuredImage, 'medium')}
                        alt={post.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage.alternativeText || post.title : post.title}
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

          {/* Pagination */}
          {pagination.pageCount > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;