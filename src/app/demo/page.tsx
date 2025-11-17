"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import Button from "../components/button";
import theme from "../config/theme";

export default function DemoPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setReferralLink(data.referralLink || "");
        setMessage(
          "Welcome to the waitlist! Share your referral link with friends to earn rewards when we launch!",
        );
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const arrowIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black mb-4">
              Giving procurement teams superpowers
            </h1>

            {/* Qualifications */}
            <div className="text-left space-y-4 mb-8">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-gray-700">
                  Meet with an expert who will listen and learn about your
                  business needs
                </p>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-gray-700">
                  Identify how Aerium can integrate into your business to
                  deliver savings
                </p>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-gray-700">
                  Request custom add-ons tailored to your business needs
                </p>
              </div>
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-lg"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <Button
                text={isLoading ? "Submitting..." : "Request demo"}
                backgroundColor={theme.colors.orange}
                textColor={theme.colors.black}
                hoverColor="#E67A00"
                fontSize="large"
                padding="px-6 py-4"
                onClick={() => {}}
                icon={arrowIcon()}
                className="w-full justify-between"
              />

              {message && !isSuccess && (
                <div className="text-center text-sm text-red-600">
                  {message}
                </div>
              )}
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-medium text-black mb-10">
                  We&apos;ll reach out shortly to schedule a meeting
                </h2>
                <div className="space-y-3">
                  <Button
                    text="Back to home"
                    backgroundColor={theme.colors.black}
                    textColor="white"
                    hoverColor="#333333"
                    fontSize="medium"
                    padding="px-6 py-3"
                    onClick={() => router.push("/")}
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
