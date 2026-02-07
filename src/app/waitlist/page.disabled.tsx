'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import Button from '../components/button';
import theme from '../config/theme';

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralId = searchParams.get('ref');

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          referralId: referralId || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setReferralLink(data.referralLink || '');
        setMessage('Welcome to the waitlist! Share your referral link with friends to earn rewards when we launch!');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const arrowIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black mb-4">
              Join the waitlist
            </h1>
            <p className="text-lg text-gray-600">
              Be the first to know when we launch
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <Button
                text="Join waitlist"
                backgroundColor={theme.colors.orange}
                textColor={theme.colors.black}
                hoverColor="#E67A00"
                fontSize="large"
                padding="px-6 py-4"
                onClick={() => {}}
                icon={arrowIcon()}
                className="w-full justify-between"
              />

              {message && (
                <div className={`text-center text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-medium text-black mb-2">You&apos;re on the list!</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                
                {referralLink && (
                  <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: theme.colors.cream }}>
                    <p className="text-sm text-black mb-3">Share your referral link:</p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="flex-1 px-3 py-2 text-md border border-gray-300 rounded-md bg-gray-50"
                      />
                      <Button
                        text={copied ? "Copied!" : "Copy"}
                        backgroundColor={copied ? "#10B981" : theme.colors.orange}
                        textColor="white"
                        hoverColor={copied ? "#059669" : "#E67A00"}
                        fontSize="small"
                        padding="px-4 py-2"
                        onClick={copyReferralLink}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Button
                    text="Back to home"
                    backgroundColor={theme.colors.black}
                    textColor="white"
                    hoverColor="#333333"
                    fontSize="medium"
                    padding="px-6 py-3"
                    onClick={() => router.push('/')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <WaitlistForm />
    </Suspense>
  );
}
