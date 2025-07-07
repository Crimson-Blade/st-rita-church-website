import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationMeta } from '../types';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange, className = '' }) => {
  const { page: currentPage, pageCount, total } = pagination;

  if (pageCount <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < pageCount - 1) {
      rangeWithDots.push('...', pageCount);
    } else {
      rangeWithDots.push(pageCount);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between ${className}`}>
      {/* Results info */}
      <div className="mb-4 sm:mb-0">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{((currentPage - 1) * pagination.pageSize) + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(currentPage * pagination.pageSize, total)}
          </span>{' '}
          of <span className="font-medium">{total}</span> results
        </p>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`p-2 rounded-lg border ${
            currentPage <= 1
              ? 'text-gray-400 bg-gray-100 border-gray-300 cursor-not-allowed'
              : 'text-gray-600 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-800'
          } transition-colors duration-200`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          const pageNumber = pageNum as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                isCurrentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-600 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= pageCount}
          className={`p-2 rounded-lg border ${
            currentPage >= pageCount
              ? 'text-gray-400 bg-gray-100 border-gray-300 cursor-not-allowed'
              : 'text-gray-600 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-800'
          } transition-colors duration-200`}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
