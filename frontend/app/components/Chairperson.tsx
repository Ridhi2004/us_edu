'use client';
import { useEffect, useRef, useState } from "react";
import { 
  FaUserGraduate, 
  FaAward, 
  FaStar, 
  FaImages,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaPassport,
  FaGraduationCap
} from "react-icons/fa";
import { RiGalleryLine } from "react-icons/ri";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { GiDiploma } from "react-icons/gi";

interface LeadershipMessageProps {
  name: string;
  position: string;
  image: string;
  message: string;
}

function LeadershipMessage({
  name,
  position,
  image,
  message,
}: LeadershipMessageProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paragraphs = message.split("\n").filter((para) => para.trim() !== "");

  return (
    <div
      ref={cardRef}
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 transition-all duration-700 hover:shadow-xl h-full ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Top accent bar */}
      <div className="relative h-1 bg-gradient-to-r from-[#683D2A] via-[#8a5a42] to-[#44281b] overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 h-[calc(100%-4px)]">
        {/* Image + name block */}
        <div
          className={`flex flex-col items-center text-center flex-shrink-0 md:w-48 transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-[#683D2A] opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500 animate-pulse-slow" />
            <img
              src={image}
              alt={name}
              className="relative w-20 h-20 md:w-28 md:h-28 rounded-full object-cover ring-3 ring-[#f0e4dd] shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:ring-[#a8765c]"
            />
          </div>
          <h2 className="mt-2 text-base font-bold text-slate-900">{name}</h2>
          <p className="text-[#683D2A] font-medium tracking-wide uppercase text-[10px] mt-0.5">
            {position}
          </p>
        </div>

        {/* Message content */}
        <div className="flex-1 relative">
          <FaQuoteLeft className="absolute -top-0.5 -left-0.5 w-4 h-4 text-[#f0e4dd] animate-float-slow" />
          
          <div className="relative space-y-1.5 text-slate-700 leading-relaxed text-xs md:text-sm pl-2">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={`transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: visible ? `${300 + idx * 150}ms` : "0ms" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            className={`mt-3 pt-2 border-t border-slate-100 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: visible ? `${300 + paragraphs.length * 150}ms` : "0ms" }}
          >
            <p className="font-semibold text-slate-900 text-xs">{name}</p>
            <p className="text-[10px] text-slate-500">{position}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.08); opacity: 0.45; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          width: 50%;
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ---------- Sidebar Buttons Component ---------- */
function SidebarButtons() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
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

  const buttons = [
    { 
      id: "test-prep", 
      label: "TEST PREPARATION CLASSES", 
      icon: FaGraduationCap,
    },
    { 
      id: "visa", 
      label: "VISA PREPARATION CLASSES", 
      icon: FaPassport,
    },
    { 
      id: "scholarship", 
      label: "SCHOLARSHIP", 
      icon: GiDiploma,
    },
    { 
      id: "testimonials", 
      label: "TESTIMONIALS", 
      icon: FaStar,
    },
    { 
      id: "gallery", 
      label: "GALLERY", 
      icon: RiGalleryLine,
    },
  ];

  const handleClick = (id: string) => {
    setActiveSection(id);
    console.log(`Navigating to: ${id}`);
  };

  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 h-full flex flex-col transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#683D2A] to-[#44281b] px-4 py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2 relative z-10">
          <HiOutlineAcademicCap className="w-4 h-4 animate-float-slow" />
          Quick Links
        </h3>
      </div>

      {/* Buttons Container */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="space-y-2 flex-1">
          {buttons.map((button, index) => {
            const Icon = button.icon;
            const isActive = activeSection === button.id;
            
            return (
              <button
                key={button.id}
                onClick={() => handleClick(button.id)}
                className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#683D2A] text-white shadow-md scale-[1.02]"
                    : "bg-slate-50 hover:bg-slate-200 text-slate-700 hover:text-[#683D2A]"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms`
                }}
              >
                {/* Icon */}
                <span className={`transition-all duration-300 ${
                  isActive 
                    ? "text-white scale-110" 
                    : "text-slate-600 group-hover:text-[#683D2A] group-hover:scale-110"
                }`}>
                  <Icon className="w-4 h-4" />
                </span>

                {/* Label */}
                <span className={`font-semibold text-[11px] tracking-wide transition-all duration-300 ${
                  isActive ? "text-white" : "group-hover:text-[#683D2A]"
                }`}>
                  {button.label}
                </span>

                {/* Arrow indicator */}
                <span className={`ml-auto transition-all duration-300 ${
                  isActive 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                }`}>
                  <FaChevronRight className={`w-3 h-3 ${isActive ? "text-white" : "text-[#683D2A]"}`} />
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`mt-3 pt-2 border-t border-slate-200 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <p className="text-[10px] text-slate-400 text-center animate-pulse-slow">
            Click any button to explore
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.08); opacity: 0.45; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          width: 50%;
          animation: shimmer 2.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default function Chairperson() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chairpersonMessage = `Dear Stakeholders,
It is with great pleasure that I address you as we continue our journey of excellence and innovation. Our organization has always been committed to creating lasting value while maintaining the highest standards of integrity and corporate governance.
This year has been particularly significant, marked by strategic initiatives that have positioned us for sustainable growth. We remain dedicated to fostering a culture of innovation, embracing change, and delivering exceptional results that benefit all our stakeholders.
I am confident that with our talented team and robust strategies, we will continue to achieve new milestones and create a brighter future for everyone associated with our organization.`;

  return (
    <div 
      ref={sectionRef}
      className="relative bg-slate-900 overflow-hidden py-4"
    >
      {/* Animation styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.08); opacity: 0.45; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes drift {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -25px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.96); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes rotateSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          width: 50%;
          animation: shimmer 2.5s ease-in-out infinite;
        }
        .animate-drift { animation: drift 12s ease-in-out infinite; }
        .animate-drift-slow { animation: drift 18s ease-in-out infinite reverse; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-rotate-slow { animation: rotateSlow 20s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow,
          .animate-pulse-slow,
          .animate-shimmer,
          .animate-drift,
          .animate-drift-slow,
          .animate-fadeIn,
          .animate-slideInLeft,
          .animate-slideInRight,
          .animate-scaleIn,
          .animate-rotate-slow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background - animated subtle blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #475569 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #64748b 0px, #64748b 1px, transparent 1px, transparent 14px)",
          }}
        />
        {/* Animated gradient blobs */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#683D2A] rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-drift" />
        <div className="absolute top-1/3 -right-28 w-64 h-64 bg-[#44281b] rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-drift-slow" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-indigo-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-drift" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-drift" style={{ animationDelay: '6s' }} />
      </div>

      {/* Header - animated with fade in */}
      <div className={`relative bg-slate-900/60 backdrop-blur-sm border-b border-slate-700 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <span className="inline-block text-[#a8765c] text-[10px] font-semibold tracking-widest uppercase mb-0.5 animate-fadeIn">
            Leadership
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-0.5 animate-slideInLeft">
            Message from the Chairperson
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto animate-slideInRight">
            A word of vision and guidance from our Chairperson
          </p>
          
          {/* Decorative line with animation */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#683D2A] via-[#a8765c] to-[#683D2A] mx-auto mt-2 rounded-full animate-scaleIn" />
        </div>
      </div>

      {/* Main Content - animated */}
      <div className="relative max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left - Message (takes 2/3) */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <LeadershipMessage
              name="Sarah Mitchell"
              position="Chairperson"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwZXhlY3V0aXZlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzgwMzE5NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              message={chairpersonMessage}
            />
          </div>

          {/* Right - Sidebar Buttons (takes 1/3) */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <SidebarButtons />
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-[#683D2A]/10 animate-float-slow">
        <FaUserGraduate size={40} />
      </div>
      <div className="absolute bottom-20 right-10 text-[#683D2A]/10 animate-float-slow" style={{ animationDelay: '2s' }}>
        <FaAward size={35} />
      </div>
      <div className="absolute top-1/2 left-5 text-[#683D2A]/10 animate-float-slow" style={{ animationDelay: '4s' }}>
        <FaStar size={30} />
      </div>
      <div className="absolute bottom-1/3 right-5 text-[#683D2A]/10 animate-float-slow" style={{ animationDelay: '3s' }}>
        <FaImages size={30} />
      </div>
    </div>
  );
}