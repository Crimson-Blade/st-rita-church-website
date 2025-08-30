import React from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { Link } from 'react-router-dom';

interface CustomBlocksRendererProps {
  content: BlocksContent;
}

const CustomBlocksRenderer: React.FC<CustomBlocksRendererProps> = ({ content }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        // Paragraph styling
        paragraph: ({ children }) => (
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">{children}</p>
        ),
        
        // Heading styling with different levels
        heading: ({ children, level }) => {
          const baseClasses = "font-bold text-gray-900 mb-4 leading-tight";
          switch (level) {
            case 1:
              return <h1 className={`${baseClasses} text-4xl lg:text-5xl mb-8`}>{children}</h1>;
            case 2:
              return <h2 className={`${baseClasses} text-3xl lg:text-4xl mb-6`}>{children}</h2>;
            case 3:
              return <h3 className={`${baseClasses} text-2xl lg:text-3xl mb-5`}>{children}</h3>;
            case 4:
              return <h4 className={`${baseClasses} text-xl lg:text-2xl mb-4`}>{children}</h4>;
            case 5:
              return <h5 className={`${baseClasses} text-lg lg:text-xl mb-3`}>{children}</h5>;
            case 6:
              return <h6 className={`${baseClasses} text-base lg:text-lg mb-3`}>{children}</h6>;
            default:
              return <h1 className={`${baseClasses} text-4xl lg:text-5xl mb-8`}>{children}</h1>;
          }
        },
        
        // List styling
        list: ({ children, format }) => {
          if (format === 'ordered') {
            return (
              <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 text-lg pl-4">
                {children}
              </ol>
            );
          }
          return (
            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 text-lg pl-4">
              {children}
            </ul>
          );
        },
        
        // List item styling
        'list-item': ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        
        // Quote styling
        quote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-6 py-4 mb-6 bg-blue-50 rounded-r-lg">
            <div className="text-gray-700 text-lg italic leading-relaxed">{children}</div>
          </blockquote>
        ),
        
        // Code block styling
        code: ({ children, plainText }) => (
          <pre className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6 overflow-x-auto">
            <code className="text-sm font-mono text-gray-800">{plainText || children}</code>
          </pre>
        ),
        
        // Image styling
        image: ({ image }) => (
          <div className="mb-6">
            <img
              src={image.url}
              alt={image.alternativeText || ''}
              className="w-full h-auto rounded-lg shadow-md"
            />
            {image.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center italic">{image.caption}</p>
            )}
          </div>
        ),
        
        // Link styling - using React Router Link for internal links
        link: ({ children, url }) => {
          // Check if it's an internal link (starts with / or doesn't have protocol)
          const isInternal = url.startsWith('/') || (!url.includes('://') && !url.startsWith('mailto:'));
          
          if (isInternal) {
            return (
              <Link 
                to={url} 
                className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 break-words hyphens-auto"
              >
                {children}
              </Link>
            );
          }
          
          return (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 break-words hyphens-auto"
            >
              {children}
            </a>
          );
        },
      }}
      modifiers={{
        // Bold text
        bold: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        
        // Italic text
        italic: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        
        // Underlined text
        underline: ({ children }) => (
          <span className="underline">{children}</span>
        ),
        
        // Strikethrough text
        strikethrough: ({ children }) => (
          <span className="line-through">{children}</span>
        ),
        
        // Inline code
        code: ({ children }) => (
          <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
            {children}
          </code>
        ),
      }}
    />
  );
};

export default CustomBlocksRenderer;
