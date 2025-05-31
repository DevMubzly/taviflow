'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/landingpage/layout/Navbar';
import Footer from '@/components/landingpage/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Home, Download, CreditCard } from 'lucide-react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PaymentConfirmation = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const receiptRef = useRef<HTMLDivElement>(null);

  // Generate transaction ID and dates after component mount
  useEffect(() => {
    const transactionId = `TF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const currentDate = new Date().toLocaleDateString();
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const endDate = date.toLocaleDateString();

    setTransactionId(transactionId);
    setCurrentDate(currentDate);
    setEndDate(endDate);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;

    try {
      // Set temporary styles for better PDF output
      const originalStyle = receiptRef.current.style.cssText;
      receiptRef.current.style.padding = '20px';
      receiptRef.current.style.backgroundColor = 'white';

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Reset styles
      receiptRef.current.style.cssText = originalStyle;

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate dimensions to fit receipt in PDF
      const imgWidth = 210 - 40; // A4 width (210mm) with margins
      const pageHeight = 297; // A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);

      // Save the PDF
      pdf.save(`TaviFlow_Receipt_${transactionId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {isLoading && <LoadingScreen message="Generating your receipt..." />}
      
      <Navbar />

      <div className="pt-24 pb-16">
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
          data-animate
        >
          <div className="rounded-full h-24 w-24 bg-green-100 mx-auto flex items-center justify-center mb-8">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-taviflow-dark mb-6">
            Payment Successful!
          </h1>

          <p className="text-xl text-taviflow-gray max-w-3xl mx-auto mb-12">
            Thank you for your purchase. Your plan is now active.
          </p>

          <Card className="mb-8 p-8 border border-gray-200" ref={receiptRef}>
            <div className="text-left">
              {/* Logo and header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div className="flex items-center">
                  <div className="mr-3 bg-taviflow-blue rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                    TF
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-taviflow-dark">TaviFlow</h3>
                    <p className="text-xs text-taviflow-gray">Streamline Your Inventory Management</p>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold">Payment Receipt</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="font-medium">Basic</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">100</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{currentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium">{transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subscription Period</p>
                  <p className="font-medium">Monthly</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-500 mb-2">Payment Method</p>
                <div className="flex items-center">
                  <div className="bg-taviflow-blue/10 p-2 rounded-full mr-3">
                    <CreditCard className="h-4 w-4 text-taviflow-blue" />
                  </div>
                  <span>Mobile Money</span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-2">A copy of this receipt has been sent to your email</p>
                <p className="text-xs text-gray-400 mt-4">© {new Date().getFullYear()} TaviFlow. All rights reserved.</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="bg-taviflow-blue hover:bg-taviflow-blue-dark w-full sm:w-auto"
              onClick={() => router.push('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>

            <Button
              variant="outline"
              className="border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue-light/20 w-full sm:w-auto"
              onClick={downloadReceipt}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-taviflow-gray">Click 'Go to Dashboard' to access your account</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentConfirmation;
