import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Menu, X, Clock, Calendar, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
  bookingCount: number;
}

export default function Navbar({ onScrollTo, bookingCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services & Rates', id: 'services' },
    { label: 'Why Choose Us', id: 'why-us' },
    { label: 'Our Therapists', id: 'therapists' },
    { label: 'Book Massage', id: 'booking-customizer' },
    { label: 'FAQs', id: 'faq' }
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDF9F3]/95 backdrop-blur-md shadow-md border-b border-[#2D2926]/10 py-3'
          : 'bg-[#FDF9F3]/80 backdrop-blur-xs border-b border-[#2D2926]/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand */}
          <div
            id="brand-logo-container"
            onClick={() => onScrollTo('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#C05B3D] flex items-center justify-center shadow-md shadow-[#C05B3D]/10">
              <Sparkles className="w-5 h-5 text-[#FDF9F3] animate-pulse" />
            </div>
            <div>
              <span className="block text-xl font-bold font-serif tracking-tight text-[#1F4031] group-hover:text-[#C05B3D] transition-colors">
                KLA MOBILE SPA
              </span>
              <span className="block text-[10px] font-mono text-[#C05B3D] tracking-widest uppercase">
                Luxury Wellness 24/7
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div id="desktop-nav-links" className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onScrollTo(item.id)}
                className="text-[#2D2926]/80 hover:text-[#C05B3D] font-medium text-sm transition-colors py-2 cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <button
              id="nav-my-bookings"
              onClick={() => onScrollTo('my-bookings')}
              className="relative p-2 text-[#1F4031] hover:text-[#C05B3D] transition-colors flex items-center space-x-1"
              title="Track My Bookings"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-medium hidden lg:inline">My Sessions</span>
              {bookingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C05B3D] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              id="nav-cta-book"
              onClick={() => onScrollTo('booking-customizer')}
              className="border-2 border-[#1F4031] text-[#1F4031] hover:bg-[#1F4031] hover:text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div id="mobile-nav-right" className="flex md:hidden items-center space-x-4">
            <button
              id="mobile-track-bookings"
              onClick={() => onScrollTo('my-bookings')}
              className="relative p-2 text-[#1F4031]"
            >
              <CheckCircle2 className="w-6 h-6" />
              {bookingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C05B3D] text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1F4031] hover:text-[#C05B3D] p-2 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-drawer-overlay"
          className="md:hidden bg-[#FDF9F3] border-t border-[#2D2926]/10 animate-slide-down shadow-xl"
        >
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => {
                  onScrollTo(item.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left text-[#2D2926]/90 hover:text-[#C05B3D] text-base font-semibold py-2.5 px-3 rounded-lg hover:bg-[#1F4031]/5 transition-all border-b border-[#2D2926]/5"
              >
                {item.label}
              </button>
            ))}
            <button
              id="mobile-drawer-my-bookings"
              onClick={() => {
                onScrollTo('my-bookings');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between text-[#1F4031] font-semibold py-2.5 px-3 rounded-lg hover:bg-[#1F4031]/5 transition-all border-b border-[#2D2926]/5"
            >
              <span>Track My Bookings</span>
              <span className="bg-[#C05B3D] text-white text-xs px-2 py-0.5 rounded-full">
                {bookingCount} Booked
              </span>
            </button>
            <div className="pt-4 px-3">
              <button
                id="mobile-drawer-cta-book"
                onClick={() => {
                  onScrollTo('booking-customizer');
                  setIsOpen(false);
                }}
                className="w-full bg-[#1F4031] text-white py-3 rounded-full font-bold text-center tracking-wide shadow-md"
              >
                Book Instant Massage
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
