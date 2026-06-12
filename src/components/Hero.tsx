import React from 'react';
import { Calendar, Phone, ShieldCheck, MapPin, Sparkles, Clock } from 'lucide-react';
import heroImg from '../assets/images/kampala_luxury_massage_hero_1781260045057.jpg';

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <div
      id="home"
      className="relative min-h-screen bg-[#FDF9F3] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background radial-like gradient decor representing the warm Kampala clay atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF9F3] via-[#FAF3E8] to-[#FDF9F3]" />
      <div className="absolute -top-40 -right-40 w-120 h-120 rounded-full bg-[#C05B3D]/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-120 h-120 rounded-full bg-[#1F4031]/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: persuasive copy */}
        <div id="hero-text-content" className="lg:col-span-7 space-y-6 text-left">
          {/* Tagline element */}
          <div className="inline-flex items-center space-x-2 bg-[#1F4031]/10 border border-[#1F4031]/15 px-4 py-2 rounded-full shadow-inner animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-[#C05B3D] animate-ping" />
            <span className="text-xs font-mono tracking-widest text-[#1F4031] font-bold uppercase">
              Now Available 24/7 Across Kampala
            </span>
          </div>

          <div className="space-y-4">
            <span className="text-[#C05B3D] font-serif italic text-2xl block">A Sanctuary in the City</span>
            <h1 className="text-4xl sm:text-5xl lg:text-[72px] leading-[1] lg:leading-[0.9] font-serif font-black text-[#1F4031] tracking-tighter">
              Luxury Relaxation,<br />
              <span className="text-[#C05B3D]">Delivered To Your Doorstep.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#2D2926]/80 max-w-xl font-medium leading-relaxed">
              Experience Kampala’s primary, premium, and fully-equipped mobile massage therapy. 
              We bring a modern professional heavy-duty spa table, aromatic essential oils, calming music, 
              and certified expertise straight to your home, luxury hotel suite, or exclusive office.
            </p>
          </div>

          {/* Quick interactive parameters bar */}
          <div id="quick-benefits-highlights" className="grid grid-cols-2 gap-4 border-t border-b border-[#2D2926]/10 py-4 max-w-xl">
            <div className="flex items-center space-x-3 text-[#2D2926]">
              <ShieldCheck className="w-5 h-5 text-[#C05B3D] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Certified Therapists Only</span>
            </div>
            <div className="flex items-center space-x-3 text-[#2D2926]">
              <MapPin className="w-5 h-5 text-[#1F4031] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">All Nakasero & Kampala Zones</span>
            </div>
            <div className="flex items-center space-x-3 text-[#2D2926]">
              <Clock className="w-5 h-5 text-[#C05B3D] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Professional Kit Included</span>
            </div>
            <div className="flex items-center space-x-3 text-[#2D2926]">
              <Sparkles className="w-5 h-5 text-[#1F4031] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Local Organic Shea Aromas</span>
            </div>
          </div>

          {/* Core Call to Actions */}
          <div id="hero-actions" className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              id="hero-cta-book-session"
              onClick={() => onScrollTo('booking-customizer')}
              className="bg-[#1F4031] hover:bg-[#152D22] text-[#FDF9F3] font-bold px-8 py-5 rounded-full shadow-lg hover:shadow-[#1F4031]/20 transform hover:-translate-y-0.5 active:translate-y-0 text-center transition-all cursor-pointer flex items-center justify-center space-x-2 text-sm uppercase tracking-widest"
            >
              <Calendar className="w-5 h-5" />
              <span>Configure My Spa Session</span>
            </button>

            <button
              id="hero-cta-view-rates"
              onClick={() => onScrollTo('services')}
              className="border-2 border-[#1F4031] text-[#1F4031] hover:bg-[#1F4031] hover:text-white px-8 py-5 rounded-full font-bold transition-all text-center flex items-center justify-center space-x-2 cursor-pointer text-sm uppercase tracking-widest"
            >
              <span>View Treatment Menu & Rates</span>
            </button>
          </div>
        </div>

        {/* Right column: Image composition with custom organic tilt and floating elements */}
        <div id="hero-images-frame" className="lg:col-span-5 relative w-full h-[450px] lg:h-[520px] mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-[#E6D5C1] rounded-[48px] overflow-hidden shadow-2xl rotate-3 border border-[#E6D5C1]">
            {/* The main picture */}
            <img
              src={heroImg}
              alt="Luxury Mobile Spa setup in modern Kampala sanctuary"
              className="w-full h-full object-cover transform scale-102 hover:scale-105 transition-transform duration-1000 opacity-90"
              referrerPolicy="no-referrer"
            />
            {/* Elegant warm organic gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1F4031]/20 to-transparent pointer-events-none" />
          </div>

          {/* Floating customer validation card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-[#D4AF37]/30 max-w-[220px] z-20">
            <div className="flex gap-1 mb-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
            <p className="text-xs font-serif italic leading-tight text-[#2D2926]">
              "The best mobile massage in Kampala. Professional, punctual, and deeply restorative."
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#1F4031]">
              — Sarah M.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
