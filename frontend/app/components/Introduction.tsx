// components/Introduction.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Award, Users, Globe, BookOpen } from 'lucide-react';

// ---- Stat data (single source of truth, drives the count-up animation) ----
const STATS = [
  { icon: Award, value: 500, suffix: '+', label: 'Students Placed', color: 'text-blue-600' },
  { icon: Users, value: 50, suffix: '+', label: 'Expert Team', color: 'text-indigo-600' },
  { icon: Globe, value: 30, suffix: '+', label: 'Countries', color: 'text-purple-600' },
  { icon: BookOpen, value: 200, suffix: '+', label: 'Universities', color: 'text-pink-600' },
];

// ---- Hook: counts a number up from 0 once its element enters the viewport ----
function useCountUp(target: number, shouldStart: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    let frame: number;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldStart, target, duration]);

  return value;
}

// ---- Single animated stat card ----
const StatCard = ({
  stat,
  delayClass,
  inView,
}: {
  stat: (typeof STATS)[number];
  delayClass: string;
  inView: boolean;
}) => {
  const count = useCountUp(stat.value, inView);
  const Icon = stat.icon;

  return (
    <div
      className={`flex flex-col items-center p-2 transition-all duration-300 bg-white/80 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 glass-effect animate-fadeInUp ${delayClass}`}
    >
      <Icon className={`w-5 h-5 ${stat.color}`} />
      <span className="mt-1 text-lg font-bold text-gray-900 tabular-nums">
        {count}
        {stat.suffix}
      </span>
      <span className="text-xs text-gray-600">{stat.label}</span>
    </div>
  );
};

const Introduction = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blobWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [statsInView, setStatsInView] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Trigger the count-up once the section scrolls into view (only once)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle parallax: blobs drift slightly toward the cursor
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const wrap = blobWrapRef.current;
      if (!wrap) return;
      const { innerWidth, innerHeight } = window;
      const xPct = (e.clientX / innerWidth - 0.5) * 2;
      const yPct = (e.clientY / innerHeight - 0.5) * 2;
      wrap.style.setProperty('--parallax-x', `${xPct * 20}px`);
      wrap.style.setProperty('--parallax-y', `${yPct * 20}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // 3D tilt on the hero image, following the cursor while hovered
  const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // Magnetic pull on the CTA button + ripple on click
  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px) scale(1.05)`;
  };
  const resetButton = () => {
    const btn = buttonRef.current;
    if (btn) btn.style.transform = 'translate(0px, 0px) scale(1)';
  };
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-12 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) scale(1); }
          33% { transform: translate(calc(var(--parallax-x, 0px) + 30px), calc(var(--parallax-y, 0px) - 50px)) scale(1.1); }
          66% { transform: translate(calc(var(--parallax-x, 0px) - 20px), calc(var(--parallax-y, 0px) + 20px)) scale(0.9); }
          100% { transform: translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) scale(1); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes ripple {
          from { transform: scale(0); opacity: 0.5; }
          to { transform: scale(4); opacity: 0; }
        }

        .animate-blob {
          animation: blob 7s infinite;
          transition: transform 0.2s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .animation-delay-200 { animation-delay: 0.15s; }
        .animation-delay-400 { animation-delay: 0.3s; }
        .animation-delay-600 { animation-delay: 0.45s; }
        .animation-delay-800 { animation-delay: 0.6s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .tilt-card {
          transition: transform 0.15s ease-out;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          pointer-events: none;
          width: 20px;
          height: 20px;
          animation: ripple 0.65s ease-out forwards;
        }

        .magnetic-btn {
          transition: transform 0.15s ease-out, box-shadow 0.3s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-blob,
          .animate-float,
          .animate-spin-slow,
          .animate-fadeInUp,
          .animate-slideInLeft,
          .animate-pulse,
          .animate-shimmer {
            animation: none !important;
          }
          .tilt-card,
          .magnetic-btn {
            transition: none !important;
          }
        }
      `}</style>

      {/* Animated background blobs */}
      <div ref={blobWrapRef} className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-40 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-40 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative px-4 mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-2">
          {/* Left side - Content */}
          <div className="space-y-5">
            {/* Badge with float animation */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#683D2A] to-[#44281b] rounded-full shadow-md animate-float">
              <span className="text-[10px] font-semibold tracking-wider text-white uppercase">
                Welcome to US Edu-Consult
              </span>
            </div>

            {/* Heading with slide in animation */}
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl animate-slideInLeft">
              Your Gateway to
              <span className="block text-transparent bg-gradient-to-r from-[#683D2A] to-[#44281b] bg-clip-text">
                Global Education
              </span>
            </h1>

            {/* Description with fade in animation */}
            <p className="text-base leading-relaxed text-gray-700 md:text-lg animate-fadeInUp animation-delay-200">
              Professional Overseas Education Consultancy firm based in Kathmandu, Nepal,
              with several years of experience in placing the right student in the right universities.
            </p>

            <p className="text-sm leading-relaxed text-gray-600 animate-fadeInUp animation-delay-400">
              Our professional, energetic &amp; optimistic team of academicians and educational experts
              provides outstanding educational support to aspiring students.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  delayClass={`animation-delay-${(i + 1) * 200}`}
                  inView={statsInView}
                />
              ))}
            </div>

            {/* CTA Button */}
            <button
              ref={buttonRef}
              onMouseMove={handleButtonMove}
              onMouseLeave={resetButton}
              onClick={handleButtonClick}
              className="magnetic-btn group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden text-sm font-semibold text-white bg-[#059a05] rounded-full shadow-lg hover:shadow-green-500/25 transition-shadow duration-300 animate-fadeInUp animation-delay-800"
            >
              <span className="absolute inset-0 animate-shimmer"></span>
              <span className="absolute inset-0 bg-[#047804] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0"></span>

              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="ripple-effect"
                  style={{ left: r.x - 10, top: r.y - 10 }}
                />
              ))}

              <span className="relative z-10">Read More</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>

          {/* Right side - Image with 3D tilt-on-hover */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <div
                ref={imageRef}
                onMouseMove={handleImageMove}
                onMouseLeave={resetTilt}
                className="tilt-card relative aspect-square overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 animate-fadeInUp animation-delay-400"
                style={{
                  backgroundImage: `url('/images/abroad.jpg'), linear-gradient(to bottom right, #60a5fa, #6366f1, #7c3aed)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Globe className="w-16 h-16 mx-auto mb-2 opacity-50 animate-spin-slow" />
                    <span className="text-xl font-bold animate-pulse">Study Abroad</span>
                    <p className="mt-1 text-xs opacity-90">Dream. Plan. Achieve.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;