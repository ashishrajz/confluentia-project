'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { TiPlusOutline } from "react-icons/ti";
import { IoAnalyticsOutline } from "react-icons/io5";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { SignInButton, useUser } from "@clerk/nextjs"; // ✅ Clerk

import PopUp from "@/components/PopUp";
import Footer from "@/components/Footer";
import { RiQuillPenAiLine } from "react-icons/ri";

export default function Home() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const { isSignedIn, user } = useUser();
  const firstName = user?.firstName || "there";

  // For slider cards
  const cards = [
    {
      title: "Create Smarter. Faster. Better",
      description: "Beautiful and modern web designs that captivate your audience.",
      icon:"🖊️"
      ,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Generate AI powered Images/Video",
      description:" Bring your ideas to life with AIInstantly turn text prompts into stunning images and videos.Create visuals as limitless as your imagination",
      icon: "✨",
      color: "from-green-500 to-blue-600"
    },
    {
      title: "AI-Driven Analysis for Smarter Decisions.",
      description: "AI-powered platform that delivers deep, actionable insights from every post to help you understand trends, sentiment, and opportunities",
      icon: "📈",
      color: "from-pink-500 to-red-600"
    }
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);

  // ✅ CONDITIONAL UI
  if (isSignedIn) {
    // ---------- LOGGED IN VERSION ----------
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden animate-soothing-gradient">
        <style jsx>{`
          @keyframes soothing-gradient {
            0% { 
              background: linear-gradient(135deg, #fce7f3 0%, #e0f2fe 25%, #ffffff 50%, #f0f9ff 75%, #fce7f3 100%);
            }
            25% { 
              background: linear-gradient(135deg, #e0f2fe 0%, #ffffff 25%, #fce7f3 50%, #e0f2fe 75%, #f0f9ff 100%);
            }
            50% { 
              background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 25%, #e0f2fe 50%, #fce7f3 75%, #ffffff 100%);
            }
            75% { 
              background: linear-gradient(135deg, #f0f9ff 0%, #fce7f3 25%, #ffffff 50%, #e0f2fe 75%, #f0f9ff 100%);
            }
            100% { 
              background: linear-gradient(135deg, #fce7f3 0%, #e0f2fe 25%, #ffffff 50%, #f0f9ff 75%, #fce7f3 100%);
            }
          }
          .animate-soothing-gradient {
            animation: soothing-gradient 20s ease-in-out infinite;
          }
          .social-icons {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 50;
          }
          .social-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          .social-icon:hover {
            transform: scale(1.1) translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          }
          .instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
          .twitter { background: #1DA1F2; }
          .linkedin { background: #0077B5; }
        `}</style>

        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-blue-200/30 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-white/40 to-blue-100/40 rounded-full blur-lg animate-pulse"></div>

        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-8 p-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
              Welcome {firstName}!
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-pink-400 via-blue-400 to-white rounded-full"></div>
            <h2 className="text-2xl text-slate-600 font-light tracking-wide">Let&apos;s Get Started</h2>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <button
              onClick={() => setShowPopUp(true)}
              className="group relative px-10 py-5 font-medium rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/90 via-blue-400/90 to-white/90 bg-[length:200%_100%] animate-[gradient_6s_ease-in-out_infinite]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20"></div>
              <div className="relative flex items-center gap-3 text-slate-800 z-10">
                <span className="text-lg">Generate</span>
                <TiPlusOutline className="w-6 h-6 transform transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" />
              </div>
            </button>

            <Link href="/dashboard" className="group relative px-10 py-5 font-medium rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/90 via-white/90 to-pink-400/90 bg-[length:200%_100%] animate-[gradient_6s_ease-in-out_infinite_reverse]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20"></div>
              <div className="relative flex items-center gap-3 text-slate-800 z-10">
                <span className="text-lg">Analysis</span>
                <IoAnalyticsOutline className="w-6 h-6 transform transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" />
              </div>
            </Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        {/* PopUp */}
        {showPopUp && <PopUp onClose={() => setShowPopUp(false)} />}
      </main>
    );
  }

  // ---------- NOT LOGGED IN VERSION ----------
  return (
    <div className="min-h-screen flex flex-col text-slate-800 animate-soothing-gradient">
      <style jsx>{`
        @keyframes soothing-gradient {
          0% { 
            background: linear-gradient(135deg, #fce7f3 0%, #e0f2fe 25%, #ffffff 50%, #f0f9ff 75%, #fce7f3 100%);
          }
          25% { 
            background: linear-gradient(135deg, #e0f2fe 0%, #ffffff 25%, #fce7f3 50%, #e0f2fe 75%, #f0f9ff 100%);
          }
          50% { 
            background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 25%, #e0f2fe 50%, #fce7f3 75%, #ffffff 100%);
          }
          75% { 
            background: linear-gradient(135deg, #f0f9ff 0%, #fce7f3 25%, #ffffff 50%, #e0f2fe 75%, #f0f9ff 100%);
          }
          100% { 
            background: linear-gradient(135deg, #fce7f3 0%, #e0f2fe 25%, #ffffff 50%, #f0f9ff 75%, #fce7f3 100%);
          }
        }
        .animate-soothing-gradient {
          animation: soothing-gradient 20s ease-in-out infinite;
        }
        .social-icons {
          position: fixed;
          bottom: 30px;
          right: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 50;
        }
        .social-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .social-icon:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
        .twitter { background: #1DA1F2; }
        .linkedin { background: #0077B5; }
        .fade-in-up {
          animation: fadeInUp 1s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Main Content */}
      <main className="flex flex-col flex-1 items-center justify-center text-center px-4 py-16">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-slate-900 fade-in-up'>
            Welcome to Ascendo
          </h1>
          <h2 className='text-lg md:text-xl font-medium text-slate-600 fade-in-up delay-200'>
          Ascend with Us
          </h2>
          <p className='text-base text-slate-500 max-w-xl fade-in-up delay-400'>
          At Ascendo, we harness smart AI analysis to predict trends and boost future engagement. From generating powerful content, images, and videos to delivering insights that elevate your brand — we help you rise above the noise and grow smarter
          </p>
          <div className="mt-4 fade-in-up delay-600">
            <SignInButton mode="modal" redirectUrl="/dashboard">
              <button className="group bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Login To Get Started
              </button>
            </SignInButton>
          </div>
        </div>

        {/* Card Slider */}
        <div className="mt-24 w-full flex flex-col items-center justify-center gap-8 fade-in-up delay-600">
          <div className="relative w-full flex items-center justify-center" style={{ height: '400px' }}>
            {cards.map((card, index) => {
              let scale = 0.85;
              let height = '20rem';
              let translateX = 0;
              let opacity = 0;
              let zIndex = 1;

              if (index === currentCard) {
                scale = 1; height = '24rem'; opacity = 1; zIndex = 3; translateX = 0;
              } else if (index === (currentCard - 1 + cards.length) % cards.length) {
                scale = 0.85; height = '20rem'; opacity = 0.7; zIndex = 2; translateX = -280;
              } else if (index === (currentCard + 1) % cards.length) {
                scale = 0.85; height = '20rem'; opacity = 0.7; zIndex = 2; translateX = 280;
              } else {
                opacity = 0; translateX = index < currentCard ? -350 : 350;
              }

              return (
                <div
                  key={index}
                  className="absolute bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 text-left transform transition-all duration-500 ease-in-out"
                  style={{ width: '20rem', height, zIndex, transform: `translateX(${translateX}px) scale(${scale})`, opacity }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{card.description}</p>
                  
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <button onClick={prevCard} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600">‹</button>
            <div className="flex justify-center gap-3">
              {cards.map((_, index) => (
                <button key={index} onClick={() => setCurrentCard(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentCard ? 'bg-blue-600 w-6' : 'bg-slate-300 hover:bg-slate-400'}`} />
              ))}
            </div>
            <button onClick={nextCard} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600">›</button>
          </div>
        </div>
      </main>

      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>

      {/* Footer */}
      
    </div>
  );
}
