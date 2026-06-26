'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle,
  Globe, Building, Users, Award, MessageCircle,
  User, AtSign, FileText, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

// Simple SVG social icons
const SocialIcons = {
  Facebook: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Youtube: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
};

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Minimum 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1500);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', details: ['Kathmandu, Nepal'], color: 'bg-blue-500' },
    { icon: Phone, title: 'Call Us', details: ['+977-1-4412345'], color: 'bg-green-500' },
    { icon: Mail, title: 'Email Us', details: ['info@useduconsult.com'], color: 'bg-red-500' },
    { icon: Clock, title: 'Working Hours', details: ['Mon-Fri: 9AM-6PM'], color: 'bg-purple-500' },
  ];

  const socialLinks = [
    { icon: SocialIcons.Facebook, href: '#', color: 'hover:bg-[#1877f2]' },
    { icon: SocialIcons.Twitter, href: '#', color: 'hover:bg-[#1da1f2]' },
    { icon: SocialIcons.Instagram, href: '#', color: 'hover:bg-[#e4405f]' },
    { icon: SocialIcons.Linkedin, href: '#', color: 'hover:bg-[#0a66c2]' },
    { icon: SocialIcons.Youtube, href: '#', color: 'hover:bg-[#ff0000]' },
  ];

  const stats = [
    { icon: Users, value: '5000+', label: 'Students' },
    { icon: Award, value: '98%', label: 'Success Rate' },
    { icon: Building, value: '50+', label: 'Partners' },
    { icon: Globe, value: '15+', label: 'Countries' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="relative bg-[#0F172B] text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#683D2A] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#683D2A] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">Get In Touch</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            Have questions about studying abroad? We're here to help.
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <span className="inline-block w-12 h-1 bg-[#683D2A] rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-6 px-4 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-3 text-center hover:scale-105 transition-transform duration-300 animate-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${index * 100}ms` }}>
              <stat.icon className="w-5 h-5 text-[#683D2A] mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="animate-on-scroll opacity-0 translate-y-10">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Contact Information</h2>
              <p className="text-sm text-slate-600">Reach out to us through any channel.</p>
            </div>

            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-all hover:translate-x-1 animate-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className={`${item.color} p-2 rounded-lg text-white flex-shrink-0`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-xs">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-slate-600 text-xs">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white rounded-lg shadow-md p-4 animate-on-scroll opacity-0 translate-y-10">
              <h3 className="font-semibold text-slate-900 text-sm mb-2">Follow Us</h3>
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer"
                      className={`w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center transition-all ${social.color} hover:text-white hover:scale-110`}>
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div ref={formRef} className="bg-white rounded-xl shadow-lg p-6 animate-on-scroll opacity-0 translate-y-10">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
                  <p className="text-sm text-slate-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Full Name <span className='text-red-600'>*</span></label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          name="fullName" 
                          value={formData.fullName} 
                          onChange={handleChange}
                          placeholder="John Doe" 
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[#683D2A] focus:border-transparent placeholder:text-slate-500 text-slate-900`} 
                        />
                      </div>
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Email <span className='text-red-600'>*</span></label>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            placeholder="john@example.com" 
                            className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[#683D2A] focus:border-transparent placeholder:text-slate-500 text-slate-900`} 
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Phone <span className='text-red-600'>*</span></label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange}
                            placeholder="+977-XXXXXXXXXX" 
                            className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.phone ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[#683D2A] focus:border-transparent placeholder:text-slate-500 text-slate-900`} 
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Subject <span className='text-red-600'>*</span></label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange}
                          placeholder="Study Abroad Inquiry" 
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.subject ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[#683D2A] focus:border-transparent placeholder:text-slate-500 text-slate-900`} 
                        />
                      </div>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Message <span className='text-red-600'>*</span></label>
                      <div className="relative">
                        <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <textarea 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange}
                          rows={3} 
                          placeholder="Write your message here..."
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.message ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[#683D2A] focus:border-transparent resize-none placeholder:text-slate-500 text-slate-900`} 
                        />
                      </div>
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#683D2A] hover:bg-[#533222] text-white font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                    >
                      {isSubmitting ? (
                        <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Sending...</>
                      ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-on-scroll opacity-0 translate-y-10">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#683D2A]" /> Find Us Here
              </h2>
            </div>
            <div className="relative w-full h-[300px] md:h-[400px] bg-slate-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.306664676172!2d85.33263977525498!3d27.738685776164672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19479b1b6a85%3A0x8144eca1e5e4cc9a!2sUS%20Edu%20Consult%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1782451772446!5m2!1sen!2snp" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                className="absolute inset-0" 
                title="Location"
              />
              <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow-md p-3">
                <p className="font-semibold text-slate-900 text-xs">US Edu Consult Pvt. Ltd.</p>
                <p className="text-slate-600 text-xs">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#0F172B] to-[#1a2744] rounded-xl p-6 md:p-8 text-center text-white animate-on-scroll opacity-0 translate-y-10">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to Start Your Journey?</h2>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto mb-4">
              Book a free consultation with our expert counselors.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/book-consultation" className="bg-[#683D2A] hover:bg-[#533222] text-white font-semibold px-6 py-2 rounded-lg transition-all hover:scale-105 text-sm">
                Book Free Consultation
              </Link>
              <Link href="/services" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-lg transition-all border border-white/20 hover:scale-105 text-sm">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-on-scroll { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll { opacity: 1 !important; transform: none !important; }
          .animate-fade-in { animation: none !important; }
        }
      `}</style>
    </div>
  );
}