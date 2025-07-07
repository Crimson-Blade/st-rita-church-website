import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  Clock,
  Image as ImageIcon,
  // FileText, 
  Filter,
  Grid,
  List,
  Search,
  Download,
  Share2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { strapiApi } from '../services/api';
import { getItemImageUrl } from '../utils/imageUtils';
import Pagination from '../components/Pagination';
import type { NoticeBoardItem } from '../types';

const NoticeBoard: React.FC = () => {
  const [noticeBoardItems, setNoticeBoardItems] = useState<NoticeBoardItem[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    pageCount: 1,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'text' | 'image' | 'poster'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<NoticeBoardItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await strapiApi.getNoticeBoardItems(pagination.page, pagination.pageSize, debouncedSearchTerm);
        setNoticeBoardItems(response.data);
        setPagination(response.meta.pagination);
      } catch (error) {
        console.error('Error fetching notice board data:', error);
        setNoticeBoardItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination.page, pagination.pageSize, debouncedSearchTerm]);

  // Reset to first page when search term or filter changes
  useEffect(() => {
    setPagination(prev => {
      if (prev.page !== 1) {
        return { ...prev, page: 1 };
      }
      return prev;
    });
  }, [debouncedSearchTerm, filterType]);

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

  // Client-side filtering for type only - search is handled server-side
  const filteredItems = noticeBoardItems.filter(item => {
    return filterType === 'all' || item.type === filterType;
  });

  const openModal = (item: NoticeBoardItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const nextImage = () => {
    const imageItems = filteredItems.filter(item => item.type === 'image' || item.type === 'poster');
    setCurrentImageIndex((prev) => (prev + 1) % imageItems.length);
    setSelectedItem(imageItems[(currentImageIndex + 1) % imageItems.length]);
  };

  const prevImage = () => {
    const imageItems = filteredItems.filter(item => item.type === 'image' || item.type === 'poster');
    setCurrentImageIndex((prev) => (prev - 1 + imageItems.length) % imageItems.length);
    setSelectedItem(imageItems[(currentImageIndex - 1 + imageItems.length) % imageItems.length]);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Bell className="h-12 w-12 text-yellow-300 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold">Parish Notice Board</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay connected with our parish community through announcements, event photos, and important notices.
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Items</option>
                  <option value="text">Announcements</option>
                  <option value="image">Photos</option>
                  <option value="poster">Posters</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center bg-white rounded-lg border border-gray-300 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Board Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className={`grid ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-4xl mx-auto'
              } gap-6`}>
              {filteredItems.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className={`group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${viewMode === 'list' ? 'flex' : ''
                    }`}
                >
                  {item.type === 'text' ? (
                    // Announcement Card
                    <div className={`bg-white ${viewMode === 'list' ? 'flex w-full' : 'h-full'}`}>
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-center mb-4">
                          <div className={`p-2 rounded-full mr-3 ${item.urgent ? 'bg-red-100' : 'bg-blue-100'
                            }`}>
                            {item.urgent ? (
                              <AlertTriangle className={`h-5 w-5 ${item.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                            ) : (
                              <Bell className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <span className={`text-xs font-semibold uppercase tracking-wide ${item.urgent ? 'text-red-600' : 'text-blue-600'
                              }`}>
                              {item.urgent ? 'Urgent Notice' : 'Announcement'}
                            </span>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(item.publishedAt)}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {item.content}
                        </p>

                        <button
                          onClick={() => openModal(item)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Read More
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Image/Poster Card
                    <div
                      className={`cursor-pointer ${viewMode === 'list' ? 'flex w-full' : 'h-full'}`}
                      onClick={() => openModal(item)}
                    >
                      <div className={`relative ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-64'
                        } bg-gray-200 overflow-hidden`}>
                        {getItemImageUrl(item, 'medium') ? (
                          <img
                            src={getItemImageUrl(item, 'medium')}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-blue-400" />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Eye className="h-8 w-8 text-white" />
                          </div>
                        </div>

                        {/* Type Badge */}
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'poster'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                            }`}>
                            {item.type === 'poster' ? 'Poster' : 'Photo'}
                          </span>
                        </div>
                      </div>

                      <div className={`p-4 bg-white ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>

                        {item.content && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {item.content}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(item.publishedAt)}
                          </div>

                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Check back soon for new notices and updates.'}
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

      {/* Modal for viewing full content */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full w-full bg-white rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-800 bg-white rounded-full p-2 shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>

            {selectedItem.type === 'text' ? (
              // Text Modal
              <div className="p-8 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-full mr-4 ${selectedItem.urgent ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                    {selectedItem.urgent ? (
                      <AlertTriangle className={`h-6 w-6 ${selectedItem.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                    ) : (
                      <Bell className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <span className={`text-sm font-semibold uppercase tracking-wide ${selectedItem.urgent ? 'text-red-600' : 'text-blue-600'
                      }`}>
                      {selectedItem.urgent ? 'Urgent Notice' : 'Announcement'}
                    </span>
                    <div className="flex items-center text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDate(selectedItem.publishedAt)}
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {selectedItem.title}
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedItem.content}
                  </p>
                </div>
              </div>
            ) : (
              // Image/Poster Modal
              <div className="flex flex-col">
                {/* Navigation Buttons for images */}
                {filteredItems.filter(item => item.type === 'image' || item.type === 'poster').length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity duration-200"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity duration-200"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image */}
                <div className="flex justify-center bg-gray-100">
                  <img
                    src={getItemImageUrl(selectedItem, 'large') || getItemImageUrl(selectedItem, 'original')}
                    alt={selectedItem.title}
                    className="max-w-full max-h-[60vh] object-contain"
                  />
                </div>

                {/* Image Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {selectedItem.title}
                  </h3>

                  {selectedItem.content && (
                    <p className="text-gray-600 mb-4">
                      {selectedItem.content}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(selectedItem.publishedAt)}
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </button>
                      <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;