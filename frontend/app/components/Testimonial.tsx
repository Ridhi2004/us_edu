'use client';
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 5000;

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 5,
    content: "This product has completely transformed how we do business. The team is incredibly responsive and the results speak for themselves.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 5,
    content: "I've been in this industry for 10+ years and haven't seen anything like this. It's intuitive, powerful, and actually delivers on its promises.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1685760259914-ee8d2c92d2e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 5,
    content: "The ROI we've seen from using this platform has been incredible. Our team productivity has increased by over 200%.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 5,
    content: "Exceptional service and outstanding results. We've been able to scale our operations in ways we never thought possible.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 1.5l2.6 5.9 6.4.6-4.9 4.3 1.5 6.3-5.6-3.4-5.6 3.4 1.5-6.3-4.9-4.3 6.4-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/* ---------- Box 1 (polished & wider): testimonials carousel ---------- */
function StudentVoiceBox() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % testimonials.length);
    setProgressKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p === 0 ? testimonials.length - 1 : p - 1));
    setProgressKey((k) => k + 1);
  }, []);

  const goTo = (i: number) => {
    setCurrent(i);
    setProgressKey((k) => k + 1);
  };

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [isPaused, next, current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    touchStartX.current = null;
    setIsPaused(false);
  };

  const t = testimonials[current];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden from-white to-slate-50 rounded-lg shadow-md border border-slate-100 h-full lg:col-span-2 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background elements - animated */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#1B4595]/[0.03] animate-drift" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#1B4595]/[0.03] animate-drift-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#1B4595]/[0.02] animate-pulse-slow" />

      <div className="relative z-10 text-center mb-6 px-4 pt-6">
        <p className={`text-[#683D2A] uppercase tracking-[0.15em] text-[10px] font-semibold mb-1 transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Testimonials
        </p>
        <h2 className={`text-2xl md:text-3xl text-slate-900 font-bold transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Student's Voice
        </h2>
        <div className={`w-12 h-0.5 bg-gradient-to-r from-[#683D2A] to-[#683D2A]/40 mx-auto mt-2 rounded-full transition-all duration-700 delay-400 ${
          isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`} />
      </div>

      <div
        className="relative z-10 max-w-3xl mx-auto px-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bg-white rounded-xl shadow-md border border-slate-100 px-8 pt-6 pb-6 text-center relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          {/* Decorative quote marks */}
          <span className="absolute top-1 left-4 text-6xl leading-none text-[#1B4595]/[0.06] font-serif select-none animate-float-slow">
            "
          </span>
          <span className="absolute bottom-1 right-4 text-6xl leading-none text-[#1B4595]/[0.06] font-serif select-none transform rotate-180 animate-float-slow">
            "
          </span>

          {/* Profile Image */}
          <div className={`w-14 h-14 mx-auto rounded-full overflow-hidden ring-3 ring-[#1B4595]/15 shadow-md mb-3 transition-all duration-500 ${
            isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`} style={{ transitionDelay: '500ms' }}>
            <img 
              src={t.image} 
              alt={t.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
            />
          </div>

          <Stars count={t.rating} />

          <blockquote className={`mt-3 text-slate-600 text-sm md:text-base italic leading-relaxed transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: '600ms' }}>
            "{t.content}"
          </blockquote>

          <div className={`w-10 h-0.5 bg-gradient-to-r from-[#683D2A] to-[#683D2A]/40 mx-auto my-3 transition-all duration-500 delay-700 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`} />

          <p className={`text-[#683D2A] font-semibold text-sm transition-all duration-500 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            {t.name}
          </p>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-[#683D2A] border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 z-20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-[#683D2A] border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 z-20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Progress Bar */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                i === current ? "w-8 bg-slate-200" : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            >
              {i === current && (
                <span
                  key={progressKey}
                  className="absolute inset-0 bg-[#683D2A] origin-left"
                  style={{
                    animation: isPaused ? "none" : `progress-fill ${AUTOPLAY_MS}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="relative z-10 flex justify-center gap-2 mt-4 px-4 pb-6">
        {testimonials.map((item, i) => (
          <button
            key={item.id}
            onClick={() => goTo(i)}
            className={`relative w-10 h-10 rounded-full overflow-hidden transition-all duration-300 ${
              i === current 
                ? "ring-2 ring-[#683D2A] ring-offset-1 scale-105 opacity-100 shadow-sm" 
                : "opacity-40 hover:opacity-70 scale-100"
            }`}
          >
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <style>{`
        @keyframes progress-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.02; }
          50% { transform: scale(1.1); opacity: 0.05; }
        }
        @keyframes drift {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(10px, -15px) rotate(3deg); }
          66% { transform: translate(-10px, 10px) rotate(-3deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        @keyframes drift-slow {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(-15px, 10px) rotate(-2deg); }
          66% { transform: translate(10px, -15px) rotate(2deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-drift { animation: drift 12s ease-in-out infinite; }
        .animate-drift-slow { animation: drift-slow 15s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ---------- Box 2: Why US Edu-Consult? (smaller) ---------- */
function WhyUsBox() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const points = [
    "Pioneer in the field of Counselling",
    "Expert Visa Guidance from Certified Counsellors",
    "Maximum Visa Success Rate",
  ];

  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-lg shadow-sm border border-slate-100 h-full flex flex-col overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Image banner */}
      <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
          alt="Study abroad destinations"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className={`text-lg md:text-xl font-bold text-[#683D2A] transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}>
          Why US Edu-Consult ?
        </h2>

        <ul className="mt-3 space-y-1.5 flex-1">
          {points.map((point, index) => (
            <li 
              key={point} 
              className={`flex items-start gap-2 text-slate-500 text-xs leading-relaxed transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#178F3F] flex-shrink-0 animate-pulse" />
              {point}
            </li>
          ))}
        </ul>

        <button className={`mt-3 self-start px-4 py-1.5 bg-[#178F3F] hover:bg-[#137a35] text-white text-xs font-medium rounded transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`} style={{ transitionDelay: '500ms' }}>
          Read more
        </button>
      </div>
    </div>
  );
}

/* ---------- Box 3: News & Events (smaller) ---------- */
function NewsEventsBox() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const events = [
    {
      day: "05",
      month: "Dec",
      text: "We are happy to inform you that New Classes of TOEFL/IELTS & SAT are going to start on every coming Monday.",
    },
    {
      day: "25",
      month: "Aug",
      text: "Due to pleasant cultural diversity, world class infrastructures, Distinguished Instructors, Latest and leading curriculum.",
    },
  ];

  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-lg shadow-sm border border-slate-100 h-full p-4 flex flex-col transition-all duration-700 delay-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h2 className={`text-lg md:text-xl font-bold text-[#683D2A] transition-all duration-700 delay-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}>
        News & Events
      </h2>

      <div className="mt-3 space-y-3 flex-1">
        {events.map((event, i) => (
          <div 
            key={i} 
            className={`flex gap-3 items-start group transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
            style={{ transitionDelay: `${400 + i * 150}ms` }}
          >
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded bg-[#178F3F] text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              <span className="text-base font-bold leading-none">{event.day}</span>
              <span className="text-[10px] leading-none mt-0.5">{event.month}</span>
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              {event.text}{" "}
              <a href="#" className="text-red-500 hover:text-red-600 hover:underline whitespace-nowrap text-[10px] transition-colors duration-200">
                Read more...
              </a>
            </div>
          </div>
        ))}
      </div>

      <button className={`mt-3 self-start px-4 py-1.5 bg-[#178F3F] hover:bg-[#137a35] text-white text-xs font-medium rounded transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`} style={{ transitionDelay: '700ms' }}>
        Explore
      </button>
    </div>
  );
}

/* ---------- Section wrapper: 2-column layout (left wider, right stacked) ---------- */
export default function HomeInfoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-slate-100 py-6 px-4 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#683D2A]/5 rounded-full blur-3xl animate-drift" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1B4595]/5 rounded-full blur-3xl animate-drift-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#178F3F]/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* Testimonials take 2/3 width */}
        <StudentVoiceBox />
        
        {/* Right side stacked column */}
        <div className="flex flex-col gap-4">
          <WhyUsBox />
          <NewsEventsBox />
        </div>
      </div>

      <style>{`
        @keyframes drift {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 15px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes drift-slow {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.05); }
          66% { transform: translate(20px, -15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }
        .animate-drift { animation: drift 15s ease-in-out infinite; }
        .animate-drift-slow { animation: drift-slow 20s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}