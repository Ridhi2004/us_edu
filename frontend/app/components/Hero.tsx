'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

// Carousel data
const slides = [
  {
    id: 1,
    title: "Study in USA",
    subtitle: "World-class education with endless opportunities",
    description: "Join thousands of students pursuing their dreams in the United States. Get expert guidance for university selection, admissions, and visa processing.",
    image: "/slider/usa.jpg", 
    cta: "Explore USA",
    link: "/study-abroad/usa",
  },
  {
    id: 2,
    title: "Study in Canada",
    subtitle: "Quality education in a multicultural environment",
    description: "Canada offers world-renowned universities and a welcoming atmosphere for international students. Start your journey today.",
    image: "/slider/canada.jpg",
    cta: "Explore Canada",
    link: "/study-abroad/canada",
  },
  {
    id: 3,
    title: "Study in Australia",
    subtitle: "Experience academic excellence Down Under",
    description: "Australian universities rank among the world's best. Get comprehensive support for admissions, scholarships, and visa applications.",
    image: "/slider/australia.jpg",
    cta: "Explore Australia",
    link: "/study-abroad/australia",
  },
  {
    id: 4,
    title: "Study in UK",
    subtitle: "Legacy of academic excellence",
    description: "The United Kingdom offers world-class education with a rich cultural heritage. Get expert guidance for your UK study journey.",
    image: "/slider/uk.jpg",
    cta: "Explore UK",
    link: "/study-abroad/uk",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = slides.length;

  // Auto-play functionality
  const goToNextRef = useRef<() => void>(() => {});

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  goToNextRef.current = goToNext;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNextRef.current();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Pause auto-play on user interaction
  const handleInteraction = () => {
    setIsAutoPlaying(false);
    // Resume after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-[#683D2A]">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative flex-shrink-0"
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Moderate overlay for good text contrast without losing the image */}
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center px-4 md:px-16 lg:px-24">
              <div className="max-w-2xl text-white">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in [text-shadow:_0_4px_30px_rgba(0,0,0,0.9)]">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl font-light mb-4 text-white/95 [text-shadow:_0_2px_20px_rgba(0,0,0,0.8)]">
                  {slide.subtitle}
                </p>
                <p className="text-base md:text-lg mb-8 text-white/90 leading-relaxed [text-shadow:_0_2px_15px_rgba(0,0,0,0.7)]">
                  {slide.description}
                </p>
                <a
                  href={slide.link}
                  className="inline-block bg-[#059a05] hover:bg-[#027B02] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onMouseEnter={handleInteraction}
                >
                  {slide.cta} →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => { goToPrev(); handleInteraction(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={() => { goToNext(); handleInteraction(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { goToSlide(index); handleInteraction(); }}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 h-3 bg-amber-400 rounded-full'
                : 'w-3 h-3 bg-white/40 hover:bg-white/70 rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}