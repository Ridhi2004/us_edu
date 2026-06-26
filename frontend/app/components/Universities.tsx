// 'use client';
// import { useState, useEffect, useCallback, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const AUTOPLAY_MS = 3000;

// const universities = [
//   {
//     id: 1,
//     name: "Harvard University",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Harvard_University_shield.svg/200px-Harvard_University_shield.svg.png",
//   },
//   {
//     id: 2,
//     name: "University of Oxford",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/University_of_Oxford_Logo.svg/200px-University_of_Oxford_Logo.svg.png",
//   },
//   {
//     id: 3,
//     name: "MIT",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/200px-MIT_logo.svg.png",
//   },
//   {
//     id: 4,
//     name: "Stanford University",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Stanford_University_seal_2003.svg/200px-Stanford_University_seal_2003.svg.png",
//   },
//   {
//     id: 5,
//     name: "University of Cambridge",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/University_of_Cambridge_Coat_of_Arms.svg/200px-University_of_Cambridge_Coat_of_Arms.svg.png",
//   },
//   {
//     id: 6,
//     name: "Yale University",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Yale_University_shield_1.svg/200px-Yale_University_shield_1.svg.png",
//   },
//   {
//     id: 7,
//     name: "Princeton University",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Princeton_University_seal.svg/200px-Princeton_University_seal.svg.png",
//   },
//   {
//     id: 8,
//     name: "University of Tokyo",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/University_of_Tokyo_seal.svg/200px-University_of_Tokyo_seal.svg.png",
//   },
// ];

// function UniversityCard({ university }: { university: typeof universities[0] }) {
//   return (
//     <div className="flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
//       {/* Logo Container */}
//       <div className="h-28 sm:h-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300">
//         <img
//           src={university.logo}
//           alt={university.name}
//           className="max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
//           onError={(e) => {
//             (e.target as HTMLImageElement).style.display = 'none';
//           }}
//         />
//       </div>
      
//       {/* University Name */}
//       <div className="p-2.5 text-center">
//         <h3 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">
//           {university.name}
//         </h3>
//       </div>
//     </div>
//   );
// }

// export default function AffiliatedUniversities() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(4);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const touchStartX = useRef<number | null>(null);

//   // Calculate visible cards based on screen width
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setVisibleCount(1);
//       } else if (window.innerWidth < 768) {
//         setVisibleCount(2);
//       } else if (window.innerWidth < 1024) {
//         setVisibleCount(3);
//       } else {
//         setVisibleCount(4);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const totalPages = Math.ceil(universities.length / visibleCount);
//   const maxIndex = Math.max(0, totalPages - 1);

//   const next = useCallback(() => {
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   }, [maxIndex]);

//   const prev = useCallback(() => {
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   }, [maxIndex]);

//   // Auto-play
//   useEffect(() => {
//     if (isPaused || totalPages <= 1) return;
//     const timer = setInterval(next, AUTOPLAY_MS);
//     return () => clearInterval(timer);
//   }, [isPaused, next, totalPages]);

//   // Touch handlers for mobile
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//     setIsPaused(true);
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (touchStartX.current === null) return;
//     const delta = e.changedTouches[0].clientX - touchStartX.current;
//     if (delta > 50) prev();
//     else if (delta < -50) next();
//     touchStartX.current = null;
//     setIsPaused(false);
//   };

//   // Get visible universities for current page
//   const startIndex = currentIndex * visibleCount;
//   const visibleUniversities = universities.slice(startIndex, startIndex + visibleCount);

//   return (
//     <section className="bg-[#0F172B] py-10 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
         
//           <h2 className="text-2xl md:text-3xl font-bold text-white">
//             Our Affiliated Universities
//           </h2>
//           <div className="w-16 h-0.5 bg-gradient-to-r from-[#683D2A] to-[#683D2A]/40 mx-auto mt-3 rounded-full" />
//         </div>

//         {/* Carousel */}
//         <div
//           className="relative"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//           ref={containerRef}
//         >
//           {/* Cards Container */}
//           <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 overflow-hidden px-8">
//             {visibleUniversities.map((university) => (
//               <UniversityCard key={university.id} university={university} />
//             ))}
//           </div>

//           {/* Navigation Buttons */}
//           {totalPages > 1 && (
//             <>
//               <button
//                 onClick={prev}
//                 aria-label="Previous"
//                 className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-[#683D2A] border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={next}
//                 aria-label="Next"
//                 className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-[#683D2A] border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </>
//           )}

