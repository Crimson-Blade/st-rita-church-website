import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import SEO from '../components/SEO';

const Donate: React.FC = () => {
  const qrRef1 = useRef<HTMLCanvasElement>(null);
  const qrRef2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate QR codes for both UPI IDs
    const generateQRCodes = async () => {
      try {
        // UPI Payment string format: upi://pay?pa=UPI_ID&pn=PAYEE_NAME&tn=TRANSACTION_NOTE
        const upiString1 = `upi://pay?pa=QR919823982767-4193@unionbankofindia&pn=St Rita Church&tn=Donation to St Rita Church`;
        const upiString2 = `upi://pay?pa=69825201@ubin&pn=St Rita Church&tn=Donation to St Rita Church`;

        if (qrRef1.current) {
          await QRCode.toCanvas(qrRef1.current, upiString1, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
        }

        if (qrRef2.current) {
          await QRCode.toCanvas(qrRef2.current, upiString2, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
        }
      } catch (error) {
        console.error('Error generating QR codes:', error);
      }
    };

    generateQRCodes();
  }, []);

  const bankDetails = {
    bankName: "Union Bank of India",
    accountNumber: "520101047634193",
    branch: "Maina Curtorim",
    ifscCode: "UBIN0905798"
  };

  const upiIds = [
    "QR919823982767-4193@unionbankofindia",
    "69825201@ubin"
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Donate"
        description="Support our parish mission and ministries through your generous donation."
        canonical="https://saintritamaina.org/donate"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support St. Rita Church</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your generous donations help us continue our mission of faith, service, and community building. 
            Choose from the convenient payment methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* NEFT Bank Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Bank Transfer (NEFT)</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <p className="text-gray-900 font-semibold">{bankDetails.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                    <p className="text-gray-900 font-semibold">{bankDetails.branch}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900 font-semibold">{bankDetails.accountNumber}</p>
                      <button
                        onClick={() => copyToClipboard(bankDetails.accountNumber)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900 font-semibold">{bankDetails.ifscCode}</p>
                      <button
                        onClick={() => copyToClipboard(bankDetails.ifscCode)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Please use "Donation to St. Rita Church" as the transaction reference.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UPI Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">UPI Payment</h2>
            </div>

            <div className="space-y-6">
              {/* UPI ID 1 */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">UPI ID 1</h3>
                <div className="flex justify-center mb-4">
                  <canvas ref={qrRef1} className="border border-gray-200 rounded-lg"></canvas>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-gray-900 font-mono text-sm break-all">{upiIds[0]}</p>
                  <button
                    onClick={() => copyToClipboard(upiIds[0])}
                    className="text-green-600 hover:text-green-800 text-sm whitespace-nowrap"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                {/* UPI ID 2 */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">UPI ID 2</h3>
                  <div className="flex justify-center mb-4">
                    <canvas ref={qrRef2} className="border border-gray-200 rounded-lg"></canvas>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-gray-900 font-mono text-sm">{upiIds[1]}</p>
                    <button
                      onClick={() => copyToClipboard(upiIds[1])}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Options Image */}
              <div className="mt-6 text-center">
                {/* <p className="text-sm font-medium text-gray-700 mb-3">Supported Payment Apps</p> */}
                <div className="flex justify-center">
                  <img 
                    src="/paymentoptions.jpg" 
                    alt="Supported payment apps: UPI, Paytm, Google Pay, PhonePe" 
                    className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
                    style={{ maxWidth: '300px' }}
                  />
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Scan the QR code with any UPI app or copy the UPI ID to make a payment instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Generosity</h3>
            <p className="text-lg text-gray-600 mb-6">
              Your donations support our church's mission, community programs, and help us serve those in need. 
              Every contribution, no matter the size, makes a meaningful difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure Payments
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                100% Safe & Encrypted
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Supporting Our Community
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
