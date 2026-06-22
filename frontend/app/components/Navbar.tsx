'use client';

import { Menu, X, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Menu data structure
const menuData = {
  home: {
    label: "Home",
    href: "/",
  },
  about: {
    label: "About Us",
    items: [
      { label: "Introduction", href: "/about" },
      { label: "Objectives", href: "/about/missionVission" },
      { label: "Our Team", href: "/about/WhyChooseElectra" },
      { label: "Chitwan Branch", href: "/about/BodMessage" },
      { label: "Legal Documents", href: "/about/trainingCertificates" },
    ],
  },
  services: {
    label: "Services",
    items: [
      { label: "Career Counselling", href: "/howWeWork/legalCompliance" },
      { label: "University Selection", href: "/howWeWork/orgStructure" },
      { label: "Recommendation", href: "/howWeWork/commitments" },
      { label: "Admission Guidance", href: "/howWeWork/ourTeam" },
      { label: "Finance Assistance", href: "/howWeWork/RequiredDocs" },
      { label: "Travel Assistance", href: "/howWeWork/recruitement" },
      { label: "Pre-Departure Guidance", href: "/howWeWork/recruitement" },
      { label: "Scholarships Guidance", href: "/howWeWork/recruitement" },
      { label: "Visa Assistance", href: "/howWeWork/recruitement" },
    ],
  },
  studyAbroad: {
    label: "Study Abroad",
    items: [
      {
        label: "USA",
        href: "/study-abroad/usa",
        subItems: [
          { label: "USA Gallery", href: "/study-abroad/usa/gallery" },
          { label: "Why Study In USA", href: "/study-abroad/usa/why-study" },
          { label: "Earning While Studying", href: "/study-abroad/usa/earning" },
          { label: "Admission in USA", href: "/study-abroad/usa/admission" },
          { label: "Student Visa Process", href: "/study-abroad/usa/visa" },
          { label: "US Student Visa FAQs", href: "/study-abroad/usa/faqs" },
          { label: "Financial Aids", href: "/study-abroad/usa/financial" },
          { label: "Living Cost in USA", href: "/study-abroad/usa/living-cost" },
        ],
      },
      {
        label: "Canada",
        href: "/study-abroad/canada",
        subItems: [
          { label: "Canada Gallery", href: "/study-abroad/canada/gallery" },
          { label: "Why Study In Canada", href: "/study-abroad/canada/why-study" },
          { label: "Earning While Studying", href: "/study-abroad/canada/earning" },
          { label: "Admission In Canada", href: "/study-abroad/canada/admission" },
          { label: "Living Cost In Canada", href: "/study-abroad/canada/living-cost" },
        ],
      },
      {
        label: "Australia",
        href: "/study-abroad/australia",
        subItems: [
          { label: "Australia Gallery", href: "/study-abroad/australia/gallery" },
          { label: "Why Study In Australia", href: "/study-abroad/australia/why-study" },
          { label: "Earning While Studying", href: "/study-abroad/australia/earning" },
          { label: "Admission In Australia", href: "/study-abroad/australia/admission" },
        ],
      },
      {
        label: "UK",
        href: "/study-abroad/uk",
        subItems: [
          { label: "UK Gallery", href: "/study-abroad/uk/gallery" },
          { label: "Why Study In UK", href: "/study-abroad/uk/why-study" },
          { label: "Earning While Studying", href: "/study-abroad/uk/earning" },
          { label: "Admission In UK", href: "/study-abroad/uk/admission" },
          { label: "Student Visa Process", href: "/study-abroad/uk/visa" },
          { label: "Living Cost In UK", href: "/study-abroad/uk/living-cost" },
        ],
      },
      {
        label: "China",
        href: "/study-abroad/china",
        subItems: [
          { label: "China Gallery", href: "/study-abroad/china/gallery" },
          { label: "Why Study In China", href: "/study-abroad/china/why-study" },
          { label: "Working While Studying", href: "/study-abroad/china/working" },
          { label: "Admission In China", href: "/study-abroad/china/admission" },
          { label: "Living Cost In China", href: "/study-abroad/china/living-cost" },
        ],
      },
      {
        label: "New Zealand",
        href: "/study-abroad/new-zealand",
        subItems: [
          { label: "New Zealand Gallery", href: "/study-abroad/new-zealand/gallery" },
          { label: "Why Study In New Zealand", href: "/study-abroad/new-zealand/why-study" },
          { label: "Visa Checklist", href: "/study-abroad/new-zealand/visa-checklist" },
          { label: "Important Points", href: "/study-abroad/new-zealand/important-points" },
          { label: "Earning While Studying", href: "/study-abroad/new-zealand/earning" },
          { label: "Admission In New Zealand", href: "/study-abroad/new-zealand/admission" },
          { label: "Student Visa Process", href: "/study-abroad/new-zealand/visa-process" },
        ],
      },
      {
        label: "India",
        href: "/study-abroad/india",
        subItems: [
          { label: "India Gallery", href: "/study-abroad/india/gallery" },
          { label: "Why Study In India", href: "/study-abroad/india/why-study" },
          { label: "Visa Information", href: "/study-abroad/india/visa-info" },
          { label: "Why India", href: "/study-abroad/india/why-india" },
        ],
      },
      {
        label: "Schengen Countries",
        href: "/study-abroad/schengen",
      },
    ],
  },
  institutions: {
    label: "Institutions",
    items: [
      {
        label: "Universities",
        href: "/institutions/universities",
        subItems: [
          { label: "USA Universities", href: "/institutions/universities/usa" },
          { label: "Canada Universities", href: "/institutions/universities/canada" },
          { label: "UK Universities", href: "/institutions/universities/uk" },
          { label: "Australia Universities", href: "/institutions/universities/australia" },
          { label: "New Zealand Universities", href: "/institutions/universities/new-zealand" },
        ],
      },
      {
        label: "Colleges",
        href: "/institutions/colleges",
        subItems: [
          { label: "USA Colleges", href: "/institutions/colleges/usa" },
          { label: "Canada Colleges", href: "/institutions/colleges/canada" },
          { label: "UK Colleges", href: "/institutions/colleges/uk" },
          { label: "Australia Colleges", href: "/institutions/colleges/australia" },
        ],
      },
      {
        label: "Schools",
        href: "/institutions/schools",
        subItems: [
          { label: "USA Schools", href: "/institutions/schools/usa" },
          { label: "Canada Schools", href: "/institutions/schools/canada" },
          { label: "UK Schools", href: "/institutions/schools/uk" },
        ],
      },
      {
        label: "Language Schools",
        href: "/institutions/language-schools",
        subItems: [
          { label: "IELTS Preparation", href: "/institutions/language-schools/ielts" },
          { label: "TOEFL Preparation", href: "/institutions/language-schools/toefl" },
          { label: "PTE Preparation", href: "/institutions/language-schools/pte" },
        ],
      },
      {
        label: "Training Centers",
        href: "/institutions/training-centers",
        subItems: [
          { label: "Professional Training", href: "/institutions/training-centers/professional" },
          { label: "Vocational Training", href: "/institutions/training-centers/vocational" },
          { label: "Corporate Training", href: "/institutions/training-centers/corporate" },
        ],
      },
      {
        label: "Research Institutes",
        href: "/institutions/research-institutes",
      },
    ],
  },
  contact: {
    label: "Contact Us",
    href: "/contact",
  },
};

// Helper function to check if an item has subItems
const hasSubItems = (item: any) => {
  return item.subItems && item.subItems.length > 0;
};

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Dynamic mobile dropdown state based on menu keys
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({
    about: false,
    services: false,
    studyAbroad: false,
    institutions: false,
  });

  const toggleMobileDropdown = (key: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
        setMobileMenuOpen(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setMobileDropdowns({
      about: false,
      services: false,
      studyAbroad: false,
      institutions: false,
    });
  };

  // Get menu items for rendering (excluding home and contact)
  const menuItems = [
    { key: 'about', data: menuData.about },
    { key: 'services', data: menuData.services },
    { key: 'studyAbroad', data: menuData.studyAbroad },
    { key: 'institutions', data: menuData.institutions },
  ];

  // Render dropdown items recursively
  const renderDropdownItems = (items: any[], isNested: boolean = false) => {
    return items.map((item, index) => {
      const hasChildren = hasSubItems(item);
      const isLast = index === items.length - 1;
      
      if (hasChildren) {
        return (
          <div key={item.href} className="relative group/nested">
            <Link 
              href={item.href} 
              className={`flex items-center justify-between px-4 py-2 text-sm text-[#683D2A] hover:bg-[#683D2A] hover:text-white transition-colors ${index === 0 ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`}
            >
              <span>{item.label}</span>
              <ChevronRight size={14} className="text-[#683D2A]/40 group-hover/nested:text-white" />
            </Link>
            <div className="absolute right-full top-0 mr-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 z-20">
              {renderDropdownItems(item.subItems, true)}
            </div>
          </div>
        );
      }
      
      return (
        <Link 
          key={item.href} 
          href={item.href} 
          className={`block px-4 py-2 text-sm text-[#683D2A] hover:bg-[#683D2A] hover:text-white transition-colors ${index === 0 && !isNested ? 'rounded-t-lg' : ''} ${isLast && !isNested ? 'rounded-b-lg' : ''}`}
        >
          {item.label}
        </Link>
      );
    });
  };

  // Render mobile dropdown items
  const renderMobileItems = (items: any[]) => {
    return items.map((item) => {
      if (hasSubItems(item)) {
        return (
          <div key={item.href} className="relative">
            <Link 
              href={item.href} 
              className="block px-4 py-2 text-sm text-[#683D2A] hover:bg-[#683D2A] hover:text-white rounded-lg transition-colors"
            >
              {item.label}
            </Link>
            <div className="ml-4 space-y-0.5 border-l-2 border-[#683D2A] pl-2">
              {item.subItems.map((subItem: any) => (
                <Link 
                  key={subItem.href} 
                  href={subItem.href} 
                  onClick={closeAllMenus}
                  className="block px-4 py-2 text-sm text-[#683D2A] hover:bg-[#683D2A] hover:text-white rounded-lg transition-colors"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        );
      }
      
      return (
        <Link 
          key={item.href} 
          href={item.href} 
          onClick={closeAllMenus}
          className="block px-4 py-2 text-sm text-[#683D2A] hover:bg-[#683D2A] hover:text-white rounded-lg transition-colors"
        >
          {item.label}
        </Link>
      );
    });
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } bg-white text-[#683D2A] border-b-2 border-gray-200`}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2">
                <div className="w-24 h-20 relative">
                  <Image
                    src="/images/logoo.jpeg"
                    alt="US Edu Consult"
                    width={80}
                    height={80}
                    className="object-contain rounded-full border-2 border-[#683D2A]"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-[#683D2A] font-extrabold text-base tracking-tight leading-tight">
                    US Edu - Consult Pvt. Ltd.
                  </h1>
                  <p className="text-[#683D2A]/70 text-[10px] font-medium tracking-wider uppercase">
                    International Education Consultancy
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              {/* Home Link */}
              <Link
                href={menuData.home.href}
                className="text-[#683D2A] font-semibold text-sm px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#683D2A] hover:text-white"
              >
                {menuData.home.label}
              </Link>

              {/* Dynamic Menu Items */}
              {menuItems.map(({ key, data }) => (
                <div key={key} className="relative group">
                  <button className="flex items-center gap-1 text-[#683D2A] font-semibold text-sm px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#683D2A] hover:text-white">
                    {data.label}
                    <ChevronDown size={13} className="transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    {renderDropdownItems(data.items)}
                  </div>
                </div>
              ))}

              {/* Contact Us Link */}
              <Link
                href={menuData.contact.href}
                className="text-[#683D2A] font-semibold text-sm px-5 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#683D2A] hover:text-white border-2 border-[#683D2A] hover:border-[#683D2A] shadow-md"
              >
                {menuData.contact.label}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#683D2A] hover:text-[#683D2A]/70 transition-colors p-1"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[76px] bottom-0 bg-white z-40 overflow-y-auto border-t border-gray-200 shadow-lg">
          <div className="p-4 space-y-1">
            {/* Home Link */}
            <Link
              href={menuData.home.href}
              onClick={closeAllMenus}
              className="block px-4 py-2.5 text-[#683D2A] font-semibold hover:bg-[#683D2A] hover:text-white rounded-lg transition-colors"
            >
              {menuData.home.label}
            </Link>

            {/* Dynamic Mobile Menu Items */}
            {menuItems.map(({ key, data }) => (
              <div key={key}>
                <button
                  onClick={() => toggleMobileDropdown(key)}
                  className="flex items-center justify-between w-full px-4 py-2.5 text-[#683D2A] font-semibold hover:bg-[#683D2A] hover:text-white rounded-lg transition-colors"
                >
                  {data.label}
                  {mobileDropdowns[key] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {mobileDropdowns[key] && (
                  <div className="ml-4 space-y-0.5 border-l-2 border-[#683D2A] pl-2">
                    {renderMobileItems(data.items)}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Link */}
            <Link
              href={menuData.contact.href}
              onClick={closeAllMenus}
              className="block px-4 py-2.5 text-[#683D2A] font-semibold border-2 border-[#683D2A] hover:bg-[#683D2A] hover:text-white rounded-lg transition-colors text-center"
            >
              {menuData.contact.label}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}