//           {/* Dots Indicator */}
//           {totalPages > 1 && (
//             <div className="flex justify-center gap-1.5 mt-5">
//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentIndex(i)}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     i === currentIndex
//                       ? "w-6 bg-[#683D2A]"
//                       : "w-1.5 bg-slate-300 hover:bg-slate-400"
//                   }`}
//                   aria-label={`Go to page ${i + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 3000;

const universities = [
  {
    id: 1,
    name: "Harvard University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Harvard_University_shield.svg/200px-Harvard_University_shield.svg.png",
  },
  {
    id: 2,
    name: "University of Oxford",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/University_of_Oxford_Logo.svg/200px-University_of_Oxford_Logo.svg.png",
  },
  {
    id: 3,
    name: "MIT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/200px-MIT_logo.svg.png",
  },
  {
    id: 4,
    name: "Stanford University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Stanford_University_seal_2003.svg/200px-Stanford_University_seal_2003.svg.png",
  },
  {
    id: 5,
    name: "University of Cambridge",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/University_of_Cambridge_Coat_of_Arms.svg/200px-University_of_Cambridge_Coat_of_Arms.svg.png",
  },
  {
    id: 6,
    name: "Yale University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Yale_University_shield_1.svg/200px-Yale_University_shield_1.svg.png",
  },
  {
    id: 7,
    name: "Princeton University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Princeton_University_seal.svg/200px-Princeton_University_seal.svg.png",
  },
  {
    id: 8,
    name: "University of Tokyo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/University_of_Tokyo_seal.svg/200px-University_of_Tokyo_seal.svg.png",
  },
];

function UniversityCard({ university }: { university: typeof universities[0] }) {
  return (
    <div className="flex-shrink-0 w-[100px] xs:w-[110px] sm:w-40 md:w-44 lg:w-48 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      {/* Logo Container */}
      <div className="h-16 xs:h-20 sm:h-28 md:h-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-1 xs:p-2 sm:p-4 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300">
        <img
          src={university.logo}
          alt={university.name}
          className="max-h-10 xs:max-h-14 sm:max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      
      {/* University Name */}
      <div className="p-1 xs:p-1.5 sm:p-2.5 text-center">
        <h3 className="text-[8px] xs:text-[10px] sm:text-sm font-semibold text-slate-800 line-clamp-1">
          {university.name}
        </h3>
      </div>
    </div>
  );
}

export default function AffiliatedUniversities() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Calculate visible cards based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setVisibleCount(3); // Very small phones
      } else if (width < 640) {
        setVisibleCount(3); // Mobile
      } else if (width < 768) {
        setVisibleCount(3); // Small tablets
      } else if (width < 1024) {
        setVisibleCount(4); // Tablets
      } else {
        setVisibleCount(5); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(universities.length / visibleCount);
  const maxIndex = Math.max(0, totalPages - 1);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, next, totalPages]);

  // Touch handlers for mobile
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

  // Get visible universities for current page
  const startIndex = currentIndex * visibleCount;
  const visibleUniversities = universities.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="bg-[#0F172B] py-8 xs:py-10 px-1 xs:px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 xs:mb-6 sm:mb-8">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Our Affiliated Universities
          </h2>
          <div className="w-12 xs:w-16 h-0.5 bg-gradient-to-r from-[#683D2A] to-[#683D2A]/40 mx-auto mt-2 xs:mt-3 rounded-full" />
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          ref={containerRef}
        >
          {/* Cards Container */}
          <div className="flex justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-5 overflow-hidden px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8">
            {visibleUniversities.map((university) => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>

          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-5 xs:w-6 sm:w-7 md:w-8 h-5 xs:h-6 sm:h-7 md:h-8 rounded-full bg-white hover:bg-[#683D2A] border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
              >
                <ChevronLeft className="w-2.5 xs:w-3 sm:w-3.5 md:w-4 h-2.5 xs:h-3 sm:h-3.5 md:h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-5 xs:w-6 sm:w-7 md:w-8 h-5 xs:h-6 sm:h-7 md:h-8 rounded-full bg-white hover:bg-[#683D2A] border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 z-10"
              >
                <ChevronRight className="w-2.5 xs:w-3 sm:w-3.5 md:w-4 h-2.5 xs:h-3 sm:h-3.5 md:h-4" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-1 xs:gap-1.5 mt-3 xs:mt-4 sm:mt-5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 xs:h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-4 xs:w-5 sm:w-6 bg-[#683D2A]"
                      : "w-1 xs:w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}