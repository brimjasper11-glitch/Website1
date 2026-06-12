import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  return (
    <footer id="main-footer" className="bg-[#1F4031] text-[#FDF9F3] border-t border-[#FAF3E8]/10 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#142A20]/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onScrollTo('home')}>
              <div className="w-8 h-8 rounded-full bg-[#C05B3D] flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-[#FDF9F3]" />
              </div>
              <span className="text-lg font-serif font-black tracking-tight text-[#FAF3E8]">
                KLA MOBILE SPA
              </span>
            </div>
            
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest block font-bold font-mono">
              Luxury Relaxation 24/7
            </p>
            
            <p className="text-xs text-[#FDF9F3]/80 leading-relaxed font-semibold">
              Kampala’s primary mobile spa treatment. Delivering professional certified massage tables, 
              local Northern Ugandan Shea Butter aromas, and warm soothing therapy directly to your private sanctuary.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">Quick Navigation</h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button type="button" onClick={() => onScrollTo('home')} className="text-left text-[#FDF9F3]/80 hover:text-[#D4AF37] font-semibold transition-colors cursor-pointer">Home</button>
              <button type="button" onClick={() => onScrollTo('services')} className="text-left text-[#FDF9F3]/80 hover:text-[#D4AF37] font-semibold transition-colors cursor-pointer">Service Menu</button>
              <button type="button" onClick={() => onScrollTo('why-us')} className="text-left text-[#FDF9F3]/80 hover:text-[#D4AF37] font-semibold transition-colors cursor-pointer">Why Choose Us</button>
              <button type="button" onClick={() => onScrollTo('therapists')} className="text-left text-[#FDF9F3]/80 hover:text-[#D4AF37] font-semibold transition-colors cursor-pointer">Our Specialists</button>
              <button type="button" onClick={() => onScrollTo('booking-customizer')} className="text-left text-[#FDF9F3]/80 hover:text-[#D4AF37] font-semibold transition-colors cursor-pointer">Configure Spa Setup</button>
            </div>
          </div>

          {/* Contact coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">Reach Out 24/7</h4>
            <div className="flex flex-col space-y-2 text-xs text-[#FDF9F3]/80 font-semibold">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#C05B3D]" />
                <span>+256 751 234567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#C05B3D]" />
                <span>desk@klamobilespa.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#C05B3D] mt-0.5 shrink-0" />
                <span>Nakasero Cooperations Desk, Kampala, Uganda</span>
              </div>
            </div>
          </div>

          {/* Opening info */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">Social Channels</h4>
            <div className="flex space-x-3">
              <a href="https://instagram.com" className="p-2 bg-[#142A20] border border-[#FAF3E8]/10 rounded-lg text-[#D4AF37] hover:text-[#C05B3D] transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="https://facebook.com" className="p-2 bg-[#142A20] border border-[#FAF3E8]/10 rounded-lg text-[#D4AF37] hover:text-[#C05B3D] transition-all"><Facebook className="w-4 h-4" /></a>
            </div>
            <p className="text-[10px] text-[#FDF9F3]/60 leading-relaxed italic font-medium">
              Dispatched 24/7 across Nakasero, Kololo, Naguru, Muyenga, Bugolobi, and greater Kampala boundaries.
            </p>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-[#FAF3E8]/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#FDF9F3]/60 font-mono gap-4 font-medium">
          <p>© {new Date().getFullYear()} Kla Mobile Spa Kampala. All rights reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-[#FAF3E8] transition-colors cursor-pointer">Licenced Vetted Therapists</span>
            <span>•</span>
            <span className="hover:text-[#FAF3E8] transition-colors cursor-pointer text-right">Kampala Mobile Wellness Directive v1.2</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
