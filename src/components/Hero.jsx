"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      badge: "✦ THE STARTUP IDEA ECOSYSTEM",
      headingLine1: "Where Bold Ideas",
      headingLine2: "Find Their",
      highlightWord: "Community",
      description: "Share your startup vision, gather feedback from innovators, and collaborate to turn raw concepts into validated realities.",
      bgClass: "from-[#1A3C2E] via-[#10271E] to-[#0A1A14] dark:from-[#0f172a] dark:via-[#020617] dark:to-black",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      badge: "🌱 CLIMATE TECH & ECO-INNOVATION",
      headingLine1: "Build Tomorrow's",
      headingLine2: "Sustainable",
      highlightWord: "Future",
      description: "Submit carbon offset solutions, eco-SaaS prototypes, and green blueprints to connect with impact developers and validation experts.",
      bgClass: "from-[#143c2b] via-[#0E2C1F] to-[#081C13] dark:from-[#111827] dark:via-[#030712] dark:to-black",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
    },
    {
      badge: "🤖 GENERATIVE AI & PRODUCTIVITY",
      headingLine1: "Accelerate Next-Gen",
      headingLine2: "Machine Learning",
      highlightWord: "Blueprints",
      description: "Connect with software engineers, prompt wizards, and tech advisors to test commercial viability of autonomous product concepts.",
      bgClass: "from-[#2A1E3C] via-[#1C122B] to-[#120B1E] dark:from-[#1e1b4b] dark:via-[#090514] dark:to-black",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  return (
    <div 
      className="relative w-full overflow-hidden transition-colors duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Slides */}
      <div className="relative h-[580px] sm:h-[620px] md:h-[650px] w-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 transition-all duration-1000 ease-in-out ${
                isActive 
                  ? 'opacity-100 translate-x-0 z-10' 
                  : 'opacity-0 translate-x-12 z-0 pointer-events-none'
              } bg-gradient-to-br ${slide.bgClass}`}
            >
              {/* Optional Background Decorative Image Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              ></div>

              <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                {/* Badge */}
                <span className="inline-block border border-[#E8A020] text-[#E8A020] bg-[#E8A0202E] rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase animate__animated animate__fadeInDown">
                  {slide.badge}
                </span>

                {/* Heading */}
                <h1 className="text-white font-black text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight">
                  {slide.headingLine1} <br className="hidden sm:inline" />
                  {slide.headingLine2} <span className="text-[#E8A020]">{slide.highlightWord}</span>
                </h1>

                {/* Description */}
                <p className="text-[#FFFFFFCC] dark:text-[#FFFFFFB3] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed md:text-lg">
                  {slide.description}
                </p>

                {/* Call To Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/ideas"
                    className="w-full sm:w-auto px-8 py-4 bg-[#E8A020] hover:bg-[#d69018] text-white dark:text-zinc-950 font-bold rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    Explore Ideas <FaArrowRight />
                  </Link>

                  <Link
                    href="/idea-form"
                    className="w-full sm:w-auto px-8 py-4 bg-[#ffffff10] border border-white/20 hover:border-[#E8A020] hover:text-[#E8A020] text-white font-bold rounded-2xl transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    Share Your Idea
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Left/Right Manual Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition active:scale-90 cursor-pointer hidden sm:flex items-center justify-center"
          title="Previous Slide"
        >
          <FaChevronLeft className="text-lg" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition active:scale-90 cursor-pointer hidden sm:flex items-center justify-center"
          title="Next Slide"
        >
          <FaChevronRight className="text-lg" />
        </button>

        {/* Bottom Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide ? 'w-8 bg-[#E8A020]' : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
              title={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Stats Block (Integrated beautifully below the slider banner) */}
      <div className="bg-[#1A3C2E] dark:bg-zinc-950 py-10 px-4 transition-colors duration-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
          {/* Item 1 */}
          <div className="flex-1 text-center px-6 py-6 border-b sm:border-b-0 sm:border-r border-white/10">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              2.4<span className="text-[#E8A020]">K</span>
            </h2>
            <p className="text-white/60 mt-1 text-xs uppercase tracking-widest font-bold">
              Ideas Shared
            </p>
          </div>
          {/* Item 2 */}
          <div className="flex-1 text-center px-6 py-6 border-b sm:border-b-0 sm:border-r border-white/10">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              890<span className="text-[#E8A020]">+</span>
            </h2>
            <p className="text-white/60 mt-1 text-xs uppercase tracking-widest font-bold">
              Founders Active
            </p>
          </div>
          {/* Item 3 */}
          <div className="flex-1 text-center px-6 py-6 border-b sm:border-b-0 sm:border-r border-white/10">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              14<span className="text-[#E8A020]">K</span>
            </h2>
            <p className="text-white/60 mt-1 text-xs uppercase tracking-widest font-bold">
              Comments Shared
            </p>
          </div>
          {/* Item 4 */}
          <div className="flex-1 text-center px-6 py-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              98<span className="text-[#E8A020]">%</span>
            </h2>
            <p className="text-white/60 mt-1 text-xs uppercase tracking-widest font-bold">
              Satisfaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}